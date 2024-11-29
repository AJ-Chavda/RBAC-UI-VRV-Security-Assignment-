// Importing necessary components and libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // For routing
import Home from './components/Home'; // Home page component
import Login from './components/Login'; // Login page component
import Navbar from './components/Navbar'; // Navigation bar component
import Dashboard from './components/Dashboard'; // Dashboard page component
import { AuthProvider } from './context/AuthContext'; // Context provider for authentication state
import PrivateRoute from './middleware/PrivateRoute'; // Middleware to protect private routes
import Register from './components/Register'; // Register page component
import UserManagement from './components/UserManagement'; // User management page
import RoleManagement from './components/RoleManagement'; // Role management page
import PermissionManagement from './components/PermissionManagement'; // Permission management page

function App() {
  return (
    // Wrapping the application with AuthProvider to provide authentication context
    <AuthProvider>
      {/* Setting up routing for the app */}
      <Router>
        {/* Including the Navbar component on every page */}
        <Navbar />
        
        {/* Defining the Routes for each page */}
        <Routes>
          {/* Public route for the Home page */}
          <Route path="/" element={<Home />} />
          
          {/* Public route for the Login page */}
          <Route path="/login" element={<Login />} />
          
          {/* Public route for the Register page */}
          <Route path="/register" element={<Register />} />
          
          {/* Private route for the Dashboard page */}
          <Route path="/dashboard" element={
            <PrivateRoute> {/* Protected route, only accessible if authenticated */}
              <Dashboard /> {/* Dashboard page component */}
            </PrivateRoute>
          } />
          
          {/* Private route for User Management page */}
          <Route path='/user-management' element={
            <PrivateRoute> {/* Protected route */}
              <UserManagement /> {/* User management page component */}
            </PrivateRoute>
          } />
          
          {/* Private route for Role Management page */}
          <Route path='/role-management' element={
            <PrivateRoute> {/* Protected route */}
              <RoleManagement /> {/* Role management page component */}
            </PrivateRoute>
          } />
          
          {/* Private route for Permission Management page */}
          <Route path='/permission-management' element={
            <PrivateRoute> {/* Protected route */}
              <PermissionManagement /> {/* Permission management page component */}
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; // Exporting the App component for use
