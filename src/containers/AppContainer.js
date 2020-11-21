import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../store/actions/index'
import { BrowserRouter as Router, Switch } from "react-router-dom"
import routes, { RouteWithSubRoutes } from './Routes'
import AuthService from '../auth/AuthenticationService'
import AccountAPI from '../api/AccountAPI'
import Header from './layout/HeaderContainer'
import Footer from './layout/FooterContainer'
import Login from './home/LoginContainer'
import Search from './home/search/SearchContainer'
import '../assets/style/index.css'
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

    return (<>
        <Router>
            {!props.layout.adminPage && (<>
                <Header />
                <Search />
            </>)}
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch >
            {!props.layout.adminPage && (<>
                <Login />
                <Footer />
            </>)}
        </Router >
    </>
    )
}

const mapStateToProps = state => ({
    authenticate: state.authenticate,
    layout: state.layout
})

const mapDispatchToProps = dispatch => ({
    initAuthenticate: (account) => dispatch(authenticate.initAuthenticate(account))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
