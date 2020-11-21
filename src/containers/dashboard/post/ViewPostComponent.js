import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostAPI from '../../../api/PostAPI'
import ImageAPI from '../../../api/ImageAPI'
import { API_URL } from '../../../common/Constant'
import Forbidden from '../../layout/Forbidden'

export default function ViewPostManagement(props) {

    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [listImage, setListImage] = useState([])
    const [loadPageError, setLoadPageError] = useState(false)

    useEffect(() => {
        PostAPI.findPostById(postId).then(res => {
            setPost(res.data)
            ImageAPI.findImageByMotelId(res.data.motelRoom.motelId).then(res => {
                setListImage(res.data)
                setLoaded(true)
            })
        }).catch(err => {
            setLoadPageError(true)
        })
    }, [postId, props])

    useEffect(() => {
        document.title = 'View Post'
    })

    return (<>
        {!loadPageError &&
            <fieldset style={{ border: '1px black solid' }}>
                <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">Thông tin bài viết</legend>
                {loaded &&
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-6">
                            <table className="table table-sm table-bordered table-hover mb-0">
                                <tbody>
                                    <tr>
                                        <td className="field">Tiêu đề :</td>
                                        <td>{post.postTitle}</td>
                                    </tr>
                                    <tr>
                                        <td className="field">Mô tả :</td>
                                        <td>{post.description}</td>
                                    </tr>
                                    <tr>
                                        <td className="field">Ngày đăng :</td>
                                        <td>{post.postDate}</td>
                                    </tr>
                                    <tr>
                                        <td className="field">Người đăng :</td>
                                        <td>{post.createBy}</td>
                                    </tr>
                                    <tr>
                                        <td className="field">Tỉnh/Thành phố :</td>
                                        <td>{post.motelRoom.province.provinceName}</td>
                                    </tr>
                                    <tr>
                                        <td className="field">Quận/Huyện :</td>
                                        <td>{post.motelRoom.district.districtName}</td>
                                    </tr>
                                    <tr>
                                        <td className="field">Phường/Xã :</td>
                                        <td>{post.motelRoom.ward.wardName}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 col-md-12 col-lg-6">
                            <div id="demo" className="carousel slide" data-ride="carousel">
                                <ul className="carousel-indicators">
                                    {
                                        listImage.map((value, index) => {
                                            if (index === 0) {
                                                return <li key={index} data-target="#demo" data-slide-to={0} className="active" />
                                            } else {
                                                return <li key={index} data-target="#demo" data-slide-to={index} />
                                            }
                                        })
                                    }
                                </ul>
                                <div className="carousel-inner">
                                    {
                                        listImage.map((value, index) => {
                                            if (index === 0) {
                                                return (
                                                    <div className="carousel-item active" key={index}>
                                                        <img style={{ width: '100%', height: 'auto', backgroundSize: 'contain' }} src={`${API_URL}/api/image/${value.url}`} alt={`${value.imageId}`} />
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className="carousel-item" key={index}>
                                                        <img style={{ width: '100%', height: 'auto', backgroundSize: 'contain' }} src={`${API_URL}/api/image/${value.url}`} alt={`${value.imageId}`} />
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                                <a className="carousel-control-prev" href="#demo" data-slide="prev">
                                    <span className="carousel-control-prev-icon" />
                                </a>
                                <a className="carousel-control-next" href="#demo" data-slide="next">
                                    <span className="carousel-control-next-icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                }
            </fieldset>
        }
        {loadPageError && <Forbidden />}
    </>)
}