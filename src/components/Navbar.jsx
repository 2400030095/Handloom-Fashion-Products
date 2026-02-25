import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="logo"><Link to="/">HandloomFashion</Link></div>

            <div className="links">
                <Link to="/">Home</Link>
                {user.role === 'guest' ? (
                    <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                        Login
                    </Link>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to={`/${user.role}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={18} /> {user.name} ({user.role})
                        </Link>
                        <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem', border: 'none' }}>
                            <LogOut size={18} />
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
