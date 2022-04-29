import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const userSignin = useSelector((state) => state.auth);
    const { userInfo } = userSignin;
    return userInfo ? children : <Navigate to="/signing" />;
};

export default PrivateRoute;
