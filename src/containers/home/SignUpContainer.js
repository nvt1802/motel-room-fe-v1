import { connect } from 'react-redux'
import SignUp from '../../components/home/SignUpComponent'

const mapStateToProps = state => ({
    state
})

export default connect(mapStateToProps, null)(SignUp)
