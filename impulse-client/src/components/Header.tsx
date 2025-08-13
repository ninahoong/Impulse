'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    // This effect runs when the component loads on the client side.
    // It checks if a token exists in localStorage to determine the login state.
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // The '!!' converts the token string (or null) to a boolean
    }, []);

    const handleLogout = () => {
        // Remove the token from storage
        localStorage.removeItem('token');
        // Update the state to reflect the user is logged out
        setIsLoggedIn(false);
        // Redirect to the login page
        router.push('/login');
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Impulse
                </Link>
                <div className="flex gap-4 items-center">
                    {isLoggedIn ? (
                        // If the user is logged in, show the Logout button
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    ) : (
                        // If the user is not logged in, show Login and Register links
                        <>
                            <Link href="/login" className="hover:underline">
                                Login
                            </Link>
                            <Link href="/register" className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}