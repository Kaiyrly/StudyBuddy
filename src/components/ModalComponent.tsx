import React, { FC, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ModalComponent: FC<React.PropsWithChildren<{setShowModal: (v: boolean) => void}>> = ({ setShowModal, children }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setShowModal(false);
  }
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ children }</Modal.Body>
        {/* TODO: remove this footer or replace its functionality */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
