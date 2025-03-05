import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className='fixed top-0 left-0 w-full z-50 flex justify-between items-center py-3 px-6 bg-white shadow-lg'>
            <div className='flex flex-row gap-2 items-center'>
                <i className='fa fa-solid fa-house text-xl'></i>
                <h1 className='text-xl font-bold'>Task Manager</h1>
            </div>
            <button
                onClick={handleLogout}
                className='font-sora p-2 bg-red-500 text-white rounded flex items-center gap-2 text-sm cursor-pointer'
            >
               Log Out <i className='fas fa-sign-out-alt'></i>
            </button>
        </nav>
    );
};

export default NavBar;
