import { Link } from "react-router-dom";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            TrueGas
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/AddAssingment">Add Assingment</Link>
                    </li>
                    <li>
                        <Link to="/Completed">Completed</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
