import React from 'react';
import { Modal } from 'react-bootstrap';
import Draggable from 'react-draggable';
import "./DraggableModal.css"

const DraggableModal = ({ show, onHide, title, body }) => {
    return (
        <Modal show={show} onHide={onHide}
               dialogClassName="draggable-modal">
            <h5 className='modal-container'>Drag the below div</h5>
            <Draggable handle=".modal-header">
                <div className='dragg-it'>
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{body}</Modal.Body>
                </div>
            </Draggable>
        </Modal>
    );
};

export default DraggableModal;