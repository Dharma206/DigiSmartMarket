import React from "react";
import { Modal, Button } from "react-bootstrap";
import "../add-market-modal/add-market-modal.scss";
import {  deleteVendor } from "../../serviceApis/loginapi";
import { toast } from "react-toastify";

const DeleteModal = ({ show, handleClose, selectedItem, fetchItems ,handleDelete}) => {

  const handleConfirmDelete = async () => {
    try {
      await deleteVendor(selectedItem.id);
      toast.success('Deleted succussfully') 
      fetchItems(); 
      handleClose();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="delete-text">
          Are you sure you want to delete?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
          className="close-button"
        >
          No
        </Button>
     
        <Button
          variant="success"
          onClick={()=>{
            if(handleDelete){
              handleDelete()
            }else{
              handleConfirmDelete()
            }
            }}
          className="add-item-button-wrapper"
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
