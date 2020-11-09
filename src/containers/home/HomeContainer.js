import { connect } from 'react-redux'
import Home from '../../components/home/HomeComponent'
import { initPostLatest, initPostCommon, initPostCheap } from '../../store/actions/index'

const mapStateToProps = state => ({
    postLatest: state.discover.postLatest,
    postCommon: state.discover.postCommon,
    postCheap: state.discover.postCheap
})

const mapDispatchToProps = dispatch => ({
    initPostLatest: (postLatest) => dispatch(initPostLatest(postLatest)),
    initPostCommon: (postCommon) => dispatch(initPostCommon(postCommon)),
    initPostCheap: (postCheap) => dispatch(initPostCheap(postCheap))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
