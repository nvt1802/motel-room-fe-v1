import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/style/layout/header.css'
import UserLink from './DropdownLinkComponent'

function Header(props) {

    const handleMouseOver = (e) => {
        document.getElementsByClassName('logo-text')[0].classList.remove('logo-hidden')
        document.getElementsByClassName('logo-text')[1].classList.remove('logo-hidden')
    }

    const handleMouseOut = (e) => {
        document.getElementsByClassName('logo-text')[0].classList.add('logo-hidden')
        document.getElementsByClassName('logo-text')[1].classList.add('logo-hidden')
    }

    return (
        <div>
            <header className="header-area shadow" id="fixedTopNav" style={{ position: 'fixed', top: '-100px', transition: '1000ms' }}>
                <div className="newsbox-main-menu" style={{ height: '60px' }}>
                    <div className="classy-nav-container breakpoint-off">
                        <div className="container-fluid">
                            <nav className="classy-navbar justify-content-between" id="newsboxNav" style={{ height: '75px' }}>
                                <Link to="/" style={{ textDecoration: 'none', width: '100px' }}>
                                    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="nav-brand" style={{ width: '200px', marginLeft: '65px' }}>
                                        <ul className="logo-text logo-hidden logoWeb" id="logoWeb" style={{ marginTop: '35px', width: '240px' }}>
                                            <li className="spaced" style={{ color: 'red' }}>M</li>
                                            <li className="ghost">otel</li>
                                            <li className="spaced" style={{ color: 'red' }}>R</li>
                                            <li className="ghost">oom</li>
                                        </ul>
                                    </div>
                                </Link>
                                <div className="classy-navbar-toggler">
                                    <span className="navbarToggler"><span /><span /><span /></span>
                                </div>
                                <div className="classy-menu">
                                    <div className="classycloseIcon">
                                        <div className="cross-wrap"><span className="top" /><span className="bottom" /></div>
                                    </div>
                                    <div className="classynav">
                                        <ul>
                                            {props.authenticate.logged && <UserLink account={props.authenticate.account} setLogged={props.setLogged}></UserLink>}
                                            {!props.logged && (<>
                                                <li>
                                                    <Link to="/signUp" style={{ fontSize: 'unset' }}>Đăng ký</Link>
                                                </li>
                                                <li>
                                                    <a href="/" style={{ fontSize: 'unset' }} data-toggle="modal" data-target="#loginModal">Đăng nhập</a>
                                                </li>
                                            </>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <header className="header-area">
                <div className="newsbox-main-menu" style={{ height: '60px' }}>
                    <div className="classy-nav-container breakpoint-off">
                        <div className="container-fluid">
                            <nav className="classy-navbar justify-content-between" id="newsboxNav" style={{ height: '75px' }}>
                                <Link to="/" style={{ textDecoration: 'none', width: '50px' }}>
                                    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="nav-brand" style={{ width: '200px', marginLeft: '65px' }}>
                                        <ul className="logo-text logo-hidden logoWeb" id="logoWeb" style={{ marginTop: '35px', width: '240px' }}>
                                            <li className="spaced" style={{ color: 'red' }}>M</li>
                                            <li className="ghost">otel</li>
                                            <li className="spaced" style={{ color: 'red' }}>R</li>
                                            <li className="ghost">oom</li>
                                        </ul>
                                    </div>
                                </Link>
                                <div className="classy-navbar-toggler">
                                    <span className="navbarToggler"><span /><span /><span /></span>
                                </div>
                                <div className="classy-menu">
                                    <div className="classycloseIcon">
                                        <div className="cross-wrap"><span className="top" /><span className="bottom" /></div>
                                    </div>
                                    <div className="classynav">
                                        <ul>
                                            {props.authenticate.logged && <UserLink account={props.authenticate.account}></UserLink>}
                                            {!props.logged && (<>
                                                <li>
                                                    <Link to="/signUp" style={{ fontSize: 'unset' }}>Đăng ký</Link>
                                                </li>
                                                <li>
                                                    <a href="/" style={{ fontSize: 'unset' }} data-toggle="modal" data-target="#loginModal">Đăng nhập</a>
                                                </li>
                                            </>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header