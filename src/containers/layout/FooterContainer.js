import { connect } from 'react-redux'
import Footer from '../../components/layout/FooterComponent'

const mapStateToProps = state => ({
    state
})

export default connect(mapStateToProps, null)(Footer)
