import React, { useEffect} from 'react';
import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, modalsSlice, showModal } from '../slices/uiSlisec';

const Remove = () => {
    const dispatch = useDispatch();
    const channels = useSelector(channelsSelectors.selectAll);
    const { removeChannel } = useContext();
    const { hideModal, showModal } = modalsSlice;
};

    return (
        <Modal show>
          <Modal.Header className='border-0' style={{backgroundColor:'#212529'}} closeButton onHide={() => dispatch(hideModal())}>
            <Modal.Title style={{color:'#959CF8'}}>{t('removeModal.removeChannel')}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:'black'}}>
            <p style={{color:'#959CF8'}} className="lead">{t('removeModal.confirm')}</p>
            <div className="d-flex justify-content-between">
              <Button
                className="m-1"
                variant="outline-secondary"
                role="button"
                onClick={() => dispatch(hideModal())}
              >
                {t('removeModal.cancel')}
              </Button>
              <Button
                className="m-1"
                variant="outline-danger"
                role="button"
                onClick={handleRemove}
              >
                {sending ? <Spinner size="sm" /> : null}
                {t('removeModal.remove')}
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      );
