import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { isJwtExpired, getAuthToken, removeAuthToken, setAuthToken } from '../utils/token';
import { useGetMeQuery } from '../store/slices/authSlice';
import { setCredentials, logout } from '../store/slices/authSlice';

export default function Root({ children}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, isLoggedIn } = useSelector((state) => state.auth);
  
    const { data: userData, error: userError, isLoading } = useGetMeQuery(undefined, {
      skip: !token || isJwtExpired(token),
    });
  
    useEffect(() => {
      getAuthToken().then(async (authToken) => {
        if (authToken && !isJwtExpired(authToken)) {
          dispatch(setCredentials({ token: authToken }));
          navigate('/scrap');
        } else {
          navigate('/');
          dispatch(logout());
          removeAuthToken();
        }
      });
    }, []);
  
    useEffect(() => {
      if (userData) {
        dispatch(setCredentials({ token, user: userData }));
        navigate('/scrap');
      } else if (userError) {
        navigate('/');
        dispatch(logout());
        removeAuthToken();
      }
    }, [userData, userError]);
  
  return (
    <>
      {children}
    </>
  );
}
