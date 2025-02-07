'use client'
import {useEffect } from 'react';
import {usePathname, useRouter} from "next/navigation";

const token  = typeof window !== 'undefined' && sessionStorage.getItem('token');
const AuthGuard = ({ children }) => {
    const path = usePathname()
    const router = useRouter();

    const allowedRoutes = ['/', '/login'];

    useEffect(() => {
        if (!token && !allowedRoutes.includes(path)) {
            router.push('/login');
        }
    }, [token]);


    return <>{children}</>;
};

export default AuthGuard;
