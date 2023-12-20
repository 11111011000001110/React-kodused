import { Link } from "react-router-dom";
import "../css/NavigationBar.css";

function NavigationBar() {
  return (
    <nav>
      <div className="navbar">
        <Link to="/products">
          <span className="nav-container">
            <span className="navbar-brand">Shipments</span>
          </span>
        </Link>
        <div>
          <span className="nav-item">
            <Link to="/shipments">
              <span>Shipments</span>
            </Link>
          </span>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar;