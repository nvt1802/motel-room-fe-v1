import { connect } from 'react-redux'
import Header from '../../components/layout/HeaderComponent'
import { authenticate } from '../../store/actions/index'

const mapStateToProps = state => ({
    authenticate: state.authenticate
})

const mapDispatchToProps = (dispatch) => ({
    removeAuthenticate: () => dispatch(authenticate.removeAuthenticate())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
