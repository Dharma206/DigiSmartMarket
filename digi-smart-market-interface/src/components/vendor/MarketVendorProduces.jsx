import React, { useState, useEffect } from "react";
import {  Button, Container } from "react-bootstrap";
// import DeleteModal from "../components/markets/MarketDeleteModal";
// import EditModal from "../components/markets/MarketEditModal";
// import { getMarketVendor } from "../../serviceApis/loginapi";
import { Table } from "reactstrap";
import '../markets/marketListing.scss';
import { deleteLabour, deleteProduce, getLabours, getMarketVendor, getproduces } from "../../serviceApis/loginapi";
// import AddLabourerModal from "../components/add-market-modal/AddLabourerModal";
import { toast } from "react-toastify";
import DeleteModal from "../markets/MarketDeleteModal";
import AddLabourerModal from "../add-market-modal/AddLabourerModal";
import AddProduceModal from "./AddProduceDetails";

const MarketVendorProduces = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [marketVendors,setMarketVendors]=useState([])
  const [produceModal,setProduceModal]=useState(false)

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduce(selectedItem.id);
      toast.success('Deleted succussfully') 
      handleGetProduces(); 
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleGetProduces = async () => {
    try {
      const userData = await getproduces();
      setMarketVendors(userData?.response||[]);
      console.log("userData->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEditClick=(item)=>{
    setProduceModal(item);
  }

  useEffect(() => {

    handleGetProduces();
  }, []);

  return (
    <Container className="item-list">
     
        <div className="d-flex justify-content-between mt-5 mb-3 mt"><div><h4 style={{fontWeight:700}}>Produce Details</h4></div><div>        <Button
          variant="success"
          onClick={()=>{setProduceModal(true)}}
          className="add-item-button-wrapper"
        >
Add Produce
        </Button></div></div>
        
      <Table hover>
          <thead>
            <tr>
            <th>Market Name </th>
            <th>Crop Name </th>
              <th>Labour Name </th>
              <th>Labour Code </th>
              <th>Details</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Actions</th>

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
                <tr key={item?.id}>
                  <td>{item?.market?.marketName||'-'}</td>
                  <td>{item?.cropName||'-'}</td>
                  <td>{item?.Laborer?.name||'-'}</td>
                  <td>{item?.Laborer?.code||'-'}</td>
                  <td>{item?.details || '-'}</td>
                  <td>{item?.amount||'-'}</td>
                  <td>{item?.quantity||'-'}</td>
                  <td>

                  <span
                  onClick={() => handleEditClick(item)}
                  className="action-button"
                  style={{ color: "#2ba1af" ,cursor:'pointer',marginRight:'10px'}}
                  >
                  Edit
                  </span>
               
                    <span

                      onClick={() => handleDeleteClick(item)}
                      className="action-button"
                      style={{ color: "red" ,cursor:'pointer'}}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

  

   {showDeleteModal&&   <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        selectedItem={selectedItem}
        handleDelete={handleConfirmDelete}
      />} 

      {produceModal&&<AddProduceModal show={produceModal} handleClose={()=>{setProduceModal(false)}} handleGetProduces={handleGetProduces}/>}
    </Container>
  );
};

export default MarketVendorProduces;
