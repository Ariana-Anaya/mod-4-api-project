import { GiAnteater } from "react-icons/gi";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-container flex-container">
      <div className="icon-container flex-container">
        <GiAnteater style={{ color: "F1E9DC" }} />
      </div>
      <p className="logo-text">
        <span className="brown-logo-text">AArdvark</span>Abodes
      </p>
    </div>
  );
};

export default Logo;
