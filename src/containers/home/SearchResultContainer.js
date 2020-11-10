import { connect } from 'react-redux'
import SearchResult from '../../components/home/SearchResultComponent'

function SearchResultContainer(props) {
    return <SearchResult searchData={{}} />
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultContainer)
