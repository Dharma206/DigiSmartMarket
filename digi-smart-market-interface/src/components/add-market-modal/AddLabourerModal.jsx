import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addLabourer, createMerket, deleteMarket, getMarkets, putEditLabourer } from "../../serviceApis/loginapi";
import "./add-market-modal.scss";
import { toast } from "react-toastify";
import { Table } from "reactstrap";

const AddLabourerModal = ({ show, handleClose ,handleGetLabourer}) => {

  const [errors, setErrors] = useState({});
  const [form,setForm]=useState(show?.name?{name:show?.name||'',phoneNumber:show?.phoneNumber||'',code:show?.code||'',details:show?.details||''}:{});


  const validate = () => {
    const newErrors = {};
    if (!form?.name) newErrors.name = "Name is required";
    if (!form?.code) newErrors.code = "Code is required";
    if (!form?.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    return newErrors;
  };

  const handleAddLabourer=async()=>{
    try{
      const res=await addLabourer({...form});
      toast.success('Created  successfully')
      handleGetLabourer();
      handleClose()
      setErrors({});
    }catch(e){console.log(e)}
  }

  const handleEditLabourer=async()=>{
    try{
      const res=await putEditLabourer(show?.id,{...form});
      toast.success('Saved successfully')
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
      if(show?.id){
        handleEditLabourer();
      }else{
        handleAddLabourer();
      }
       
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
    <Modal show={!!show} size="lg" onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title><span >Labourer</span></Modal.Title>
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
              <Form.Label><span>Code</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Code"
                value={form?.code||''}
                disabled={!!show?.code}
                name='code'
                onChange={handleInputChange}
                className={`form-control ${errors.code ? "is-invalid" : ""}`}
                required
              />
              {errors?.code && <div className="text-danger">{errors.code}</div>}
            </Form.Group>
            <Form.Group controlId="name" className="form-group half-width">
              <Form.Label><span>Phone Number</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={form?.phoneNumber||''}
                name='phoneNumber'
                onChange={handleInputChange}
                className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                required
              />
              {errors?.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
            </Form.Group>
            <Form.Group controlId="name" className="form-group half-width">
              <Form.Label><span>Details</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Details"
                value={form?.details||''}
                name='details'
                onChange={handleInputChange}
                className={`form-control ${errors.details ? "is-invalid" : ""}`}
                required
              />
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
          Save
        </Button>
        </div>

      </Modal.Body>

    </Modal>
    </div>
  );
};

export default AddLabourerModal;
