import React, { useEffect, useState } from "react";
import { Modal, Button, } from "react-bootstrap";
import { changeRequestAcces, createMerket, deleteMarket, getVendorRequest } from "../../serviceApis/loginapi";
import "../add-market-modal/add-market-modal.scss";
import { toast } from "react-toastify";
import { Table } from "reactstrap";

const VendorRequestModal = ({ show, handleClose }) => {


  const [vendorRequests,setVendorRequests]=useState([])

  const handleMarkets = async () => {
    try {
      const userData = await getVendorRequest();
      setVendorRequests(userData?.rows);
      console.log("userData->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    handleMarkets();
  }, []);


  const handleApproveReject=async(id,status)=>{
    try{
      const res=await changeRequestAcces(id);
      toast.success('Approved successfully')

      handleMarkets();
    }catch(e){console.log(e)}
  }


  const handleModalClose = () => {
    handleClose();
  };



  return (
    <div className="custom-modal-wrapper">
    <Modal show={show} size="lg" onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title><span >Vendor Requests</span></Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Table hover responsive>
          <thead>
            <tr>
              <th>Market Name </th>
              <th>Vendor Name </th>
              <th>Email</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
        { vendorRequests?.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-records-found">
                  No records found
                </td>
              </tr>
            ) : (
              vendorRequests?.map((item) => (
                <tr key={item?.id}>
                  <td>{item?.marketName||'-'}</td>
                  <td>{item?.marketVendor?.userName||'-'}</td>
                  <td>{item?.marketVendor?.email||'-'}</td>
               
            
                  <td>
                  <span
                      variant="link"
                      onClick={() => handleApproveReject(item?.marketVendor?.userId||item?.marketId)}
                      style={{ color: "#2ba1af" ,cursor:'pointer',marginRight:'5px'}}
                    >
                      Approve
                    </span>
            
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Modal.Body>

    </Modal>
    </div>
  );
};

export default VendorRequestModal;
