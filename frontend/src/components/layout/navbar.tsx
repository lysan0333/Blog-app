import {  useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../action/authAction";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-black flex justify-between sticky top-0">
        <div className="flex">
        <div className="brand pt-3 ps-4">
        <img className="block h-8 w-auto lg:hidden " src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img>
        <img className="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"></img>
        </div>
          <Link className="p-3 text-white text-2xl" to="/">
            Dashboard
          </Link>
          {auth.isauth && (
            <Link className="p-3 mt-1 text-white text-xl" to="/myblog">
              EDIT
            </Link>
          )}
        </div>
        <div className="flex">
        <div className="pt-3">
        <img className="h-8 w-8 rounded-full animate-bounce" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
        </div>
          {auth.isauth ? ( 
            <button
              className="p-3 text-white text-lg inline-block align-middle"
              onClick={logout}
            >
              
              <span className=" font-bold pt-2.5 me-2 pe-3">{auth.user.name}</span>{" "}
              Logout
            </button>
          ) : (
            <>
              <Link className="p-3 text-white text-lg" to="/login">
                Login
              </Link>
              <Link className="p-3 text-white text-lg" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
