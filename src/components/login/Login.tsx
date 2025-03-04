import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import axiosInstance from '../../services/axios';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

interface LoginPayload {
    email: string;
    password: string;
}

type LoginResponse = {
    user: { id: string; name: string; email: string };
    token: string;
};

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
            toast('Incorrect credentials!')
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || 'Login error');
            }
            throw new Error('Unknow error');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData: LoginPayload = { email, password };
        await loginUser(userData);
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <Toaster />
            <form onSubmit={handleSubmit} className='bg-white p-6 shadow-md rounded-lg'>
                <h2 className='text-2xl font-bold mb-4'>Iniciar Sesión</h2>
                <input
                    type='email'
                    placeholder='Email'
                    className='p-2 border rounded w-full mb-3'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Contraseña'
                    className='p-2 border rounded w-full mb-3'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='w-full p-2 bg-blue-500 text-white rounded'>
                    Ingresar
                </button>
                <button 
                    type='button' 
                    className='w-full p-2 bg-green-500 text-white rounded mt-4' 
                    onClick={() => navigate('/register')}
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Login;
