import React,{useEffect, useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../helpers/authorization';

const ProtectedRoute = () => {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated();
            setIsAuth(result);
        };
        
        checkAuth();
    },[]);

    if(isAuth === null) return <div>Loading...</div>

    // Redirect to login if not authenticated, otherwise render the protected component
    return isAuth ? <Outlet /> : <Navigate to="/" replace />;
    
    //   if (!isAuthenticated()) {
    //     toast.error('Acceso No Autorizado. Redireccionando a pantalla de ingreso...', { autoClose: 2000 });
    //     return <Navigate to="/voy" replace />;
    //   }
    //  return children ? children : <Outlet />;
};

export default ProtectedRoute;
