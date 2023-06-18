import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddModal = (props) => {

    const [name, setHospitalName] = useState('');
    const [location, setLocation] = useState('');

    const handleHospitalNameChange = (e) => {
        setHospitalName(e.target.value)
    }
    const handleLocationChange = (e) => {
        setLocation(e.target.value)
    }
    const createHospital = () => {
        const newHospital = {
            name: name,
            location: location,
        }
        props.onAdd(newHospital)
        props.onClose()
        setHospitalName('')
        setLocation("")
    }
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Hospital</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formHospitalName">
                    <Form.Label>Hospital Name</Form.Label>
                    <Form.Control type="text" value={name} placeholder="Enter Hospital Name" onChange={handleHospitalNameChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" value={location} placeholder="Enter hospital Location" onChange={handleLocationChange}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Cancel
                </Button>
                <Button variant="success" onClick={createHospital}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddModal