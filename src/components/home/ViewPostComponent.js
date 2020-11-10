import React from 'react'
import { URL_IMAGE } from '../../common/Constant'
import { Link } from 'react-router-dom'
import FormatNumber from '../../common/FormatNumber'

export default function ViewPost(props) {

    const renderPost = (post) => {
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
                            <a href={`/post/viewPost/${value.post.postId}`} className="post-title">{value.post.postTitle}</a>
                            <span className="post-price d-flex align-items-center mb-1">
                                <i className="fa fa-money mr-2" style={{ fontSize: '14px' }}></i><b>{FormatNumber.currencyformatter.format(value.post.motelRoom.price)}</b> / tháng
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

    return (<>
        <section className="post-news-area mb-70 mt-0" style={{ paddingTop: '50px' }}>
            <div className="container">
                {(
                    <div className="row justify-content-center">
                        {/* Post Details Content Area */}
                        <div className="col-12 col-lg-8">
                            <div className="post-details-content mb-100">
                                <div className="card bg-light p-1 mb-15">
                                    <h3 className="text-dark card-body p-0">{props.post.postTitle}</h3>
                                </div>
                                <div className="mb-2">
                                    <label className="text-danger font-bold city-name d-flex align-items-center">
                                        <i className="fa fa-map-marker mr-2" style={{ fontSize: '17px', color: '#dc3545' }}></i>
                                        {props.post.motelRoom.province.provinceName}
                                    </label>
                                    <label className="d-flex align-items-center">
                                        <i className="fa fa-clock-o mr-2" style={{ fontSize: '15px' }}></i>
                                        {props.post.postDate}
                                    </label>
                                    <div className="d-flex justify-content-between">
                                        <label className="d-flex align-items-center">
                                            <i className="fa fa-user mr-2" style={{ fontSize: '15px' }}></i>
                                            Đăng bởi: {props.post.motelRoom.account.name}
                                        </label>
                                        <label className="d-flex align-items-center">
                                            <i className="fa fa-eye mr-2" style={{ fontSize: '15px' }}></i>
                                            {props.post.postView} lượt xem
                                        </label>
                                    </div>
                                </div>
                                {/* Hinh anh slide show */}
                                <div id="demo" className="carousel slide mb-30" data-ride="carousel">
                                    <ul className="carousel-indicators">
                                        {props.listImage !== null &&
                                            props.listImage.map((value, index) => {
                                                if (index === 0) {
                                                    return <li key={index} data-target="#demo" data-slide-to={0} className="active" />
                                                } else {
                                                    return <li key={index} data-target="#demo" data-slide-to={1} className="" />
                                                }
                                            })
                                        }
                                    </ul>
                                    {/* The slideshow */}
                                    <div className="carousel-inner">
                                        {props.listImage !== null &&
                                            props.listImage.map((value, index) => {
                                                if (index === 0) {
                                                    return (
                                                        <div key={index} className="carousel-item active">
                                                            <img src={`${URL_IMAGE}/${value.url}`} alt="Ảnh trọ" width={1100} height={500} />
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={index} className="carousel-item">
                                                            <img src={`${URL_IMAGE}/${value.url}`} alt="Ảnh trọ" width={1100} height={500} />
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                    {/* Left and right controls */}
                                    <a className="carousel-control-prev" href="#demo" data-slide="prev">
                                        <span className="carousel-control-prev-icon" />
                                    </a>
                                    <a className="carousel-control-next" href="#demo" data-slide="next">
                                        <span className="carousel-control-next-icon" />
                                    </a>
                                </div>
                                <hr />
                                {/* Thong tin chi tiet */}
                                <h5 className="mb-30 mt-30">Thông tin chi tiết</h5>
                                <table className="mb-30 table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td className="bg-light">Địa chỉ</td>
                                            <td colSpan={3} className="d-flex align-items-center">
                                                <i className="fa fa-map-marker mr-2" style={{ fontSize: '15px' }}></i> {props.post.motelRoom.address}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="bg-light">Giá thuê</td>
                                            <td colSpan={3} className="d-flex align-items-center">
                                                <i className="fa fa-money mr-2" style={{ fontSize: '15px' }}></i>
                                                <b>{FormatNumber.currencyformatter.format(props.post.motelRoom.price)} VND</b>/ tháng
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="bg-light">Diện tích</td>
                                            <td className="d-flex align-items-center">
                                                <i className="fa fa-crop mr-2" style={{ fontSize: '15px' }}></i> {props.post.motelRoom.acreage} m<sup>2</sup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="bg-light">Ở tối đa</td>
                                            <td className="d-flex align-items-center"><i className="fa fa-users mr-2" style={{ fontSize: '15px' }}></i> {props.post.motelRoom.maxPeople} người</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <hr />
                                {/* Tien nghi */}
                                <h5 className="mb-30 mt-30">Tiện nghi</h5>
                                <div className="row">
                                    {
                                        props.post.motelRoom.criteria.map((value, index) => {
                                            return (
                                                <div key={index} className="col-md-4 col-sm-6 mb-15">
                                                    <div className="alert alert-success" role="alert">
                                                        <i className="fa fa-check mr-2" style={{ fontSize: '15px' }}></i>{value.criteriaName}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <hr />
                                {/* Mo ta */}
                                <h5 className="mb-30 mt-30">Mô tả</h5>
                                <div className="mb-30">
                                    <div className="">
                                        <label className="text-dark">
                                            {props.post.postTitle}
                                        </label><br />
                                    </div>
                                </div>
                                <hr />
                                {/* Vi tri */}
                                <div className="mb-30 mt-30">
                                    <h5>Thông tin liên hệ</h5>
                                    <div className="mt-30">
                                        <div className="card">
                                            <div className=" card-body">
                                                <div className="row form-bounded">
                                                    <input type="text" name="name" defaultValue={props.post.motelRoom.account.name} className="shadow form-control" readOnly />
                                                    <label htmlFor="name" style={{ top: '-40%' }}><i className="fa fa-user mr-2" style={{ fontSize: '14px' }}></i>Người cho thuê</label>
                                                </div>
                                            </div>
                                            <div className=" card-body">
                                                <div className="row form-bounded">
                                                    <input type="text" name="address" defaultValue={props.post.motelRoom.address} className="shadow form-control" readOnly />
                                                    <label htmlFor="address" style={{ top: '-40%' }}><i className="fa fa-map-marker mr-2" style={{ fontSize: '14px' }}></i>Địa chỉ</label>
                                                </div>
                                            </div>
                                            <div className=" card-body">
                                                <div className="row form-bounded">
                                                    <input type="text" name="phone" defaultValue={"0912241244"} className="shadow form-control" readOnly />
                                                    <label htmlFor="phone" style={{ top: '-40%' }}><i className="fa fa-phone mr-2" style={{ fontSize: '14px' }}></i>&nbsp;Số điện thoại</label>
                                                </div>
                                            </div>
                                            <div className=" card-body">
                                                <div className="row form-bounded">
                                                    <input type="text" name="email" defaultValue="tainguyen6600@gmail.com" className="shadow form-control" readOnly />
                                                    <label htmlFor="email" style={{ top: '-40%' }}><i className="fa fa-envelope mr-2" style={{ fontSize: '14px' }}></i>&nbsp;Email</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Widget */}
                        <div className="col-12 col-sm-9 col-md-6 col-lg-4">
                            <div className="sidebar-area">
                                {!props.logged && (
                                    <div className="sidebar-area">
                                        <div className="single-widget-area newsletter-widget mb-30">
                                            <h4>Chưa có tài khoản ?</h4>
                                            <Link className="btn newsbox-btn w-100" to="/signUp">Đăng ký ngay</Link>
                                            <p className="mt-30">Đăng ký để đăng bài và quản lý phòng trọ/nhà của bạn</p>
                                        </div>
                                    </div>
                                )}
                                {/* Tin đã xem */}
                                <div className="single-widget-area news-widget mb-30">
                                </div>
                                {/* Tin đề xuất */}
                                <div className="single-widget-area">
                                    <h4>Đề xuất cho bạn</h4>
                                    <br />
                                    {/* Larger style */}
                                    {renderPost(props.postLatest)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    </>)
}