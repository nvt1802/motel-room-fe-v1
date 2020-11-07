import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DiscoverAPI from '../../api/DiscoverAPI'
import '../../assets/style/index.css'
import { URL_IMAGE } from '../../common/Constant'
import FormatNumber from '../../common/FormatNumber'

export default function Home(props) {

    const [postLatest, setPostLatest] = useState([])
    const [postCommon, setPostCommon] = useState([])
    const [postCheap, setPostCheap] = useState([])
    const [pageIndexLatest, setPageIndexLatest] = useState(0)
    const [totalPageLatest, setTotalPageLatest] = useState(0)
    const [pageIndexCommon, setPageIndexCommon] = useState(0)
    const [totalPageCommon, setTotalPageCommon] = useState(0)
    const [pageIndexCheap, setPageIndexCheap] = useState(0)
    const [totalPageCheap, setTotalPageCheap] = useState(0)

    const getPostLatest = (pageCommon) => {
        DiscoverAPI.discoverLatest(pageCommon).then(res => {
            setPostLatest(res.data)
            setTotalPageLatest(res.data.totalPages)
        })
    }

    const getPostCommon = (pageCommon) => {
        DiscoverAPI.discoverCommon(pageCommon).then(res => {
            setPostCommon(res.data)
            setTotalPageCommon(res.data.totalPages)
        })
    }

    const getPostCheap = (pageCommon) => {
        DiscoverAPI.discoverCheap(pageCommon).then(res => {
            setPostCheap(res.data)
            setTotalPageCheap(res.data.totalPages)
        })
    }

    useEffect(() => {
        const pageCommon = {
            "page": 0,
            "pageSize": 6
        }
        if (postLatest.length === 0) { getPostLatest(pageCommon) }
        if (postCommon.length === 0) { getPostCommon(pageCommon) }
        if (postCheap.length === 0) { getPostCheap(pageCommon) }
    })

    const seeMorePostLatest = () => {
        const pageCommon = {
            "page": pageIndexLatest + 1,
            "pageSize": 6
        }
        setPageIndexLatest(pageIndexLatest + 1)
        DiscoverAPI.discoverLatest(pageCommon).then(res => {
            let listPostDtos = postLatest.listPostDtos
            res.data.listPostDtos.forEach(element => {
                listPostDtos.push(element)
            })
            let data = {
                listPostDtos: listPostDtos,
                totalPages: res.data.totalPages,
                pageSize: res.data.pageSize
            }
            setPostLatest(data)
            setTotalPageLatest(res.data.totalPages)
        })
    }

    const seeMorePostCommon = () => {
        const pageCommon = {
            "page": pageIndexCommon + 1,
            "pageSize": 6
        }
        setPageIndexCommon(pageIndexCommon + 1)
        DiscoverAPI.discoverCommon(pageCommon).then(res => {
            let listPostDtos = postCommon.listPostDtos
            res.data.listPostDtos.forEach(element => {
                listPostDtos.push(element)
            })
            let data = {
                listPostDtos: listPostDtos,
                totalPages: res.data.totalPages,
                pageSize: res.data.pageSize
            }
            setPostCommon(data)
            setTotalPageCommon(res.data.totalPages)
        })
    }

    const seeMorePostCheap = () => {
        const pageCommon = {
            "page": 0,
            "pageSize": 6 * ((pageIndexCheap + 1) + 1)
        }
        setPageIndexCheap(pageIndexCheap + 1)
        DiscoverAPI.discoverCheap(pageCommon).then(res => {
            setPostCheap(res.data)
            setTotalPageCheap(res.data.totalPages)
        })
    }

    const renderPost = (post) => {
        if (post.listPostDtos) {
            var elements = post.listPostDtos.map((value, index) => {
                return (
                    <div className="col-12 col-sm-6 col-md-4" key={value.post.postId}>
                        <div className="single-blog-post style-2 mb-5">
                            {/* Blog Thumbnail */}
                            <div className="blog-thumbnail">
                                <Link to={`/post/viewPost/${value.post.postId}`}>
                                    {value.image[0] &&
                                        <img src={URL_IMAGE + "/" + value.image[0].url} alt="Thumbnail" className="discover-image" />
                                    }
                                </Link>
                            </div>
                            {/* Blog Content */}
                            <div className="blog-content">
                                <div className="d-flex justify-content-between">
                                    <span className="post-date d-flex align-items-center">
                                        <i className="fa fa-clock-o mr-2" style={{ fontSize: '14px' }}></i>{value.post.postDate}
                                    </span>
                                    <span className="post-view-rate d-flex align-items-center">
                                        <i className="fa fa-eye mr-2" style={{ fontSize: '14px' }}></i>{value.post.postView} lượt xem
                                    </span>
                                </div>
                                <a href="/Posts/PostDetails?postID=22" className="post-title">{value.post.postTitle}</a>
                                <span className="post-price d-flex align-items-center mb-1">
                                    <i className="fa fa-money mr-2" style={{ fontSize: '14px' }}></i>
                                    <b>{FormatNumber.currencyformatter.format(value.post.motelRoom.price)} VND</b>/tháng
                                </span>
                                <span className="post-author d-flex align-items-center">
                                    <i className="fa fa-user mr-2" style={{ fontSize: '14px' }}></i>Đăng bởi: {value.post.account.name} </span>
                            </div>
                        </div>
                    </div>
                )
            })
            return elements
        } else {
            return null
        }
    }

    return (<>
        <section className="intro-news-area section-padding-25-0 mb-70">
            <div className="container">
                <div className="row justify-content-center">
                    {/* Hien thi bai dang */}
                    <div className="col-12 col-lg-12">
                        <div className="intro-news-tab">
                            {/* Tab danh muc */}
                            <div className="intro-news-filter d-flex justify-content-between" style={{ height: '45px', padding: '5px 10px' }}>
                                <h3 className="text-danger text-choice">Các bài viết nổi bật</h3>
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a className="choice-link nav-item nav-link active" id="nav1" data-toggle="tab" href="#nav-1" role="tab" aria-controls="nav-1" aria-selected="true">Mới nhất</a>
                                        <a className="choice-link nav-item nav-link" id="nav2" data-toggle="tab" href="#nav-2" role="tab" aria-controls="nav-2" aria-selected="false">Phổ biến</a>
                                        <a className="choice-link nav-item nav-link" id="nav3" data-toggle="tab" href="#nav-3" role="tab" aria-controls="nav-3" aria-selected="false">Giá rẻ</a>
                                    </div>
                                </nav>
                            </div>
                            <div className="tab-content" id="nav-tabContent">
                                {/* Top moi nhat */}
                                <div className="tab-pane fade show active" id="nav-1" role="tabpanel" aria-labelledby="nav1">
                                    <div className="row">
                                        {/* Single News Area START*/}
                                        {renderPost(postLatest)}
                                        {/* Single News Area END*/}
                                        {pageIndexLatest < (totalPageLatest - 1) && (
                                            <div className="col-12">
                                                <div className="d-flex justify-content-center">
                                                    <a href="/" onClick={(e) => { e.preventDefault(); seeMorePostLatest() }} className="text-center text-secondary font-italic">Xem thêm ...</a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* End top moi nhat */}

                                {/* Top pho bien nhat */}
                                <div className="tab-pane fade" id="nav-2" role="tabpanel" aria-labelledby="nav2">
                                    <div className="row">
                                        {renderPost(postCommon)}
                                        {pageIndexCommon < (totalPageCommon - 1) && (
                                            <div className="col-12">
                                                <div className="d-flex justify-content-center">
                                                    <a href="/" onClick={(e) => { e.preventDefault(); seeMorePostCommon() }} className="text-center text-secondary font-italic">Xem thêm ...</a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* End top pho bien nhat */}
                                {/* Top gia re nhat */}
                                <div className="tab-pane fade" id="nav-3" role="tabpanel" aria-labelledby="nav3">
                                    <div className="row">
                                        {renderPost(postCheap)}
                                        {pageIndexCheap < (totalPageCheap - 1) && (
                                            <div className="col-12">
                                                <div className="d-flex justify-content-center">
                                                    <a href="/" onClick={(e) => { e.preventDefault(); seeMorePostCheap() }} className="text-center text-secondary font-italic">Xem thêm ...</a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* End top gia re nhat */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>
    )
}