import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import "./header.css"

const Header = () => {
    return (
        <header className="app_header">
            <h1 className="app_title">
                <Link to="/">
                    Meal Sharing
                </Link>
            </h1>
            <nav className="app__menu">
                <ul className="app__menu_items">
                    <li ><NavLink activeStyle={{'color': '#F26644'}} to="/meals">Meals</NavLink></li>
                  
                </ul>
            </nav>
        </header>
    )
}

export default Header;