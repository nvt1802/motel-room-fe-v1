import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../store/actions/index'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import routes from '../containers/Routes'
import Headers from '../containers/layout/HeaderContainer'
import Footer from '../containers/layout/FooterContainer'
import Search from '../containers/home/search/SearchContainer'
import Login from '../containers/home/LoginContainer'
import AuthService from '../auth/AuthenticationService'
import AccountAPI from '../api/AccountAPI'
function AppContainer(props) {

    useEffect(() => {
        if (!props.authenticate.logged) {
            if (AuthService.isUserLoggedIn() && AuthService.getJwtAuthToken() !== null) {
                AccountAPI.findAccountByUserName(AuthService.getUsername()).then(res => {
                    let acc = {
                        "accountId": res.data.accountId,
                        "userName": res.data.userName,
                        "role": res.data.role,
                        "name": res.data.name,
                        "gender": res.data.gender,
                        "birthday": res.data.birthday,
                        "phone": res.data.phone,
                        "email": res.data.email,
                        "provinceId": res.data.provinceId,
                        "districtId": res.data.districtId
                    }
                    props.initAuthenticate(acc)
                }).catch(res => { })
            } else {

            }
        }
    }, [props])

    const RouteWithSubRoutes = (route) => {
        return (<>
            <Route
                path={route.path}
                exact={route.exact}
                render={props => (<>
                    <route.component {...props} routes={route.routes} />
                </>)}
            />
        </>)
    }

    return (<>
        {
            <Router>
                <Headers />
                <Search />
                <Switch>
                    <Switch>
                        {routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                </Switch >
                <Footer />
                <Login />
            </Router >
        }
    </>
    )
}

const mapStateToProps = state => ({
    authenticate: state.authenticate
})

const mapDispatchToProps = dispatch => ({
    initAuthenticate: (account) => dispatch(authenticate.initAuthenticate(account))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
