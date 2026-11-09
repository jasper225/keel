import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import "../pages/styles/Home.css";

export default function Home() {
    const navigate = useNavigate();
    
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12" id="home-page">
            <main className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h1 className="mb-3 text-3xl font-semibold text-gray-900">Keel</h1>
            <p className='mb-6 text-gray-600'>Keep easy track of your finances</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center" id="login-register">
                <Button onClick={() => navigate('/login')}>Login</Button>
                <Button onClick={() => navigate('/register')}>Register</Button>
            </div>
            </main>
        </div>
    )
}