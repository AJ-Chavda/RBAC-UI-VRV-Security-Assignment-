import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaUser, FaKey, FaShieldAlt } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [data, setData] = useState({
        totalUsers: 0,
        totalRoles: 0,
        totalPermissions: 0,
        rolesData: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                if (!token) {
                    console.error("No token found in localStorage.");
                    return;
                }

                // Include the token in the Authorization header
                const response = await axios.get('http://localhost:8000/api/dashboard/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData({
                    totalUsers: response.data.total_users,
                    totalRoles: response.data.total_roles,
                    totalPermissions: response.data.total_permissions,
                    rolesData: response.data.roles,
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error.response?.data || error.message);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <Container>
            <h1>Dashboard Overview</h1>
            <Row className="my-4">
                {/* Total Users Card */}
                <Col md={4}>
                    <Card className="shadow-sm border-0 my-card" onClick={() => navigate("/user-management")}
                        style={{ cursor: "pointer" }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                            <FaUser size={40} className="text-primary" />
                            <h5 className="mt-2">Total Users</h5>
                        </div>
                        <h1 className="text-dark mb-0">{data.totalUsers}</h1>
                        </Card.Body>
                    </Card>
                </Col>
                {/* Total Roles Card */}
                <Col md={4}>
                    <Card className="shadow-sm border-0 my-card" onClick={() => navigate("/role-management")}
                        style={{ cursor: "pointer" }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <FaKey size={40} className="text-success" />
                                <h5 className="mt-2">Total Roles</h5>
                            </div>
                            <h1 className="text-dark mb-0">{data.totalRoles}</h1>
                        </Card.Body>
                    </Card>
                </Col>
                {/* Total Permissions Card */}
                <Col md={4}>
                    <Card className="shadow-sm border-0 my-card" onClick={() => navigate("/permission-management")}
                        style={{ cursor: "pointer" }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <FaShieldAlt size={40} className="text-warning" />
                                <h5 className="mt-2">Total Permissions</h5>
                            </div>
                            <h1 className="text-dark mb-0">{data.totalPermissions}</h1>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Users per Role Section */}
            <h4>Users per Role</h4>
            <Row>
                {data.rolesData.map((role, index) => (
                    <Col key={index} md={4}>
                        <Card className="shadow-sm border-0 my-card1 mb-2">
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <h5>{role.name}</h5>
                                <p className="h3" style={{width: "35px", backgroundColor: "#dbeafe", borderRadius: "50%", textAlign: "center"}}>{role.user_count}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Dashboard;
