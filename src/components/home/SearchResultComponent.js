import React, { useState, useEffect } from 'react'
import '../../assets/style/index.css'
import SearchAPI from '../../api/SearchAPI'
import { URL_IMAGE } from '../../common/Constant'
import FormatNumber from '../../common/FormatNumber'
import DiscoverAPI from '../../api/DiscoverAPI'
import { Link } from 'react-router-dom'
import ProvinceAPI from '../../api/ProvinceAPI'
import DistrictAPI from '../../api/DistrictAPI'
import CriteriaAPI from '../../api/CriteriaAPI'

export default function SearchResult(props) {

    const [listPost, setListPost] = useState([])
    const [listImage, setListImage] = useState([])
    const [postLatest, setPostLatest] = useState([])
    const [province, setProvince] = useState(null)
    const [district, setDistrict] = useState(null)
    const [price, setPrice] = useState(null)
    const [acreage, setAcreage] = useState(null)
    const [listCriteria, setListCriteria] = useState([])
    const [pageIndex, setPageIndex] = useState(0)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        if (Object.keys(props.searchData).length !== 0) {
            SearchAPI.search(props.searchData).then(res => {
                setListPost(res.data.content)
                setTotalPage(res.data.totalPages)
                SearchAPI.searchImage(props.searchData).then(res => {
                    setListImage(res.data)
                })
            })
        }
    }, [props])

    const getPostLatest = () => {
        let pageCommon = { page: 0, pageSize: 5 }
        DiscoverAPI.discoverLatest(pageCommon).then(res => {
            setPostLatest(res.data)
        })
    }

    const seeMore = () => {
        let obj = {
            "districtId": props.searchData.districtId,
            "optionAdvance": props.searchData.optionAdvance,
            "pageCommon": { "page": pageIndex + 1, pageSize: 5 },
            "provinceId": props.searchData.provinceId,
            "price": props.searchData.price,
            "acreage": props.searchData.acreage,
            "listCriteriaId": props.searchData.listCriteriaId
        }
        SearchAPI.search(obj).then(res => {
            let newListPost = listPost
            res.data.content.forEach(element => {
                newListPost.push(element)
            })
            SearchAPI.searchImage(obj).then(res => {
                let newListImage = listImage
                res.data.forEach(element => {
                    newListImage.push(element)
                })
                setPageIndex(pageIndex + 1)
                setListPost(newListPost)
                setListImage(newListImage)
            })
        })
    }

    useEffect(() => { if (postLatest.length === 0) { getPostLatest() } })

    const renderPostDicover = (post) => {
        if (post.listPostDtos) {
            var elements = post.listPostDtos.map((value, index) => {
                return (
                    <div key={index} className="single-blog-post style-2 mb-5">
                        {/* Blog Thumbnail */}
                        <div className="blog-thumbnail">
                            <Link to={`/post/viewPost/${value.post.postId}`}>
                                {value.image[0] &&
                                    <img src={URL_IMAGE + "/" + value.image[0].url} alt="Thumbnail" style={{ width: '350px', maxWidth: '350px' }} />
                                }
                            </Link>
                        </div>
                        {/* Blog Content */}
                        <div className="blog-content">
                            <div className="d-flex justify-content-between">
                                <span className="post-date d-flex align-items-center">
                                    <i className="fa fa-clock-o mr-2" style={{ fontSize: '14px' }}></i> {value.post.postDate}
                                </span>
                                <span className="post-view-rate d-flex align-items-center">
                                    <i className="fa fa-eye mr-2" style={{ fontSize: '14px' }}></i>{value.post.postView} lượt xem
                                </span>
                            </div>
                            <a href={`/post/postView/${value.post.postId}`} className="post-title"><i className="fa fa-bookmark mr-2" style={{ fontSize: '14px' }}></i>{value.post.postTitle}</a>
                            <span className="post-price d-flex align-items-center mb-1">
                                <i className="fa fa-money mr-2" style={{ fontSize: '14px' }}></i><b className="mr-1">{FormatNumber.currencyformatter.format(value.post.motelRoom.price)}</b> đ/ tháng
                                            </span>
                            <span className="post-author d-flex align-items-center">
                                <i className="fa fa-user mr-2" style={{ fontSize: '14px' }}></i>Đăng bởi: {value.post.account.name}
                            </span>
                        </div>
                    </div>
                )
            })
            return elements
        } else {
            return null
        }
    }

    const renderPost = () => {
        let element = listPost.map((value, index) => {
            return (
                <div key={index} className="single-blog-post d-flex flex-wrap style-5 mb-30 border border-secondary hvr-float">
                    <div className="col-lg-6 col-md-12 col-sm-12 pl-0 pr-0">
                        {/* Blog Thumbnail */}
                        <div className="blog-thumbnail">
                            <Link to={`/post/viewPost/${value.postId}`}>
                                {listImage.length > 0 &&
                                    <img src={`${URL_IMAGE}/${listImage[index].url}`} alt="Thumbnail" style={{ width: '100%' }} />
                                }
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        {/* Blog Content */}
                        <div className="blog-content pt-sm-0 pt-md-3 pl-2 pb-2 pr-2">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="post-date d-flex align-items-center">
                                    <i className="fa fa-clock-o mr-2" style={{ fontSize: '14px' }}></i>{value.postDate}
                                </span>
                                <span className="post-view-rate d-flex align-items-center">
                                    <i className="fa fa-eye mr-2" style={{ fontSize: '14px' }}></i>{value.postView} lượt xem
                                </span>
                            </div>
                            <Link to={`/post/viewPost/${value.postId}`} className="post-title d-flex align-items-center mb-4">
                                <i className="fa fa-bookmark mr-2" style={{ fontSize: '14px' }}></i>{value.postTitle}
                            </Link>
                            <span className="post-price d-flex align-items-center mb-1">
                                <i className="fa fa-money mr-2" style={{ fontSize: '14px' }}></i><b>{FormatNumber.currencyformatter.format(value.motelRoom.price)}</b>/ tháng
                                </span>
                            <span className="post-author d-flex align-items-center">
                                <i className="fa fa-user mr-2" style={{ fontSize: '14px' }}></i>{value.motelRoom.account.name}
                            </span>
                            <div><i className="fa fa-map-marker mr-2" style={{ fontSize: '14px' }}></i>{value.motelRoom.district.districtName}</div>
                            <div style={{ marginTop: '5%' }}>
                                <label className="text-dark">{value.description}
                                </label><br />
                                <Link className="show-more-link font-weight-bold" to={`/post/viewPost/${value.postId}`}>...xem thêm</Link>
                            </div>
                        </div>
                    </div>

                </div>
            )
        })
        return element
    }

    useEffect(() => {
        if (Object.keys(props.searchData).length !== 0) {
            getTag(props.searchData)
        }
    }, [props])

    const getTag = (searchData) => {
        ProvinceAPI.findProvinceById(searchData.provinceId).then(res => {
            setProvince(res.data)
        })
        DistrictAPI.findDistrictByDistrictId(searchData.districtId).then(res => {
            setDistrict(res.data)
        })
        if (searchData.optionAdvance) {
            setPrice(searchData.price)
            setAcreage(searchData.acreage)
            CriteriaAPI.findCriteriaByListCriteriaId(searchData.listCriteriaId).then(res => {
                setListCriteria(res.data)
            })
        }
    }

    return (<>
        <div className="news-area section-padding-100-70">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-9">
                        {/* Tags */}
                        <h3 className="my-text-primary">Kết quả tìm kiếm</h3>
                        <div className="">
                            {province !== null && <span className="badge badge-dark mr-2"><i className="fa fa-tag"> {province.provinceName}</i></span>}
                            {district !== null && <span className="badge badge-dark mr-2"><i className="fa fa-tag"> {district.districtName}</i></span>}
                            {price !== null && <span className="badge badge-dark mr-2"><i className="fa fa-tag"> {price}</i></span>}
                            {acreage !== null && <span className="badge badge-dark mr-2"><i className="fa fa-tag"> {acreage}</i></span>}
                            {
                                listCriteria.length > 0 && listCriteria.map((value, index) => {
                                    return <span key={index} className="badge badge-dark mr-2"><i className="fa fa-tag"> {value.criteriaName}</i></span>
                                })
                            }
                        </div>
                        <br />
                        {/* ### Ket qua tim kiem ### */}
                        {/* Single News Area */}

                        {renderPost()}

                        {/* SeeMore */}
                        {pageIndex < (totalPage - 1) && (
                            <div className="col-12">
                                <div className="d-flex justify-content-center">
                                    <a href="/" onClick={(e) => { e.preventDefault(); seeMore() }} className="text-center text-secondary font-italic">Xem thêm ...</a>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Post this month */}
                    <div className="col-12 col-md-4 col-lg-3">
                        <h3 className="my-text-primary mb-4">Tin tháng này</h3>
                        {/* Single News Area */}
                        {renderPostDicover(postLatest)}
                    </div>
                </div>
            </div>
        </div>
    </>)
}