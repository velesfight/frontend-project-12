import React, { useEffect} from 'react';
import { useContext } from 'react';
import { hideModal, modalsSlice, showModal } from '../slices/uiSlisec';
import { Modal, Form, Button } from 'react-bootstrap';

const Add = ({ showModal, hideModal }) => {
    const dispatch = useDispatch();
    const inputEl = useRef();
    const { addChannel } = useContext();
    const { hideModal, showModal } = modalsSlice;
    const channels = useSelector(channelsSelectors.selectAll);

useEffect(() => {
    inputEl.current.focus();
  }, []);


  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3)
      .max(20)
      .notOneOf(channels.map((channel) => channel.name), 'Add.unique')
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },

    validationSchema,
    onSubmit: (values) => {
        dispatch(addChannel({ name: values.name }));
        hideModal();
      },
    });

return (
  <Modal show onHide={onHide}>
  <Modal.Header closeButton>
    <Modal.Title>{('remove')}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="d-flex justify-content-end">
      <button onClick={onHide} className="btn btn-secondary me-2" type="submit" value="remove">
      </button>
    </div>
  </Modal.Body>
</Modal>
  );
};

export default Add;