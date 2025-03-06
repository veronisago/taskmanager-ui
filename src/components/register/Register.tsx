import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/authSlice';
import { AppDispatch } from '../../store/store';
import axiosInstance from '../../services/axios';
import axios from 'axios';
import { toast } from 'sonner';
import { RegisterPayload, RegisterUserResponse } from '../../types';
import Button from '../../common/Button';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const registerUser = async (userData: RegisterPayload) => {
        try {
            const response = await axiosInstance.post<RegisterUserResponse>('/auth/register', userData);
            dispatch(setUser(response.data.user));
            toast.success('User created successfully!');
            navigate('/login');
        } catch (error) {
            toast.error('Error creating user!');
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || 'Registration error');
            }
            throw new Error('Unknown error');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData: RegisterPayload = { name, email, password };

        if (!name.trim() || !email.trim() || !password.trim()) {
            toast.error('Please fill in all fields!');
            return;
        }
        await registerUser(userData);
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className='bg-white p-6 shadow-md rounded-lg w-96'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>

                <input
                    type='text'
                    placeholder='Full Name'
                    className='p-2 border rounded w-full mb-3 font-inter'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type='email'
                    placeholder='Email'
                    className='p-2 border rounded w-full mb-3 font-inter'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type='password'
                    placeholder='Password'
                    className='p-2 border rounded w-full mb-3 font-inter'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    type='submit'
                    className='w-full bg-blue-500 hover:bg-blue-600'
                >
                    Sign Up
                </Button>
                <p className='text-sm mt-4 text-center'>
                    Already have an account?{' '}
                    <a href='/login' className='text-blue-500 hover:underline'>
                        Sign in
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
