import React, { useState, useEffect } from "react";
import {  Button, Container } from "react-bootstrap";
import DeleteModal from "../components/markets/MarketDeleteModal";
import EditModal from "../components/markets/MarketEditModal";
// import { getMarketVendor } from "../../serviceApis/loginapi";
import { Table } from "reactstrap";
import '../components/markets/marketListing.scss'
import { deleteLabour, getLabours, getMarketVendor } from "../serviceApis/loginapi";
import AddLabourerModal from "../components/add-market-modal/AddLabourerModal";
import { toast } from "react-toastify";

const MarketLabourerDash = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [marketVendors,setMarketVendors]=useState([])
  const [labourerModal,setLabourerModal]=useState(false)

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleEditClick = (item) => {
    setLabourerModal(item);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteLabour(selectedItem.id);
      toast.success('Deleted succussfully') 
      handleGetLabourer(); 
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleGetLabourer = async () => {
    try {
      const userData = await getLabours();
      setMarketVendors(userData?.response||[]);
      console.log("userData->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {

    handleGetLabourer();
  }, []);

  return (
    <Container className="item-list">
     
        <div className="d-flex justify-content-between mt-5 mb-3 mt"><div><h4 style={{fontWeight:700}}>Labourer Details</h4></div><div>        <Button
          variant="success"
          onClick={()=>{setLabourerModal(true)}}
          className="add-item-button-wrapper"
        >
Add Labourer
        </Button></div></div>
        
      <Table hover>
          <thead>
            <tr>
            <th>Market Name </th>
            <th>Location </th>
              <th>Labour Name </th>
              <th>Labour Code </th>
              <th>Phone Number </th>
              <th>Details</th>
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
                  <td>{item?.market?.location||'-'}</td>
                  <td>{item?.name||'-'}</td>
                  <td>{item?.code||'-'}</td>
                  <td>{item?.phoneNumber || '-'}</td>
                  <td>{item?.details || '-'}</td>
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

      {labourerModal&&<AddLabourerModal show={labourerModal} handleClose={()=>{setLabourerModal(false)}} handleGetLabourer={handleGetLabourer}/>}
    </Container>
  );
};

export default MarketLabourerDash;
