import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/roles/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error.response?.data || error.message);
    }
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Add delete logic here
      console.log("Deleted user ID:", userId);
    }
  };

  const filteredUsers = users.filter((user) => {
    console.log(user);
    const userStatus = user.status ? user.status.toLowerCase() : "";
    const userRole = user.role ? user.role.name : "";
    const userName = user.name ? user.name.toLowerCase() : "";
    const userEmail = user.email ? user.email.toLowerCase() : "";
  
    const matchesStatus =
      statusFilter === "All" || userStatus === statusFilter.toLowerCase();
    const matchesRole = roleFilter === "All" || userRole === roleFilter;
    const matchesSearch =
      userName.includes(searchQuery.toLowerCase()) ||
      userEmail.includes(searchQuery.toLowerCase());
  
    return matchesStatus && matchesRole && matchesSearch;
  });

  return (
    <div className="p-4">
      <h2>User Management</h2>
      <p>Manage user accounts and permissions</p>

      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2} className="text-end">
          <Button variant="primary">+ Add New User</Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.roles && user.roles.length > 0 ? user.roles.map(role => role.role_name).join(", ") : "No roles"}</td>
              <td>
                <span
                  className={`badge ${
                    user.status === "active" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td>
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={() => console.log("Edit user ID:", user.id)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="link"
                  className="text-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagement;
