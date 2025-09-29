import React, { useEffect, useState, useRef } from 'react';
import { Hammer, LogIn, UserPlus, LogOut, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import IconButton from '../../components/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logout } from '../../features/auth/authSlice';
import { getImageUrl } from '../../helper';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    if (!user) dispatch(fetchUser());

    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setMobileMenuOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, dispatch]);

  const navigation = [{ name: 'Home', href: '/' }];

  if (user?.role === 'customer') {
    navigation.push(
      { name: 'Find Workers', href: '/find-workers' },
      { name: 'Customer Dashboard', href: `/customer-dashboard/${user._id}` }
    );
  } else if (user?.role === 'worker') {
    navigation.push({
      name: 'Worker Dashboard',
      href: `/worker-dashboard/${user._id}`,
    });
  } else if (user?.role === 'admin') {
    navigation.push({
      name: 'Admin Dashboard',
      href: `/admin-dashboard/${user._id}`,
    });
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  const profileImageUrl = getImageUrl(user?.profileImage);

  return (
    <nav className='bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2 cursor-pointer'>
            <div className='bg-gray-900 text-white p-2 rounded-lg'>
              <Hammer className='h-6 w-6' />
            </div>
            <span className='font-bold text-lg text-gray-900'>
              WorkerFinder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-4'>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className='relative text-gray-600 hover:opacity-80 font-medium transition-colors'
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-gray-500 transition-all duration-300 ease-in-out ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* User Info / Auth Buttons */}
          <div className='hidden md:flex items-center space-x-3'>
            {user ? (
              <div className='flex items-center space-x-3'>
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt={`${user.first_name} ${user.last_name}`}
                    className='w-8 h-8 rounded-full object-cover'
                  />
                ) : (
                  <div className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold'>
                    {user.first_name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className='font-medium text-gray-700'>
                  {user.first_name} {user.last_name}
                </span>
                <IconButton
                  icon={LogOut}
                  label='Logout'
                  onClick={handleLogout}
                />
              </div>
            ) : (
              <>
                <IconButton
                  icon={LogIn}
                  label='Login'
                  onClick={() => navigate('/login')}
                />
                <IconButton
                  icon={UserPlus}
                  label='Sign Up'
                  onClick={() => navigate('/register')}
                />
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className='md:hidden'>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className='text-gray-900 focus:outline-none'
            >
              <Menu className='h-6 w-6' />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex justify-between items-center p-4 border-b'>
          <span className='font-bold text-gray-900'>Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className='text-gray-900'
          >
            <X className='h-6 w-6' />
          </button>
        </div>

        <div className='p-4 space-y-4'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className='block text-gray-900 font-medium '
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className='border-t pt-4'>
            {user ? (
              <div className='flex items-center justify-between'>
                <span className='text-gray-900'>
                  {user.first_name} {user.last_name}
                </span>
                <button
                  onClick={handleLogout}
                  className='text-red-600 hover:underline text-sm'
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className='flex flex-col space-y-2'>
                <button
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  className='flex items-center gap-2 text-gray-900'
                >
                  <LogIn className='h-4 w-4' />
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setMobileMenuOpen(false);
                  }}
                  className='flex items-center gap-2 text-gray-900'
                >
                  <UserPlus className='h-4 w-4' />
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
