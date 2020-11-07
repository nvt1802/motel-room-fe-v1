import { connect } from 'react-redux'
import Search from '../../../components/home/search/SearchComponent'

const mapStateToProps = state => ({
    state
})

export default connect(mapStateToProps, null)(Search)
