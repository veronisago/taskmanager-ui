import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center w-full max-w-4xl py-4 px-6 bg-blue-500 text-white rounded-md shadow-lg">
      <div className="flex flex-row gap-2 items-center">
        <i className="fa fa-solid fa-house text-xl"></i>
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </div>
      <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded flex items-center gap-2">
        <i className="fas fa-sign-out-alt"></i> Log Out
      </button>
    </nav>
  );
};

export default NavBar;
