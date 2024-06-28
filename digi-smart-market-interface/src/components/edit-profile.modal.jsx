import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./add-market-modal/add-market-modal.scss";

const EditProfileModal = ({ show, handleClose, profile, handleSave }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (profile) {
      setFormData({
        userName: profile.userName || "",
        email: profile.email || "",
    
        role: profile.role || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;


      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = "User Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      handleSave(formData);
    } else {
      setErrors(formErrors);
    }
  };

  const handleModalClose = () => {
    setErrors({});
    handleClose();
  };

  return (
    <Modal show={show} size="lg" onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form>
          <div className="form-row">
            <Form.Group
              controlId="formUserName"
              className="form-group half-width"
            >
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter user name"
                required
                isInvalid={!!errors.userName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.userName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail" className="form-group half-width">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                required
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
    
          <Form.Group controlId="formRole" className="form-group">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="pb-3 pt-3">
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
         Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
