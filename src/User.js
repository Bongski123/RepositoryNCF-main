import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiRead } from "react-icons/ci";
import "./User.css";

const User = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [show, setShow] = useState(false);
    const [showReadModal, setShowReadModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        role_id: '',
    });

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:9001/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    const fetchRoles = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:9001/api/roles');
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    }, []);

    const handleClose = () => setShow(false);

    const handleShow = (user) => {
        setSelectedUser(user);
        if (user) {
            setFormData({
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                role_id: user.role_id,
            });
        } else {
            setFormData({
                firstName: '',
                middleName: '',
                lastName: '',
                email: '',
                password: '',
                role_id: '',
            });
        }
        setShow(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:9001/api/register', formData);
            Swal.fire({
                icon: 'success',
                text: 'User created successfully!',
            });
            handleClose();
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
            Swal.fire({
                icon: 'error',
                text: 'An error occurred while creating user.',
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:9001/api/user/${selectedUser.userID}`, formData);
            Swal.fire({
                icon: 'success',
                text: 'User updated successfully!',
            });
            handleClose();
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
            Swal.fire({
                icon: 'error',
                text: 'An error occurred while updating user.',
            });
        }
    };

    const deleteProduct = async (id) => {
        const isConfirmed = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
        }).then((result) => {
            return result.isConfirmed;
        });
        if (!isConfirmed) {
            return;
        }

        try {
            await axios.delete(`http://localhost:9001/api/user/${id}`);
            Swal.fire({
                icon: 'success',
                text: 'User deleted successfully!',
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire({
                icon: 'error',
                text: 'An error occurred while deleting user.',
            });
        }
    };

    const handleReadModalShow = (user) => {
        setSelectedUser(user);
        setShowReadModal(true);
    };

    const handleReadModalClose = () => {
        setShowReadModal(false);
    };

    const filteredUsers = users.filter(user =>
        user.userID.toString().includes(searchTerm) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.middleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className='container'>
                <br />
                <div className='col-12'>
                    <Button variant='btn btn-success mb-2 float-end btn-sm me-2' onClick={() => handleShow(null)}>
                        Add User
                    </Button>
                </div>
                <Table striped bordered hover style={{ borderRadius: '20px' }}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.firstName}</td>
                                <td>{user.middleName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.role_name}</td>
                                <td>
                                    <Button className='btn btn-danger btn-md' onClick={() => deleteProduct(user.userID)}>
                                        <MdDelete />
                                    </Button>
                                    <Button className='btn btn-success btn-md ms-2' onClick={() => handleShow(user)}>
                                        <FaEdit />
                                    </Button>
                                    <Button className='btn btn-secondary btn-md ms-2' onClick={() => handleReadModalShow(user)}>
                                        <CiRead />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedUser ? 'Update User' : 'Create User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={selectedUser ? handleSubmit : handleCreateSubmit}>
                        <Form.Group controlId='firstName'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='text' name='firstName' value={formData.firstName} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='middleName'>
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type='text' name='middleName' value={formData.middleName} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='lastName'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='text' name='lastName' value={formData.lastName} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text' name='email' value={formData.email} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password' value={formData.password} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='role_id'>
                            <Form.Label>Role ID</Form.Label>
                            <Form.Select
                                name='role_id'
                                value={formData.role_id}
                                onChange={handleChange}
                                style={{ width: '200px' }}
                            >
                                <option value=''>Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.role_id} value={role.role_id}>
                                        {role.role_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant='primary' type='submit'>
                                {selectedUser ? 'Update User' : 'Create User'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showReadModal} onHide={handleReadModalClose} dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title>Read-Only Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <div>
                            <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                            <p><strong>Middle Name:</strong> {selectedUser.middleName}</p>
                            <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Role:</strong> {selectedUser.role_name}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReadModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default User;
