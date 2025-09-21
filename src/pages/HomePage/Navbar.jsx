import React, { useEffect } from "react";
import { Hammer, LogIn, UserPlus, LogOut } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import IconButton from "../../components/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logout } from "../../features/auth/authSlice";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Find Workers", href: "/find-workers" },
  { name: "Customer Dashboard", href: "/customer-dashboard" },
  { name: "Worker Dashboard", href: "/worker-dashboard" },
  { name: "Admin Dashboard", href: "/admin-dashboard" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) dispatch(fetchUser());
  }, [user, dispatch]);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="bg-gray-900 text-white p-2 rounded-lg">
              <Hammer className="h-6 w-6" />
            </div>
            <span className="font-bold text-lg">WorkerFinder</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-gray-600 hover:opacity-80 font-medium transition-colors`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-gray-500 transition-all duration-300 ease-in-out ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* User Buttons / Info */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Profile Image */}
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
                    {user.first_name?.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Full Name */}
                <span className="font-medium text-gray-700">
                  {user.first_name} {user.last_name}
                </span>

                <IconButton
                  icon={LogOut}
                  label="Logout"
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                  }}
                />
              </div>
            ) : (
              <>
                <IconButton
                  icon={LogIn}
                  label="Login"
                  onClick={() => navigate("/login")}
                />
                <IconButton
                  icon={UserPlus}
                  label="Sign Up"
                  onClick={() => navigate("/register")}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
