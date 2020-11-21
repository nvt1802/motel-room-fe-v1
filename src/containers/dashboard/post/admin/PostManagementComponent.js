import React, { useState, useEffect, useRef } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import PostPagination from '../../pagination/PaginationComponent'
import PostAPI from '../../../../api/PostAPI'
import { PAGE_SIZE } from '../../../../common/Constant'
import { Link } from 'react-router-dom'
import CreateNotification from '../../notification/CreateNotification'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

function PostManagement(props) {

    const [listPost, setListPost] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(1)
    const [deleted, setDeleted] = useState(false)
    const [listId, setListId] = useState([])
    const [option, setOption] = useState({})
    const notification = useRef(null)

    const getPostPageable = (page) => {
        let pageCommon = {
            page: page,
            pageSize: PAGE_SIZE
        }
        setPage(page)
        PostAPI.finAllPostPageableAvailable(pageCommon).then(res => {
            setListPost(res.data.content)
            setTotalPage(res.data.totalPages)
            let arr = []
            res.data.content.forEach(element => {
                arr.push(element.postId)
            });
            setListId(arr)
        })
    }

    const handleClickPagination = (page) => {
        getPostPageable(page)
        document.getElementById('selectAll').checked = false
    }

    const selectAllRow = (e) => {
        if (e.target.checked) {
            listId.forEach(value => {
                document.getElementById(`postId${value}`).checked = true
            })
        } else {
            listId.forEach(value => {
                if (document.getElementById(`postId${value}`).checked === true) {
                    document.getElementById(`postId${value}`).checked = false
                }
            })
        }
    }

    const renderPost = () => {
        var elements = listPost.map((value, index) => {
            return <tr key={value.postId}>
                <td style={{ width: '35px' }} className="checkbox">
                    <label style={{ marginBottom: '0px' }} htmlFor={`postId${value.postId}`}>
                        <input type="checkbox" value={value.postId} name={`postId${value.postId}`} id={`postId${value.postId}`} data-post={value.postTitle} />
                    </label>
                </td>
                <td>{(PAGE_SIZE * page + index + 1).toString()}</td>
                <td>{value.postTitle}</td>
                <td>{value.createBy}</td>
                <td>{value.postDate}</td>
                <td>{value.postStatus === true ? <span className="badge badge-info">Đang mở</span> : <span className="badge badge-warning">Bị Khóa</span>}</td>
                <td>
                    <Link to={`/dashboard/post/view/${value.postId}`} className="mr-2"> <i className="fa fa-eye"></i> </Link>
                    <Link to={`/dashboard/post/edit/${value.postId}`} className="mr-2"> <i className="fa fa-edit"></i> </Link>
                    {value.postStatus === true ?
                        (
                            <Link to={"/"} onClick={e => handleLockPost(e, value.postId)} className="mr-2" id={value.postId}>
                                <i className="fa fa-lock" onClick={e => handleLockPost(e, value.postId)} id={value.postId}></i>
                            </Link>
                        ) : (
                            <Link to={"/"} onClick={e => handleUnlockPost(e, value.postId)} className="mr-2" id={value.postId}>
                                <i className="fa fa-unlock" onClick={e => handleUnlockPost(e, value.postId)} id={value.postId}></i>
                            </Link>
                        )
                    }
                </td>
            </tr>
        })
        return elements
    }

    const handleClickRemove = (e) => {
        let arr = []
        let arrPostTitle = []
        listId.forEach(value => {
            if (document.getElementById(`postId${value}`).checked) {
                arr.push(value)
                arrPostTitle.push(document.getElementById(`postId${value}`).getAttribute('data-post'))
            }
        })
        confirmAlert({
            title: 'Xác nhận xóa',
            message: `Bạn có muốn xóa bài viết: ${arrPostTitle}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        PostAPI.multipleDeletePost(arr).then(res => {
                            if (res.data) {
                                getPostPageable(0)
                                setDeleted(true)
                                setOption({ title: 'Thông báo', message: `Xoá thành công`, type: 'success', duration: 1000 })
                            } else {
                                setOption({ title: 'Thông báo', message: `Xoá không thành công`, type: 'warning', duration: 1000 })
                            }
                            notification.current.click()
                        }).catch(err => {
                            setOption({ title: 'Thông báo', message: `Xoá không thành công`, type: 'warning', duration: 1000 })
                            notification.current.click()
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    const handleLockPost = (e, postId) => {
        e.preventDefault()
        confirmAlert({
            title: 'Xác nhận',
            message: `Bạn có muốn khoá bài viết: `,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        PostAPI.lockAndUnlockPost({ "postId": postId }).then(res => {
                            if (res.data) { getPostPageable(0) }
                            setOption({ title: 'Thông báo', message: `Khóa thành công`, type: 'success', duration: 1000 })
                            notification.current.click()
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    const handleUnlockPost = (e, postId) => {
        e.preventDefault()
        confirmAlert({
            title: 'Xác nhận',
            message: `Bạn có muốn mở khóa bài viết: `,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        PostAPI.lockAndUnlockPost({ "postId": postId }).then(res => {
                            if (res.data) { getPostPageable(0) }
                            setOption({ title: 'Thông báo', message: `Mở khóa thành công`, type: 'success', duration: 1000 })
                            notification.current.click()
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }


    useEffect(() => { getPostPageable(0) }, [props])

    useEffect(() => { document.title = 'Post Management' })

    return (<>
        <fieldset style={{ border: '1px black solid' }}>
            <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">Danh sách bài viết</legend>
            <div className="ml-2 mr-2 mt-2">
                <div className="mb-1 d-flex">
                    <div className="col-4 col-sm-6 col-lg-8 pl-0">
                        <button className="btn btn-sm ml-1 btn-outline-warning" onClick={handleClickRemove}><i className="fa fa-trash text-danger"></i></button>
                    </div>
                </div>
                <table className="table table-sm table-bordered table-hover">
                    <thead className="thead-dark text-center">
                        <tr className="text-center">
                            <th style={{ width: '35px' }} className="checkbox">
                                <label style={{ marginBottom: '0px' }}><input id="selectAll" onClick={selectAllRow} type="checkbox" /></label>
                            </th>
                            <th style={{ width: '30px' }}>STT</th>
                            <th>Tiêu đề bài viết</th>
                            <th>Người đăng</th>
                            <th>Ngày đăng bài</th>
                            <th>Trạng thái</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {renderPost()}
                    </tbody>
                </table>
                <PostPagination totalPage={totalPage} handleClickPagination={handleClickPagination} deleted={deleted} />
                <button ref={notification} style={{ display: 'none' }} onClick={CreateNotification({ title: option.title, message: option.message, type: option.type, duration: option.duration })} />
                <NotificationContainer />
            </div>
        </fieldset>
    </>)
}

export default PostManagement