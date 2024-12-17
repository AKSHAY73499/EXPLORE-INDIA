import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

const EditProfile = ({ isOpen, toggle, user }) => {
  const [userData, setUserData] = useState(user);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userData));
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('phone', userData.phone);
      if (photoFile) {
        formData.append('photo', photoFile);
      }
  
      await axios.put(`http://localhost:7000/api/user/${userData._id}`, formData);
      console.log(formData);

      toggle();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" value={userData.username} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={userData.email} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input type="text" name="phone" id="phone" value={userData.phone} onChange={handleChange} />
          </FormGroup>
          {/* Input field for selecting photo file */}
          <FormGroup>
            <Label for="photo">Profile Photo</Label>
            <Input type="file" name="photo" id="photo" onChange={handlePhotoChange} />
          </FormGroup>
          <Button type="submit" color="primary">Update</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditProfile;
