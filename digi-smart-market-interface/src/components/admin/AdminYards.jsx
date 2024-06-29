import React, { useState, useEffect } from "react";
import {   Container } from "react-bootstrap";

import { Badge, Table } from "reactstrap";
import '../../components/markets/marketListing.scss'
import { getMarketVendor, getMarkets, getUsers } from "../../serviceApis/loginapi";

const AdminVendors = () => {

  const [marketVendors,setMarketVendors]=useState([])

  const handlefetchUsers = async () => {
    try {
      const userData = await getMarkets();
      setMarketVendors(userData?.rows||[]);
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
     
        <div className="d-flex justify-content-between mt-5 mb-3 mt"><div><h4 style={{fontWeight:700}}>Market Yards</h4></div><div>  </div></div>
        
      <Table hover>
          <thead>
            <tr>
            <th>Market Name </th>
            <th>Location </th>
            <th>Type</th>


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
                  <td>{item?.marketName||'-'}</td>
                  <td>{item?.location||'-'}</td>
           <td><Badge color="info" pill rounded>Market</Badge></td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

    </Container>
  );
};

export default AdminVendors;
