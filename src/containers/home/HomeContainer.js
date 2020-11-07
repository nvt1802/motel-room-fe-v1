import { connect } from 'react-redux'
import Home from '../../components/home/HomeComponent'

const mapStateToProps = state => ({
    state
})

export default connect(mapStateToProps)(Home)
