import React, { useState, useEffect } from "react";
import {   Container } from "react-bootstrap";
import DeleteModal from "../components/markets/MarketDeleteModal";
import EditModal from "../components/markets/MarketEditModal";
// import { getMarketVendor } from "../../serviceApis/loginapi";
import { Badge, Table } from "reactstrap";
import '../components/markets/marketListing.scss'
import { deleteLabour, getLabours, getMarketVendor, getUsers } from "../serviceApis/loginapi";
import AddLabourerModal from "../components/add-market-modal/AddLabourerModal";
import { toast } from "react-toastify";

const AdminDashboard = () => {

  const [marketVendors,setMarketVendors]=useState([])

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
     
        <div className="d-flex justify-content-between mt-5 mb-3 mt"><div><h4 style={{fontWeight:700}}>Market Admins</h4></div><div>  </div></div>
        
      <Table hover>
          <thead>
            <tr>
            <th>User Name </th>
            <th>Email </th>
              <th>Role </th>
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
                  <td><Badge pill color="info">
                  {item?.role}
                    </Badge>
                    </td>
           
                </tr>
              ))
            )}
          </tbody>
        </Table>

    </Container>
  );
};

export default AdminDashboard;
