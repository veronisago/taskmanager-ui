import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import axiosInstance from '../../services/axios';
import axios from 'axios';
import { toast } from 'sonner';
import { LoginPayload, LoginResponse } from '../../types';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const loginUser = async (userData: LoginPayload) => {
        try {
            const response = await axiosInstance.post<LoginResponse>('/auth/login', userData);
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", response.data.token);
            navigate('/');
        } catch (error) {
            toast.error('Incorrect credentials!');
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || 'Login error');
            }
            throw new Error('Unknown error');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all fields!');
            return;
        }

        const userData: LoginPayload = { email, password };
        await loginUser(userData);
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className='bg-white p-6 shadow-md rounded-lg'>
                <h2 className='text-2xl font-bold mb-4'>Login</h2>
                <input
                    type='email'
                    placeholder='Email'
                    className='p-2 border rounded w-full mb-3'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    className='p-2 border rounded w-full mb-3'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='w-full p-2 bg-blue-500 text-white rounded cursor-pointer'>
                    Sign In
                </button>
                <button 
                    type='button' 
                    className='w-full p-2 bg-green-500 text-white rounded mt-4 cursor-pointer' 
                    onClick={() => navigate('/register')}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Login;
