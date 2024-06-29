import React, { useState, useEffect } from "react";
import {   Container } from "react-bootstrap";

import { Badge, Table } from "reactstrap";
import '../../components/markets/marketListing.scss'
import { getLabours, getMarketVendor, getUsers } from "../../serviceApis/loginapi";

const LabourerList = () => {

  const [marketVendors,setMarketVendors]=useState([])

  const handlefetchUsers = async () => {
    try {
      const userData = await getLabours();
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
     
        <div className="d-flex justify-content-between mt-5 mb-3 mt"><div><h4 style={{fontWeight:700}}>Labourer's</h4></div><div>  </div></div>
        
      <Table hover>
          <thead>
            <tr>
            <th>Name </th>
            <th>Code </th>
              <th>Phone Number </th>
              <th>Market Name </th>
              <th>Market Vendor </th>
              <th>Role</th>
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
                  <td>{item?.name||'-'}</td>
                  <td>{item?.code||'-'}</td>
                  <td>{item?.phoneNumber||'-'}</td>
                  <td>{item?.market?.marketName||'-'}
                    </td>
                    <td>{item?.marketVendor?.userName||'-'}</td>
                    <td><Badge pill color="info">
                  Market Labourer
                    </Badge></td>
           
                </tr>
              ))
            )}
          </tbody>
        </Table>

    </Container>
  );
};

export default LabourerList;
