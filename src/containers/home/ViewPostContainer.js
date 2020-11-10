import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import ViewPost from '../../components/home/ViewPostComponent'
import PostAPI from '../../api/PostAPI'
import ImageAPI from '../../api/ImageAPI'
import { discoverAction } from '../../store/actions/index'
import DiscoverAPI from '../../api/DiscoverAPI'

function ViewPostContainer(props) {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [listImage, setListImage] = useState(null)

    useEffect(() => {
        PostAPI.viewPostById(postId).then(res => {
            setPost(res.data)
        }).catch(err => { })
    }, [postId])

    useEffect(() => {
        if (post !== null) { findImageByMotelId(post.motelRoom.motelId) }
    }, [post])

    useEffect(() => {
        const pageCommon = {
            "page": 0,
            "pageSize": 6
        }
        if (Object.keys(props.postLatest).length === 0) { getPostLatest(pageCommon) }
        document.title = 'View Post'
    })

    const findImageByMotelId = (motelId) => {
        ImageAPI.findImageByMotelId(motelId).then(res => {
            setListImage(res.data)
        }).catch(err => { })
    }

    const getPostLatest = (pageCommon) => {
        DiscoverAPI.discoverLatest(pageCommon).then(res => {
            props.initPostLatest(res.data)
        })
    }

    return <>
        {post && <ViewPost listImage={listImage} post={post} postLatest={props.postLatest} logged={props.logged} />}
    </>
}

const mapStateToProps = state => ({
    postLatest: state.discover.postLatest,
    logged: state.authenticate.logged
})

const mapDispatchToProps = (dispatch) => ({
    initPostLatest: (postLatest) => dispatch(discoverAction.initPostLatest(postLatest)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewPostContainer)
