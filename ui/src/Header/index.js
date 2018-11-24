import React from 'react';
import { Link } from "react-router-dom";


export default function Header (props) {
    // const {  } = props

    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <Link className="navbar-brand" to="/">Птички</Link>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Добавить</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/report">Отчеты</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

