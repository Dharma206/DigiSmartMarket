import React, { useState, useEffect } from "react";
import {   Container } from "react-bootstrap";

import { Badge, Table } from "reactstrap";
import '../../components/markets/marketListing.scss'
import { getMarketVendor, getUsers } from "../../serviceApis/loginapi";

const AdminVendors = () => {

  const [marketVendors,setMarketVendors]=useState([])

  const handlefetchUsers = async () => {
    try {
      const userData = await getMarketVendor();
      setMarketVendors(userData?.response||[]);
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
     
        <div className="d-flex justify-content-between mt-5 mb-3 mt"><div><h4 style={{fontWeight:700}}>Market Vendors</h4></div><div>  </div></div>
        
      <Table hover>
          <thead>
            <tr>
            <th>User Name </th>
            <th>Email </th>
              <th>Role </th>
              <th>Market Name </th>
              <th>Market Admin </th>


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
                  <td>{item?.marketVendor?.userName||'-'}</td>
                  <td>{item?.marketVendor?.email||'-'}</td>
                  <td><Badge pill color="info">
                  Market Vendor
                    </Badge>
                    </td>
                    <td>{item?.market?.marketName||'-'}</td>
                    <td>{item?.marketAdmin?.userName||'-'}</td>
           
                </tr>
              ))
            )}
          </tbody>
        </Table>

    </Container>
  );
};

export default AdminVendors;
