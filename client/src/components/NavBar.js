import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
    render() {
        return (
            <header className='navbar fixed-top' style={{ backgroundColor: "#40e0d0" }}>
                <div className="container">
                    <Link className='navbar__item text-white ' to="/">School System</Link>
                </div>
            </header>
        )
    }
}

export default NavBar