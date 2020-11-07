import { connect } from 'react-redux'
import Header from '../../components/layout/HeaderComponent'

const mapStateToProps = state => ({
    authenticate: state.authenticate
})

export default connect(mapStateToProps, null)(Header)
