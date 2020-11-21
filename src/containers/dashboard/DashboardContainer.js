import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { layoutAction } from '../../store/actions/index'
import '../../assets/style/dashboard.css'
import Sidebar from './sidebar/SidebarComponent'
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom'
import AuthService from '../../auth/AuthenticationService'
import { RouteWithSubRoutes } from '../Routes'

function Dashboard(props) {

    const [active, setActive] = useState(0)

    useEffect(() => {
        document.title = 'Dashboard'
    }, [props])

    useEffect(() => {
        if (props.layout.adminPage === false) {
            props.updateLayout(true)
        }
    }, [props])

    const handleClickLogout = (e) => {
        e.preventDefault()
        AuthService.logout()
        props.match.history.push("/")
    }

    return <>
        <div id="wrapper">
            {props.layout.adminPage &&
                <nav className="navbar navbar-expand-sm bg-light">
                    <ul className="navbar-nav">
                        <Link className="navbar-brand" to="/">Motel Room</Link>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item ">
                            <a onClick={(e) => e.preventDefault()} className="nav-link" href="/">username </a>
                        </li>
                        <li className="nav-item ">
                            <a onClick={handleClickLogout} className="nav-link" href="/">Logout <i className="ml-1 fa fa-sign-out"></i></a>
                        </li>
                    </ul>
                </nav>
            }
            <Router>
                <div id="content">
                    <Switch>
                        {props.routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </div>
                <Sidebar account={props.authenticate.account} active={active} setActive={setActive} />
            </Router>
        </div>
    </>
}

const mapStateToProps = state => ({
    authenticate: state.authenticate,
    layout: state.layout
})

const mapDispatchToProps = dispatch => ({
    updateLayout: value => dispatch(layoutAction.changeLayout(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)