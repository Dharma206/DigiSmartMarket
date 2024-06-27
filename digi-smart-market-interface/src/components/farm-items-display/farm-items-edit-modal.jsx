import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { getCategories, getLabours, putEditItem } from "../../serviceApis/loginapi";
import "./farm-items-edit-modal.scss"; // Ensure to define your CSS styles here
import { Table } from "reactstrap";

const EditModal = ({
  show,
  handleClose,
  selectedItem,
  fetchItems,
  dateOfBirth,
}) => {

  const [labours,setLabours]=useState([])
  const fetchLabours = async () => {
    try {
      const response = await getLabours();
      setLabours(response?.response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    fetchLabours();
  }, []);

  const handleModalClose = () => {
    handleClose();
  };



  return (
    <Modal show={show} size='lg' onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Labours</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">

        <Table hover responsive>
          <thead>
            <tr>
              <th>Market Name</th>
              <th>Vendor Name</th>
              <th>Vendor Email</th>
              <th>Labourer Name </th>
              <th>Amount</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
        { labours?.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-records-found">
                  No records found
                </td>
              </tr>
            ) : (
              labours?.map((item) => (
                <tr key={item.id}>
                  <td>{item?.market?.marketName ||'-'}</td>
                  <td>{item?.marketVendor?.userName||'-'}</td>
                  <td>{item?.marketVendor?.email||'-'}</td>
                  <td>{item?.name||'-'}</td>
                  <td>{item?.produce?.[0]?.amount||'-'}</td>
                  <td>{item?.produce?.[0]?.quantity||'-'}</td>
               
            
                
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer className="pb-3 pt-3">
 
        <Button
          variant="success"
          onClick={handleModalClose}
          className="add-item-button-wrapper"
        >
          Close
        </Button>
   
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
