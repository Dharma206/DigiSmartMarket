import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createMerket, deleteMarket, getMarkets } from "../../serviceApis/loginapi";
import "./add-market-modal.scss";
import { toast } from "react-toastify";
import { Table } from "reactstrap";

const AddItemModal = ({ show, handleClose ,userProfile}) => {

  const [errors, setErrors] = useState({});
  const [marketsData,setMarketsData]=useState([])
  const [form,setForm]=useState({});

  const handleMarkets = async () => {
    try {
      const userData = await getMarkets(userProfile?.id);
      setMarketsData(userData?.rows);
      console.log("userData->", userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    handleMarkets();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form?.marketName) newErrors.name = "Marker Name is required";
    if (!form?.location) newErrors.location = "Location is required";
    return newErrors;
  };

  const addMarket=async()=>{
    try{
      const res=await createMerket(form);
      toast.success('Created market successfully')
      setErrors({});
      setForm({});
      handleMarkets();
    }catch(e){console.log(e)}
  }


  const handleDeletMarket=async(id)=>{
    try{
      const res=await deleteMarket(id);
      toast.success('Deleted market successfully')
      setErrors({});
      handleMarkets();
    }catch(e){console.log(e)}
  }
  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addMarket();
  
    }
  };

  const handleModalClose = () => {
    setErrors({});
    handleClose();
  };

  const handleInputChange =  (e) => {
    const {name,value}=e.target;
    setForm(prev=>({...prev,[name]:value}))
  };

  return (
    <div className="custom-modal-wrapper">
    <Modal show={show} size="lg" onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title><span >Market</span></Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form>

            <Form.Group controlId="name" className="form-group half-width">
              <Form.Label><span>Market Name</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                value={form?.marketName||''}
                name='marketName'
                onChange={handleInputChange}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                required
              />
              {errors?.name && <div className="text-danger">{errors.name}</div>}
            </Form.Group>
            <Form.Group controlId="itemCode" className="form-group half-width">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item code"
                value={form?.location||''}
                name='location'
                onChange={handleInputChange}
                className={`form-control ${
                  errors.location ? "is-invalid" : ""
                }`}
                required
              />
              {errors?.location && (
                <div className="text-danger">{errors.location}</div>
              )}
            </Form.Group>
        </Form>
        <div className="d-flex justify-content-end mb-3">
        <Button
          variant="secondary"
          onClick={handleModalClose}
          className="close-button"
        >
          Close
        </Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          className="add-item-button-wrapper"
        >
          Add Item
        </Button>
        </div>


<span className="modal-title-wrapper">Markets</span>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Market Name </th>
              <th>Location</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
        { marketsData?.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-records-found">
                  No records found
                </td>
              </tr>
            ) : (
              marketsData?.map((item) => (
                <tr key={item.id}>
                  <td>{item.marketName}</td>
                  <td>{item.location}</td>
               
            
                  <td>
                    <Button
                      variant="link"
                      onClick={() => handleDeletMarket(item?.id)}
                      style={{ color: "red" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Modal.Body>

    </Modal>
    </div>
  );
};

export default AddItemModal;
