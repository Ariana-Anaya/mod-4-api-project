import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import ProfileButton from "../ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav className="nav-bar flex-container">
      <ul className="nav-list-container flex-container">
        <li>
          <NavLink to="/">{<Logo />}</NavLink>
        </li>

        {isLoaded && (
          <li>
            <ul className="flex-container logged-in-nav-list">
              {sessionUser && (
                <li>
                  <NavLink to="/spots/new" className="create-spot">
                    Create a New Spot
                  </NavLink>
                </li>
              )}
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            </ul>{" "}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
