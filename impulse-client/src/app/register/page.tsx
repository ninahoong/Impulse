'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5298/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            alert('Registration successful! Please log in.');
            router.push('/login'); // Redirect to the login page
        } else {
            const errorData = await res.json();
            const errorMessages = errorData.map((err: any) => err.description).join('\n');
            alert(`Registration failed:\n${errorMessages}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleRegister} className="p-8 border rounded-lg shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                <div className="space-y-4">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="w-full p-2 border rounded" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 border rounded" />
                    <button type="submit" className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Register
                    </button>
                </div>
                <p className="text-center text-sm mt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}