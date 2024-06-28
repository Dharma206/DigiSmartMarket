import React, { useState, useEffect } from "react";
import {  Container } from "react-bootstrap";


import { Badge, Table } from "reactstrap";
import '../components/farm-items-display/farm-items-display.scss'
import { getLabours } from "../serviceApis/loginapi";



const AdminLabourer = () => {

    const [marketVendors,setMarketVendors]=useState([])
  
    const handlefetchUsers = async () => {
      try {
        const userData = await getLabours();
        setMarketVendors(userData?.response || []);
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
     
    <div className="d-flex justify-content-between mt-5 mb-3 mt"><div><h4 style={{fontWeight:700}}>Labourer's </h4></div><div>  </div></div>
    
    <Table hover>
          <thead>
            <tr>
            <th>Market Name </th>
            <th>Location </th>
              <th>Labour Name </th>
              <th>Details</th>
              <th>Amount</th>
              <th>Quantity</th>


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
                  <td>{item?.name}</td>
                  <td>{item?.details || '-'}</td>
                  <td>{item?.produce?.[0]?.amount}</td>
                  <td>{item?.produce?.[0]?.quantity}</td>

                  
                  
             
                </tr>
              ))
            )}
          </tbody>
        </Table>



</Container>
  )
}

export default AdminLabourer;