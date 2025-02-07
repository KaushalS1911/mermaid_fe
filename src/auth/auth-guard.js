'use client'
import {useEffect } from 'react';
import {usePathname, useRouter} from "next/navigation";

const AuthGuard = ({ children }) => {
    const token  = typeof window !== 'undefined' && sessionStorage.getItem('token');
    const path = usePathname()
    const router = useRouter();

    const allowedRoutes = ['/', '/login'];

    useEffect(() => {
        if (!token && !allowedRoutes.includes(path)) {
            router.push('/login');
        }
    }, [token, path]);


    return <>{children}</>;
};

export default AuthGuard;