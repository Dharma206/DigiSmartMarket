import React, { useState, useEffect } from "react";
import {   Container } from "react-bootstrap";

import { Badge, Table } from "reactstrap";
import '../../components/markets/marketListing.scss'
import { getproduces } from "../../serviceApis/loginapi";

const ProducesList = () => {

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

    handlefetchUsers();
  }, []);

  return (
    <Container className="item-list">
     
        <div className="d-flex justify-content-between mt-5 mb-3 mt"><div><h4 style={{fontWeight:700}}>Produces</h4></div><div>  </div></div>
        
      <Table hover>
          <thead>
            <tr>
            <th>Crop Name </th>
            <th>Market Name </th>
              <th>Market Admin </th>
              <th>Market Vendor </th>
              <th>Labourer Name</th>
              <th>Quantity </th>
              <th>Amount</th>
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
                  <td>{item?.cropName||'-'}</td>
                  <td>{item?.market?.marketName||'-'}</td>
                  <td>{item?.marketAdmin?.userName||'-'}</td>
                  <td>{item?.marketVendor?.userName||'-'}
                    </td>
                    <td>{item?.Laborer?.name||'-'}
                    </td>
                    <td>{item?.quantity||'-'}</td>
                    <td>{item?.amount}</td>
           
                </tr>
              ))
            )}
          </tbody>
        </Table>

    </Container>
  );
};

export default ProducesList;
