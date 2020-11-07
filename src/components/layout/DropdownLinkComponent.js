import React from 'react';
import { Link } from 'react-router-dom'

export default function DropdownLink(props) {
    return (
        <>
            <li className="dropdown">
                <a href="/" data-toggle="dropdown" onClick={(e) => { e.preventDefault() }}>
                    <span style={{ marginLeft: '2em', marginRight: '2em' }}><i className="fa fa-user mr-2"></i>{props.account.userName}</span>
                </a>
                <div className="dropdown-menu">
                    <Link className="text-center" to="/" onClick={(e) => { e.preventDefault() }}>{props.account.name}</Link>
                    <Link className="dropdown-item" to="/dashboard"><i className="fa fa-cog mr-2"></i>Dashboard</Link>
                    <Link to="/logout" className="dropdown-item"><i className="fa fa-sign-out mr-2"></i>Đăng xuất</Link>
                </div>
            </li>
        </>
    );
};