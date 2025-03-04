import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/authSlice';
import Button from '../components/Button';
import { AppDispatch } from '../store/store';
import axiosInstance from '../services/axios';
import axios from 'axios';

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

type RegisterUserResponse = {
    user: { id: string; name: string; email: string };
    token: string;
};

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
            navigate('/login');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || 'Error en el registro');
            }
            throw new Error('Error desconocido');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData: RegisterPayload = { name, email, password };
        await registerUser(userData);
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <form onSubmit={handleSubmit} className='bg-white p-6 shadow-md rounded-lg w-96'>
                <h2 className='text-2xl font-bold mb-4 text-center'>Registro</h2>

                <input
                    type='text'
                    placeholder='Nombre'
                    className='p-2 border rounded w-full mb-3'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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

                <Button type='submit' className='w-full'>
                    Registrarse
                </Button>

                <p className='text-sm mt-4 text-center'>
                    ¿Ya tienes cuenta?{' '}
                    <a href='/login' className='text-blue-500 hover:underline'>
                        Inicia sesión
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
