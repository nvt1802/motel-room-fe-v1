import React, { useEffect, useState, useRef } from 'react'
import CriteriaAPI from '../../../api/CriteriaAPI'
import { PAGE_SIZE } from "../../../common/Constant"
import CriteriaPagination from '../pagination/PaginationComponent'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import CreateNotification from '../notification/CreateNotification'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import Forbidden from '../../layout/Forbidden'

export default function CriteriaManagement(props) {

    const [criteria, setCriteria] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(1)
    const [deleted, setDeleted] = useState(false)
    const [listId, setListId] = useState([])
    const criteriaName = useRef(null)
    const [option, setOption] = useState({})
    const notification = useRef(null)
    const [loadPageError, setLoadPageError] = useState(false)

    const getAllCriteria = (page) => {
        setDeleted(false)
        let pageCommon = {
            page: page,
            pageSize: PAGE_SIZE
        }
        setPage(page)
        CriteriaAPI.findAllPageable(pageCommon).then(res => {
            setCriteria(res.data.content)
            setTotalPage(res.data.totalPages)
            let arr = []
            res.data.content.forEach(element => {
                arr.push(element.criteriaId)
            });
            setListId(arr)
        }).catch(err => {
            setLoadPageError(true)
        })
    }

    const renderCriteria = () => {
        var elements = criteria.map((value, index) => {
            return <tr key={value.criteriaId}>
                <td style={{ width: '35px' }} className="checkbox">
                    <label style={{ marginBottom: '0px' }} htmlFor={'criteriaId' + value.criteriaId}>
                        <input type="checkbox" value={value.criteriaId} name={'criteriaId' + value.criteriaId} id={'criteriaId' + value.criteriaId} data-criteria={value.criteriaName} />
                    </label>
                </td>
                <td>{(PAGE_SIZE * page + index + 1).toString()}</td>
                <td>
                    <span id={"criteriaNameText" + index} >{value.criteriaName}</span>
                    <input onKeyPress={(e) => { handleUpdateEnter(e, index, value.criteriaId) }} id={"criteriaNameInput" + index} className="form-control d-none" defaultValue={value.criteriaName} />
                </td>
                <td>
                    <Link id={"criteriaBtnEditShow" + index} to={"/"} onClick={(e) => {
                        e.preventDefault()
                        document.getElementById('criteriaBtnEditShow' + index).classList.add('d-none')
                        document.getElementById('criteriaNameText' + index).classList.add('d-none')
                        document.getElementById('criteriaNameInput' + index).classList.remove('d-none')
                        document.getElementById('criteriaBtnSave' + index).classList.remove('d-none')
                        document.getElementById('criteriaBtnCancel' + index).classList.remove('d-none')
                    }} className="mr-2">
                        <i className="fa fa-edit"></i>
                    </Link>
                    <Link id={"criteriaBtnSave" + index} to={"/"} onClick={(e) => { e.preventDefault(); handleUpdate(e, index, value.criteriaId) }} className="mr-2 d-none">
                        <i className="fa fa-check-circle text-success"></i>
                    </Link>
                    <Link id={"criteriaBtnCancel" + index} to={"/"} onClick={(e) => {
                        e.preventDefault()
                        document.getElementById('criteriaNameInput' + index).value = value.criteriaName
                        document.getElementById('criteriaBtnSave' + index).classList.add('d-none')
                        document.getElementById('criteriaBtnCancel' + index).classList.add('d-none')
                        document.getElementById('criteriaNameText' + index).classList.remove('d-none')
                        document.getElementById('criteriaNameInput' + index).classList.add('d-none')
                        document.getElementById('criteriaBtnEditShow' + index).classList.remove('d-none')
                    }} className="mr-2 d-none">
                        <i className="fa fa-close text-danger"></i>
                    </Link>
                </td>
            </tr>
        })
        return elements
    }

    const handleClickPagination = (page) => {
        getAllCriteria(page)
        document.getElementById('selectAll').checked = false
    }

    const handleUpdate = (e, index, criteriaId) => {
        document.getElementById('criteriaBtnSave' + index).classList.add('d-none')
        document.getElementById('criteriaBtnCancel' + index).classList.add('d-none')
        document.getElementById('criteriaNameText' + index).classList.remove('d-none')
        document.getElementById('criteriaNameInput' + index).classList.add('d-none')
        document.getElementById('criteriaBtnEditShow' + index).classList.remove('d-none')
        let criteriaName = document.getElementById('criteriaNameInput' + index).value
        let criteria = { "criteriaId": parseInt(criteriaId), "criteriaName": criteriaName }
        CriteriaAPI.updateCriteria(criteria).then(res => {
            getAllCriteria(0)
            setOption({ title: 'Thông báo', message: 'Chỉnh sửa thành công', type: 'success', duration: 1000 })
            notification.current.click()
        })
    }

    const handleUpdateEnter = (e, index, criteriaId) => {
        if (e.key === 'Enter') {
            document.getElementById('criteriaBtnSave' + index).classList.add('d-none')
            document.getElementById('criteriaBtnCancel' + index).classList.add('d-none')
            document.getElementById('criteriaNameText' + index).classList.remove('d-none')
            document.getElementById('criteriaNameInput' + index).classList.add('d-none')
            document.getElementById('criteriaBtnEditShow' + index).classList.remove('d-none')
            let criteriaName = document.getElementById('criteriaNameInput' + index).value
            let criteria = { "criteriaId": parseInt(criteriaId), "criteriaName": criteriaName }
            CriteriaAPI.updateCriteria(criteria).then(res => {
                getAllCriteria(0)
                setOption({ title: 'Thông báo', message: 'Chỉnh sửa thành công', type: 'success', duration: 1000 })
                notification.current.click()
            })
        }
    }

    const handleCreate = (e) => {
        e.preventDefault()
        if (criteriaName.current.value !== '') {
            let criteria = { 'criteriaId': 0, 'criteriaName': criteriaName.current.value }
            CriteriaAPI.createCriteria(criteria).then(res => {
                getAllCriteria(0)
                setDeleted(true)
                setOption({ title: 'Thông báo', message: 'Tạo thành công', type: 'success', duration: 1000 })
                notification.current.click()
            })
        } else {
            criteriaName.current.classList.add('is-invalid')
            criteriaName.current.focus()
        }
    }

    const handleCreateByEnter = (e) => {
        if (e.key === 'Enter') {
            if (criteriaName.current.value !== '') {
                let criteria = { 'criteriaId': 0, 'criteriaName': criteriaName.current.value }
                CriteriaAPI.createCriteria(criteria).then(res => {
                    getAllCriteria(0)
                    setDeleted(true)
                    setOption({ title: 'Thông báo', message: 'Tạo thành công', type: 'success', duration: 1000 })
                    notification.current.click()
                })
            } else {
                criteriaName.current.classList.add('is-invalid')
                criteriaName.current.focus()
            }
        }
    }

    const handleClickRemove = (e) => {
        let arr = []
        let arrCriteria = []
        listId.forEach(value => {
            if (document.getElementById('criteriaId' + value).checked) {
                arr.push(value)
                arrCriteria.push(document.getElementById('criteriaId' + value).getAttribute('data-criteria'))
            }
        })
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có muốn xóa tiêu chí tìm kiếm: ' + arrCriteria,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        CriteriaAPI.multipleDeleteCriteria(arr).then(res => {
                            if (res.data) {
                                getAllCriteria(0)
                                setOption({ title: 'Thông báo', message: 'Xóa thành công', type: 'success', duration: 1000 })
                                notification.current.click()
                                setDeleted(true)
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

    const selectAllRow = (e) => {
        if (e.target.checked) {
            listId.forEach(value => {
                document.getElementById('criteriaId' + value).checked = true
            })
        } else {
            listId.forEach(value => {
                if (document.getElementById('criteriaId' + value).checked === true) {
                    document.getElementById('criteriaId' + value).checked = false
                }
            })
        }
    }

    useEffect(() => {
        getAllCriteria(0)
        document.title = 'Criteria Management'
        setDeleted(false)
    }, [props])


    return (<>
        <button ref={notification} style={{ display: 'none' }} onClick={CreateNotification({ title: option.title, message: option.message, type: option.type, duration: option.duration })} />
        <NotificationContainer />
        {!loadPageError &&
            <fieldset style={{ border: '1px black solid' }}>
                <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">Danh sách tiêu chí tìm kiếm</legend>
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
                                <th>Tiêu chí</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr>
                                <td></td>
                                <td></td>
                                <td>
                                    <input ref={criteriaName} onKeyPress={handleCreateByEnter} className="form-control form-control-sm"></input>
                                </td>
                                <td>
                                    <a href="/" onClick={handleCreate} className="btn btn-sm btn-outline-success w-25 mr-2"><i className="fa fa-plus"></i></a>
                                </td>
                            </tr>
                            {renderCriteria()}
                        </tbody>
                    </table>
                    <CriteriaPagination totalPage={totalPage} handleClickPagination={handleClickPagination} deleted={deleted} />
                </div>
            </fieldset>
        }
        {loadPageError && <Forbidden />}
    </>)
}