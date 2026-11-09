
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    
    return (
        <div 
         className="flex"
         id="home-page">
            <h1 className="">Keel</h1>
            <p>Keep easy track of your finances</p>
            <div className="buttons">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        </div>
    )
}