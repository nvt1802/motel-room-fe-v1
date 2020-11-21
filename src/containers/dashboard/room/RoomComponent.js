import React, { useState, useEffect, useRef } from 'react'
import RoomPagination from '../pagination/PaginationComponent'
import MotelRoomAPI from '../../../api/MotelRoomAPI'
import { PAGE_SIZE } from '../../../common/Constant'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import CreateNotification from '../notification/CreateNotification'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

export default function Room(props) {

    const [listRoom, setListRoom] = useState([])
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState(1)
    const [deleted, setDeleted] = useState(false)
    const [listId, setListId] = useState([])
    const [option, setOption] = useState({})
    const notification = useRef(null)

    const getAllMotelRoom = (page) => {
        let pageCommon = {
            page: page,
            pageSize: PAGE_SIZE
        }
        setPage(page)
        MotelRoomAPI.findRoomByAccountIdPageable(pageCommon).then(res => {
            setListRoom(res.data.content)
            setTotalPage(res.data.totalPages)
            let arr = []
            res.data.content.forEach(element => {
                arr.push(element.motelId)
            });
            setListId(arr)
        })
    }

    const renderRoom = () => {
        var elements = listRoom.map((value, index) => {
            return <tr key={value.motelId}>
                <td style={{ width: '35px' }} className="checkbox">
                    <label style={{ marginBottom: '0px' }} htmlFor={`motelId${value.motelId}`}>
                        <input type="checkbox" value={value.motelId} name={`motelId${value.motelId}`} id={`motelId${value.motelId}`} data-motelroom={value.motelName} />
                    </label>
                </td>
                <td>{(PAGE_SIZE * page + index + 1).toString()}</td>
                <td>{value.motelName}</td>
                <td>{value.acreage}</td>
                <td>{value.price}</td>
                <td>
                    <Link to={`/dashboard/room/view/${value.motelId}`} className="mr-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <Link to={`/dashboard/room/edit/${value.motelId}`} className="mr-2">
                        <i className="fa fa-edit"></i>
                    </Link>
                </td>
            </tr>
        })
        return elements
    }

    const handleClickPagination = (page) => {
        getAllMotelRoom(page)
        document.getElementById('selectAll').checked = false
    }

    const handleClickRemove = (e) => {
        let arr = []
        let arrRoom = []
        listId.forEach(value => {
            if (document.getElementById(`motelId${value}`).checked) {
                arr.push(value)
                arrRoom.push(document.getElementById(`motelId${value}`).getAttribute('data-motelroom'))
            }
        })
        console.log(arr)
        confirmAlert({
            title: 'Xác nhận xóa',
            message: `Bạn có muốn xóa phòng: ${arrRoom}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        MotelRoomAPI.multipleDeleteRoom(arr).then(res => {
                            getAllMotelRoom(0)
                            setDeleted(true)
                            setOption({ title: 'Thông báo', message: 'Xoá thành công', type: 'success', duration: 1000 })
                            notification.current.click()
                        }).catch(err => { console.log(err) })
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
                document.getElementById(`motelId${value}`).checked = true
            })
        } else {
            listId.forEach(value => {
                if (document.getElementById(`motelId${value}`).checked === true) {
                    document.getElementById(`motelId${value}`).checked = false
                }
            })
        }
    }

    useEffect(() => {
        if (props.account.role === 1) {
            props.history.push("/dashboard")
        } else {
            getAllMotelRoom(0)
            document.title = 'MotelRoom Management'
            setDeleted(false)
        }
    }, [props])


    return (
        <fieldset style={{ border: '1px black solid' }}>
            <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">Danh sách phòng</legend>
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
                            <th>Tên phòng</th>
                            <th>Diện tích</th>
                            <th>Giá thuê</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {renderRoom()}
                    </tbody>
                </table>
                <RoomPagination totalPage={totalPage} handleClickPagination={handleClickPagination} deleted={deleted} />
                <button ref={notification} style={{ display: 'none' }} onClick={CreateNotification({ title: option.title, message: option.message, type: option.type, duration: option.duration })} />
                <NotificationContainer />
            </div>
        </fieldset>
    )
}