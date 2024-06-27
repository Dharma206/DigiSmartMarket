import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addLabourer, createMerket, deleteMarket, getMarkets } from "../../serviceApis/loginapi";
import "./add-market-modal.scss";
import { toast } from "react-toastify";
import { Table } from "reactstrap";

const AddLabourerModal = ({ show, handleClose ,handleGetLabourer}) => {

  const [errors, setErrors] = useState({});
  const [form,setForm]=useState({});


  const validate = () => {
    const newErrors = {};
    if (!form?.name) newErrors.name = "Name is required";
    if (!form?.quantity) newErrors.quantity = "Quantity is required";
    if (!form?.amount) newErrors.amount = "Amount is required";
    if (!form?.cropName) newErrors.cropName = "Crop Name is required";
    return newErrors;
  };

  const handleAddLabourer=async()=>{
    try{
      const res=await addLabourer({...form,quantity:parseInt(form.quantity)});
      toast.success('Created produce & labourer successfully')
      handleGetLabourer();
      handleClose()
      setErrors({});
    }catch(e){console.log(e)}
  }


  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
        handleAddLabourer();
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
        <Modal.Title><span >Add Produce & Labourer</span></Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form>

            <Form.Group controlId="name" className="form-group half-width">
              <Form.Label><span>Labourer Name</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={form?.name||''}
                name='name'
                onChange={handleInputChange}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                required
              />
              {errors?.name && <div className="text-danger">{errors.name}</div>}
            </Form.Group>
            <Form.Group controlId="name" className="form-group half-width">
              <Form.Label><span>Crop Name</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter crop name"
                value={form?.cropName||''}
                name='cropName'
                onChange={handleInputChange}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                required
              />
              {errors?.cropName && <div className="text-danger">{errors.cropName}</div>}
            </Form.Group>
            <Form.Group controlId="name" className="form-group half-width">
              <Form.Label><span> Details</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter details"
                value={form?.details||''}
                name='details'
                onChange={handleInputChange}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}

              />
            </Form.Group>
            <Form.Group controlId="itemCode" className="form-group half-width">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter amount"
                value={form?.amount||''}
                name='amount'
                onChange={handleInputChange}
                className={`form-control ${
                  errors.itemCode ? "is-invalid" : ""
                }`}
                required
              />
              {errors?.amount && (
                <div className="text-danger">{errors.amount}</div>
              )}
            </Form.Group>
            <Form.Group controlId="itemCode" className="form-group half-width">
              <Form.Label>Crop Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter crop quantity"
                value={form?.quantity||null}
                name='quantity'
                onChange={handleInputChange}
                className={`form-control ${
                  errors.itemCode ? "is-invalid" : ""
                }`}
                required
              />
              {errors?.quantity && (
                <div className="text-danger">{errors.quantity}</div>
              )}
            </Form.Group>
        </Form>
        <div className="d-flex justify-content-end mb-3">
        <Button
          variant="secondary"
          onClick={handleModalClose}
          className="close-button"
style={{marginRight:'5px'}}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          className="add-item-button-wrapper"
        >
          Add
        </Button>
        </div>

      </Modal.Body>

    </Modal>
    </div>
  );
};

export default AddLabourerModal;
