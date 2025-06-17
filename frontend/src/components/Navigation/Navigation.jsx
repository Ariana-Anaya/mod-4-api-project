import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { GiAnteater } from "react-icons/gi";
import './ProfileButton.css'
function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div>
            <div className='logo-container' onClick={() => window.location.href= '/'}>
            <GiAnteater style={{ color: "F1E9DC" }} />
            <span className='brown-logo-text'>AArdvark</span>Abodes
      </div>
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <ul className="header-right">
            {}
                {isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </ul>
            </ul>
        </nav>
        </div>
    );
}

export default Navigation;
