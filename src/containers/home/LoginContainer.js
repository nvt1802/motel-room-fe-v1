import { connect } from 'react-redux'
import Login from '../../components/home/LoginComponent'
import { initAuthenticate } from '../../store/actions/index'

// const mapStateToProps = state => ({
//     authenticate: state.authenticate
// })

const mapDispatchToProps = dispatch => ({
    initAuthenticate: (account) => dispatch(initAuthenticate(account, true))
})

export default connect(null, mapDispatchToProps)(Login)
