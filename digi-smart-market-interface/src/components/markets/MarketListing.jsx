import React, { useState, useEffect } from "react";
import {  Container } from "react-bootstrap";
import DeleteModal from "./MarketDeleteModal";
import EditModal from "./MarketEditModal";
import "./marketListing.scss";
import { getMarketVendor } from "../../serviceApis/loginapi";
import { Table } from "reactstrap";

const ItemList = ({ vendorRequestModal,showModal}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [marketVendors,setMarketVendors]=useState([])

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleMarketVendord = async () => {
    try {
      const userData = await getMarketVendor();
      setMarketVendors(userData?.response ||[]);

      console.log("userData->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {

    handleMarketVendord();
  }, [vendorRequestModal,showModal]);
  console.log("vendor->",vendorRequestModal)

  return (
    <Container className="item-list">
          <div className="d-flex justify-content-between mt-5 mb-3 mt"><div><h4 style={{fontWeight:700}}>Vendor Details</h4></div><div>  </div></div>

      <Table hover>
          <thead>
            <tr>
              <th>Market Name </th>
              <th>Location</th>
              <th>Vendor Name </th>
              <th>Vendor Email</th>
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
                  <td>{item?.market?.marketName}</td>
                  <td>{item?.market?.location}</td>
                  <td>{item?.marketVendor?.userName}</td>
                  <td>{item?.marketVendor?.email}</td>
                  
                  
                  <td>
                    <span
                      onClick={()=>{setShowEditModal(true)}}
                      style={{ color: "#2ba1af",marginRight:'15px',cursor:'pointer' }}
                    >
                      View
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
        fetchItems={handleMarketVendord}
      />}
{showEditModal&&
      <EditModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        selectedItem={selectedItem}
        fetchItems={handleMarketVendord}
      />}
    </Container>
  );
};

export default ItemList;
