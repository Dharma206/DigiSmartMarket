import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getLabours, getproduces } from "../../serviceApis/loginapi";
import "./marketEditModal.scss"; 
import { Table } from "reactstrap";

const EditModal = ({
  show,
  handleClose,
}) => {

  const [labours,setLabours]=useState([])
  const fetchLabours = async () => {
    try {
      const response = await getLabours();
      setLabours(response?.response||[]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }


  const [marketVendors,setMarketVendors]=useState([])

  const handlefetchUsers = async () => {
    try {
      const userData = await getproduces();
      setMarketVendors(userData?.response||[]);
      console.log("userData->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  useEffect(() => {
    fetchLabours();
    handlefetchUsers();
  }, []);

  const handleModalClose = () => {
    handleClose();
  };




  return (
    <Modal show={show} size='lg' onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Produces and Labours</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <h4  style={{fontWeight:600,fontSize:'18px'}}>Produces</h4>
      <Table hover responsive>
          <thead>
            <tr>
              <th>Crop Name</th>

              <th>Details</th>              <th>Labourer Name </th>
              <th>Labourer Code </th>
              <th>Amount</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
        { marketVendors?.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-records-found">
                  No records found
                </td>
              </tr>
            ) : (
              marketVendors?.map((item) => (
                <tr key={item.id}>
                  <td>{item?.cropName ||'-'}</td>
                  <td>{item?.details||'-'}</td>
                  <td>{item?.Laborer?.name||'-'}</td>
                  <td>{item?.Laborer?.code||'-'}</td>
                  <td>{item?.amount||'-'}</td>
                  <td>{item?.quantity||'-'}</td>
               
            
                
                </tr>
              ))
            )}
          </tbody>
        </Table>
<h4 className="mt-4" style={{fontWeight:600,fontSize:'18px'}}>Labourers</h4>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Name </th>
              <th>Code </th>
              <th>Details </th>
              <th>Phone Number </th>
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
                  <td>{item?.name ||'-'}</td>
                  <td>{item?.code||'-'}</td>
                  <td>{item?.details||'-'}</td>
                  <td>{item?.phoneNumber||'-'}</td>
                  
               
            
                
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
