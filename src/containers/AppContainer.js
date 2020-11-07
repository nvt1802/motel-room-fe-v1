import { connect } from 'react-redux'
import App from '../components/App'
import { initAuthenticate } from '../store/actions/index'

const mapStateToProps = state => ({
    authenticate: state.authenticate
})

const mapDispatchToProps = dispatch => ({
    initAuthenticate: (account) => dispatch(initAuthenticate(account, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
