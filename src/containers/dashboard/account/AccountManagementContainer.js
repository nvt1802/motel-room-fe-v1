import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AccountAPI from '../../../api/AccountAPI'
import { PAGE_SIZE, ROLE_ADMIN, ROLE_USER } from "../../../common/Constant"
import AccountPagination from '../pagination/PaginationComponent'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import CreateNotification from '../notification/CreateNotification'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import Forbidden from '../../layout/Forbidden'
import { accountAction } from '../../../store/actions/index'

function AccountManagementContainer(props) {

    const [page, setPage] = useState(0)
    const [listId, setListId] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [option, setOption] = useState({})
    const notification = useRef(null)
    const [loadPageError, setLoadPageError] = useState(false)

    const getAllAccountAvailable = (page) => {
        setRefresh(false)
        let pageCommon = {
            page: page,
            pageSize: PAGE_SIZE
        }
        setPage(page)
        AccountAPI.finAllAccountAvailable(pageCommon).then(res => {
            props.initAccount(res.data)
            let arr = []
            res.data.content.forEach(element => {
                if (element.role === ROLE_USER) {
                    arr.push(element.accountId)
                }
            });
            setListId(arr)
        }).catch(err => {
            setLoadPageError(true)
        })
    }

    const renderRowAccount = () => {
        var elements = props.account.content.map((value, index) => {
            return (
                <tr key={value.accountId} className="text-center" >
                    <td style={{ width: '35px' }} className="checkbox">
                        {value.role !== ROLE_ADMIN && (
                            <label style={{ marginBottom: '0px' }} htmlFor={`accountId${value.accountId}`} >
                                <input type="checkbox" value={value.accountId} name={'accountId' + value.accountId} id={`accountId${value.accountId}`} data-user={value.userName} />
                            </label>
                        )}
                    </td>
                    <td>{(PAGE_SIZE * page + index + 1).toString()}</td>
                    <td>{value.userName}</td>
                    <td>{value.role === ROLE_ADMIN ? <span className="badge badge-success">Quản trị viên</span> : <span className="badge badge-primary">Người dùng</span>}</td>
                    <td>{value.accountStatus === true ? <span className="badge badge-info">Sẵn dùng</span> : <span className="badge badge-warning">Bị Khóa</span>}</td>
                    <td>
                        <Link to={`/dashboard/account/view/${value.accountId}`} className="mr-2">
                            <i className="fa fa-eye"></i>
                        </Link>
                        {value.accountId !== props.authenticate.account.accountId ? (
                            props.account.userName === 'admin' ? (
                                <Link to={`/dashboard/account/edit/${value.accountId}`} className="mr-2">
                                    <i className="fa fa-edit"></i>
                                </Link>
                            ) : (
                                    value.role !== ROLE_ADMIN && (
                                        <Link to={`/dashboard/account/edit/${value.accountId}`} className="mr-2">
                                            <i className="fa fa-edit"></i>
                                        </Link>
                                    )
                                )
                        ) : null}
                        {value.accountId !== props.authenticate.account.accountId ? (
                            props.account.userName === 'admin' ? (
                                value.accountStatus === true ?
                                    (
                                        <Link to={"/"} onClick={e => handleLockAccount(e, value.accountId)} className="mr-2" id={value.accountId}>
                                            <i className="fa fa-lock" onClick={e => handleLockAccount(e, value.accountId)} id={value.accountId}></i>
                                        </Link>
                                    ) : (
                                        <Link to={"/"} onClick={e => handleUnlockAccount(e, value.accountId)} className="mr-2" id={value.accountId}>
                                            <i className="fa fa-unlock" onClick={e => handleUnlockAccount(e, value.accountId)} id={value.accountId}></i>
                                        </Link>
                                    )
                            ) : (
                                    value.role !== ROLE_ADMIN && (
                                        value.accountStatus === true ?
                                            (
                                                <Link to={"/"} onClick={e => handleLockAccount(e, value.accountId)} className="mr-2" id={value.accountId}>
                                                    <i className="fa fa-lock" onClick={e => handleLockAccount(e, value.accountId)} id={value.accountId}></i>
                                                </Link>
                                            ) : (
                                                <Link to={"/"} onClick={e => handleUnlockAccount(e, value.accountId)} className="mr-2" id={value.accountId}>
                                                    <i className="fa fa-unlock" onClick={e => handleUnlockAccount(e, value.accountId)} id={value.accountId}></i>
                                                </Link>
                                            )
                                    )
                                )
                        ) : (null)}
                    </td>
                </tr >
            )
        })
        return elements
    }

    const handleClickPagination = (page) => {
        getAllAccountAvailable(page)
        document.getElementById('selectAll').checked = false
    }

    useEffect(() => {
        document.title = 'Account Management'
    })

    useEffect(() => {
        if (Object.keys(props.account).length === 0) {
            getAllAccountAvailable(0)
        }
    })

    const handleClickRemove = (e) => {
        let arr = []
        let arrUseName = []
        listId.forEach(value => {
            if (document.getElementById(`accountId${value}`).checked) {
                arr.push(value)
                arrUseName.push(document.getElementById(`accountId${value}`).getAttribute('data-user'))
            }
        })
        confirmAlert({
            title: 'Xác nhận xóa',
            message: `Bạn có muốn xóa tài khoản: ${arrUseName}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        AccountAPI.multipleDeleteAccount(arr).then(res => {
                            getAllAccountAvailable(0)
                            setRefresh(true)
                            if (res.data) {
                                setOption({ title: 'Thông báo', message: 'Xóa thành công', type: 'success', duration: 1000 })
                                notification.current.click()
                            } else {
                                setOption({ title: 'Thông báo', message: 'Xóa không thành công', type: 'warning', duration: 1000 })
                                notification.current.click()
                            }
                        }).catch(err => {
                            setOption({ title: 'Thông báo', message: 'Xóa không thành công', type: 'warning', duration: 1000 })
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

    const handleLockAccount = (e, accountId) => {
        e.preventDefault()
        confirmAlert({
            title: 'Xác nhận',
            message: `Bạn có muốn khóa tài khoản:`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        AccountAPI.lockAndUnlockPost({ "accountId": accountId }).then(res => {
                            setRefresh(true)
                            if (res.data) { getAllAccountAvailable(0) }
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
        })
    }

    const handleUnlockAccount = (e, accountId) => {
        e.preventDefault()
        confirmAlert({
            title: 'Xác nhận',
            message: `Bạn có muốn mở khóa tài khoản:`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        AccountAPI.lockAndUnlockPost({ "accountId": accountId }).then(res => {
                            setRefresh(true)
                            if (res.data) { getAllAccountAvailable(0) }
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
        })
    }

    const selectAllRow = (e) => {
        if (e.target.checked) {
            listId.forEach(value => {
                document.getElementById(`accountId${value}`).checked = true
            })
        } else {
            listId.forEach(value => {
                if (document.getElementById(`accountId${value}`).checked === true) {
                    document.getElementById(`accountId${value}`).checked = false
                }
            })
        }
    }

    return (<>
        <button ref={notification} style={{ display: 'none' }} onClick={CreateNotification({ title: option.title, message: option.message, type: option.type, duration: option.duration })} />
        <NotificationContainer />
        {!loadPageError &&
            <div>
                <fieldset style={{ border: '1px black solid' }}>
                    <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">Danh sách tài khoản</legend>
                    <div className="ml-2 mr-2 mt-2">
                        <div className="mb-1">
                            <button className="btn btn-sm ml-1 btn-outline-warning" onClick={handleClickRemove}><i className="fa fa-trash text-danger"></i></button>
                        </div>
                        <table className="table table-sm table-bordered table-hover">
                            <thead className="thead-dark">
                                <tr className="text-center">
                                    <th style={{ width: '35px' }} className="checkbox">
                                        <label style={{ marginBottom: '0px' }}><input id="selectAll" onClick={selectAllRow} type="checkbox" /></label>
                                    </th>
                                    <th style={{ width: '30px' }}>STT</th>
                                    <th>Tên đăng nhập</th>
                                    <th style={{ width: '120px' }}>Vai trò</th>
                                    <th style={{ width: '120px' }}>Trạng thái</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(props.account).length !== 0 ? renderRowAccount() : null}
                            </tbody>
                        </table>
                        {Object.keys(props.account).length !== 0 &&
                            <AccountPagination totalPages={props.account.totalPages} handleClickPagination={handleClickPagination} />
                        }

                    </div>
                </fieldset>
            </div>
        }
        {loadPageError && <Forbidden />}
    </>)
}

const mapStateToProps = (state) => ({
    authenticate: state.authenticate,
    account: state.account
})

const mapDispatchToProps = dispatch => ({
    initAccount: (value) => dispatch(accountAction.initAccount(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountManagementContainer)