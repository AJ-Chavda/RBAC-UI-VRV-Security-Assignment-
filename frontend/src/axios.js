import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000'
});

const token = localStorage.getItem('token');
if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('Refresh token is missing.');
                }
                const response = await instance.post('/api/token/refresh/', {
                    refresh: refreshToken
                });
                const { access } = response.data;
                localStorage.setItem('token', access);
                instance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return instance(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token is invalid or expired:', refreshError);

                // Clear tokens and redirect to login page
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login'; // Redirect to login page
            }
        }
        return Promise.reject(error);
    }
)

export default instance;