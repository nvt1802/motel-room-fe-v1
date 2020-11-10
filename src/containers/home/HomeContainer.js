import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Home from '../../components/home/HomeComponent'
import { discoverAction } from '../../store/actions/index'
import DiscoverAPI from '../../api/DiscoverAPI'

function HomeContainer(props) {

    const getPostLatest = (pageCommon) => {
        DiscoverAPI.discoverLatest(pageCommon).then(res => {
            props.initPostLatest(res.data)
            props.updateTotalPageLatest(res.data.totalPages)
        })
    }

    const getPostCommon = (pageCommon) => {
        DiscoverAPI.discoverCommon(pageCommon).then(res => {
            props.initPostCommon(res.data)
            props.updateTotalPageCommon(res.data.totalPages)
        })
    }

    const getPostCheap = (pageCommon) => {
        DiscoverAPI.discoverCheap(pageCommon).then(res => {
            props.initPostCheap(res.data)
            props.updateTotalPageCheap(res.data.totalPages)
        })
    }

    useEffect(() => {
        const pageCommon = {
            "page": 0,
            "pageSize": 6
        }
        if (Object.keys(props.postLatest).length === 0) { getPostLatest(pageCommon) }
        if (Object.keys(props.postCommon).length === 0) { getPostCommon(pageCommon) }
        if (Object.keys(props.postCheap).length === 0) { getPostCheap(pageCommon) }
        document.title = 'Home'
    })

    const seeMorePostLatest = () => {
        const pageCommon = {
            "page": props.pageIndexLatest + 1,
            "pageSize": 6
        }
        props.updatePageIndexLatest(props.pageIndexLatest + 1)
        DiscoverAPI.discoverLatest(pageCommon).then(res => {
            let listPostDtos = props.postLatest.listPostDtos
            res.data.listPostDtos.forEach(element => {
                listPostDtos.push(element)
            })
            let data = {
                listPostDtos: listPostDtos,
                totalPages: res.data.totalPages,
                pageSize: res.data.pageSize
            }
            props.initPostLatest(data)
            props.updateTotalPageLatest(res.data.totalPages)
        })
    }

    const seeMorePostCommon = () => {
        const pageCommon = {
            "page": props.pageIndexCommon + 1,
            "pageSize": 6
        }
        props.updatePageIndexCommon(props.pageIndexCommon + 1)
        DiscoverAPI.discoverCommon(pageCommon).then(res => {
            let listPostDtos = props.postCommon.listPostDtos
            res.data.listPostDtos.forEach(element => {
                listPostDtos.push(element)
            })
            let data = {
                listPostDtos: listPostDtos,
                totalPages: res.data.totalPages,
                pageSize: res.data.pageSize
            }
            props.initPostCommon(data)
            props.updateTotalPageCommon(res.data.totalPages)
        })
    }

    const seeMorePostCheap = () => {
        const pageCommon = {
            "page": 0,
            "pageSize": 6 * ((props.pageIndexCheap + 1) + 1)
        }
        props.updatePageIndexCheap(props.pageIndexCheap + 1)
        DiscoverAPI.discoverCheap(pageCommon).then(res => {
            props.initPostCheap(res.data)
            props.updateTotalPageCheap(res.data.totalPages)
        })
    }

    return <Home
        {...props}
        seeMorePostLatest={seeMorePostLatest}
        seeMorePostCommon={seeMorePostCommon}
        seeMorePostCheap={seeMorePostCheap}
    />
}

const mapStateToProps = state => ({
    postLatest: state.discover.postLatest,
    postCommon: state.discover.postCommon,
    postCheap: state.discover.postCheap,
    pageIndexLatest: state.discover.pageIndexLatest,
    totalPageLatest: state.discover.totalPageLatest,
    pageIndexCommon: state.discover.pageIndexCommon,
    totalPageCommon: state.discover.totalPageCommon,
    pageIndexCheap: state.discover.pageIndexCheap,
    totalPageCheap: state.discover.totalPageCheap
})

const mapDispatchToProps = dispatch => ({
    initPostLatest: (postLatest) => dispatch(discoverAction.initPostLatest(postLatest)),
    initPostCommon: (postCommon) => dispatch(discoverAction.initPostCommon(postCommon)),
    initPostCheap: (postCheap) => dispatch(discoverAction.initPostCheap(postCheap)),
    updatePageIndexLatest: (pageIndexLatest) => dispatch(discoverAction.updatePageIndexLatest(pageIndexLatest)),
    updateTotalPageLatest: (totalPageLatest) => dispatch(discoverAction.updateTotalPageLatest(totalPageLatest)),
    updatePageIndexCommon: (pageIndexCommon) => dispatch(discoverAction.updatePageIndexCommon(pageIndexCommon)),
    updateTotalPageCommon: (totalPageCommon) => dispatch(discoverAction.updateTotalPageCommon(totalPageCommon)),
    updatePageIndexCheap: (pageIndexCheap) => dispatch(discoverAction.updatePageIndexCheap(pageIndexCheap)),
    updateTotalPageCheap: (totalPageCheap) => dispatch(discoverAction.updateTotalPageCheap(totalPageCheap)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
