import {Link} from "react-router-dom";

export default function Navbar(){
    return(
        <div id="nav">
            <Link to="/stats"><img src="src/icons/history.png" alt ="history icon" id="nav_left"/></Link>
            <Link to="/"><img src="src/icons/home.png" alt ="home icon" id="nav_mid"/></Link>
            <Link to="/edit"><img src="src/icons/edit.png" alt ="edit icon" id="nav_right"/></Link>
        </div>
    );
}