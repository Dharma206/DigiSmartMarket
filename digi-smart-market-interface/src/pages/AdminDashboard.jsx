import React, { useState, useEffect } from "react";
import {  Button, Container } from "react-bootstrap";
import DeleteModal from "../components/farm-items-display/farm-items-delete-modal";
import EditModal from "../components/farm-items-display/farm-items-edit-modal";
// import { getMarketVendor } from "../../serviceApis/loginapi";
import { Table } from "reactstrap";
import '../components/farm-items-display/farm-items-display.scss'
import { deleteLabour, getLabours, getMarketVendor, getUsers } from "../serviceApis/loginapi";
import AddLabourerModal from "../components/add-market-modal/AddLabourerModal";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [marketVendors,setMarketVendors]=useState([])
  const [labourerModal,setLabourerModal]=useState(false)

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

//   const handleCloseDeleteModal = () => {
//     setShowDeleteModal(false);
//     setSelectedItem(null);
//   };

//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//     setSelectedItem(null);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await deleteLabour(selectedItem.id);
//       toast.success('Deleted succussfully') 
//       handleGetLabourer(); 
//       handleCloseDeleteModal();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

  const handlefetchUsers = async () => {
    try {
      const userData = await getUsers();
      setMarketVendors(userData);
      console.log("userData->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {

    handlefetchUsers();
  }, []);

  return (
    <Container className="item-list">
     
        <div className="d-flex justify-content-between mt-5 mb-3 mt"><div><h4 style={{fontWeight:700}}>Users</h4></div><div>  </div></div>
        
      <Table hover>
          <thead>
            <tr>
            <th>User Name </th>
            <th>Email </th>
              <th>Role </th>
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
                  <td>{item?.userName}</td>
                  <td>{item?.email}</td>
                  <td>{item?.role}</td>
                  <td>
               
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

  
{/* 
   {showDeleteModal&&   <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        selectedItem={selectedItem}
        handleDelete={handleConfirmDelete}
      />}  */}
{/* {showEditModal&&
      <EditModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        selectedItem={selectedItem}
        fetchItems={handleMarketVendord}
      />} */}

      {/* {labourerModal&&<AddLabourerModal show={labourerModal} handleClose={()=>{setLabourerModal(false)}} handleGetLabourer={handleGetLabourer}/>} */}
    </Container>
  );
};

export default AdminDashboard;
