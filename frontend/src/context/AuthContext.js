import React, {createContext, useState, useEffect} from "react";
import axios from '../axios'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [dashboardData, setDashboardData] = useState(null);

    const fetchUserData = async (token) => {
        try{
            const response = await axios.get('/api/user/');
            setUser(response.data);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const fetchDashboardData = async (token) => {
        try {
            const response = await axios.get('/api/dashboard/');
            setDashboardData(response.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error.response?.data || error.message);
            if (error.response?.status === 401) {
                console.error('Unauthorized access. Please check your token or permissions.');
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Set the token globally for all Axios requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUserData(token);
            fetchDashboardData(token);
        } else {
            console.error("No token found in localStorage");
            setLoading(false); // Stop loading if no token
        }
    }, []);

    const login = async (credentials, navigate) => {
        try{
            const response = await axios.post('/api/auth/login/', credentials);
            const {access, refresh} = response.data;
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);

            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            await fetchUserData(access);
            navigate('/dashboard');
        }catch(error){
            if (error.response && error.response.status === 401) {
                setErrors({ login: "Invalid username or password. Please try again." });
            } else {
                console.error(error);
            }
        }finally{
            setLoading(false);
        }
    }

    const register = async (credentials, navigate) => {
        try{
            const response = await axios.post('/api/auth/register/', credentials);
            console.log(response.data);
            navigate('/login');
        }catch(error){
            if(error.response && error.response.status === 400){
                setErrors(error.response.data);
            }else{
                console.log(error);
            }
        }finally{
            setLoading(false);
        }
    }

    const logout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, dashboardData, login, logout, register, loading, errors}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;