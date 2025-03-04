import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <Link to="/" className="font-bold text-lg">
        Task Manager
      </Link>
      <div>
        {isAuthenticated ? (
          <button onClick={() => dispatch(logout())} className="bg-red-500 px-3 py-1 rounded">
            Cerrar Sesión
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
