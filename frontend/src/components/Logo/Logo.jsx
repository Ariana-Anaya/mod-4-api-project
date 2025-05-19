import { GiAnteater } from "react-icons/gi";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="logo-container flex-container">
      <div className="icon-container flex-container">
        <GiAnteater style={{ color: "black" }} />
      </div>
      <p className="logo-text">
        <span className="brown-logo-text">AAdvark</span>Abodes
      </p>
    </div>
  );
};

export default Logo;
