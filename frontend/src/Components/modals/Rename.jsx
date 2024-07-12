
import React, { useEffect, useRef} from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../slices/uiSlisec';
import { Modal, FormGroup, FormControl, Form, Button } from 'react-bootstrap';
import { selectors, updateChannel } from '../../slices/channelsSlice';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';


const Rename = () => {
const { t } = useTranslation();
const dispatch = useDispatch();
const inputEl = useRef();


useEffect(() => {
    if (inputEl.current) {
      inputEl.current.select();
    }
  }, []);

  const channels = useSelector(selectors.selectAll);
  const channelId = useSelector((state) => state.modal.channelId);
  //const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const curChannel = channels.find((ch) => ch.id === channelId);
  const isOpened = useSelector((state) => state.modal.isOpen);

  const validationSchema = Yup.object().shape({
    name: Yup
      .string()
      .min(3)
      .max(20)
      .notOneOf((channels), 'Add.unique')
      .required(),
  });
  const getAuthHeader = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  }

  const formik = useFormik({
    initialValues: {
      name: curChannel ? curChannel.name : '',
    },
    validationSchema,
    onSubmit: async (values) =>{
      try {
        await axios.patch(`/api/v1/channels/${channelId}`,  { name: values.name }, { headers: getAuthHeader() });
        dispatch(updateChannel({ id: channelId, changes: { name: values.name } }));
        dispatch(hideModal());
        toast.success(t('madals.doneRename'));
        } catch (error) {
          toast.error(t('errors.unknown'))
        }
      },
    });

  const handleClose = () => {
    dispatch(hideModal());
  };
    
      return (
        <Modal show={isOpened} centered onHide={handleClose}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={formik.handleSubmit}>
                <FormGroup className="form-group">
                  <FormControl
                    name="name"
                    type="text"
                    disabled={formik.isSubmitting}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    ref={inputEl}
                    data-testid="input-body"
                    isInvalid={formik.errors.name}
                    required
                  />
                   <Form.Control.Feedback type="invalid">
              {(formik.errors.name)}
            </Form.Control.Feedback>
                </FormGroup>
                <div className="d-flex justify-content-end">
            <Button type="submit" disabled={formik.isSubmitting} variant="primary">
            {t('modals.send')}
            </Button>
            <Button className="me-2" variant="secondary" onClick={handleClose}>
            {t('modals.cancel')}
            </Button>
          </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      );
    }
    
    export default Rename;