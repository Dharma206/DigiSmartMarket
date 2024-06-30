import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addLabourer, addProduce, getLabours, putEditProduce } from "../../serviceApis/loginapi";
import "../add-market-modal/add-market-modal.scss";
import { toast } from "react-toastify";

const AddProduceModal = ({ show, handleClose ,handleGetProduces}) => {

  const [errors, setErrors] = useState({});
  const [form,setForm]=useState(show?.cropName?{
    laborerId:show?.Laborer?.id,
    quantity: show?.quantity||null,
    amount:show?.amount||'',
    cropName:show?.cropName||'',
    details:show?.details||''
  }:
    {}
  );
  const [labourersList,setLabourersList]=useState(false)


  const validate = () => {
    const newErrors = {};
    if (!form?.laborerId) newErrors.laborerId = "Name is required";
    if (!form?.quantity) newErrors.quantity = "Quantity is required";
    if (!form?.amount) newErrors.amount = "Amount is required";
    if (!form?.cropName) newErrors.cropName = "Crop Name is required";
    return newErrors;
  };

  const handleAddProduce=async()=>{
    try{
      const res=await addProduce({...form,quantity:parseInt(form.quantity)});
      toast.success('Created successfully')
      handleGetProduces();
      handleClose()
      setErrors({});
    }catch(e){console.log(e)}
  }

  const handleEditProduce=async()=>{
    try{
      const res=await putEditProduce(show?.id,{...form,quantity:parseInt(form.quantity)});
      toast.success('Saved successfully')
      handleGetProduces();
      handleClose()
      setErrors({});
    }catch(e){console.log(e)}
  }


  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      if(show?.cropName){
        handleEditProduce()
      }else{
        handleAddProduce();
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

  const handleFetchLaboures=async()=>{
    try{
        const res = await getLabours();
        console.log("resp->",res)
        setLabourersList(res?.response||[])
    }catch(err){
        console.log("err",err)
    }

  }

  useEffect(()=>{
    handleFetchLaboures();
  },[])

  return (
    <div className="custom-modal-wrapper">
    <Modal show={!!show} size="lg" onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title><span >Produce</span></Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form>

            <Form.Group controlId="laborerId" className="form-group half-width">
              <Form.Label><span>Labourer Name</span></Form.Label>
              <Form.Select name='laborerId'  onChange={handleInputChange} value={form?.laborerId ||''} className="mb-3" aria-label="Default digi-smart-market example">
            <option>Select Labourer </option>
                {labourersList?.length&&labourersList?.map(item=> <option value={item?.id}>{item?.name}</option>)}
          </Form.Select>
          {errors?.laborerId && <div className="text-danger">{errors.laborerId}</div>}
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
                disabled={!!show?.cropName}
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
                className={`form-control ${errors.details ? "is-invalid" : ""}`}

              />
            </Form.Group>
            <Form.Group controlId="itemCode" className="form-group half-width">
              <Form.Label>Crop Amount</Form.Label>
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
            Save
        </Button>
        </div>

      </Modal.Body>

    </Modal>
    </div>
  );
};

export default AddProduceModal;
