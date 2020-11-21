import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MotelRoomAPI from '../../../api/MotelRoomAPI'
import Forbidden from '../../layout/Forbidden'

export default function ViewRoom(props) {

    let { motelId } = useParams()
    const [motelRoom, setMotelRoom] = useState({})
    const [provinceName, setProvinceName] = useState('')
    const [districtName, setDistrictName] = useState('')
    const [wardName, setWardName] = useState('')
    const [criteria, setCriteria] = useState([])
    const [loadPageError, setLoadPageError] = useState(false)

    useEffect(() => {
        document.title = 'View Room'
    })

    useEffect(() => {
        MotelRoomAPI.findMotelRoomById(motelId).then(res => {
            if (res.data) {
                setMotelRoom(res.data)
                setProvinceName(res.data.province.provinceName)
                setDistrictName(res.data.district.districtName)
                setWardName(res.data.ward.wardName)
            } else {
                setLoadPageError(true)
            }
        })
    }, [motelId, props])

    useEffect(() => {
        if (motelRoom.criteria) {
            setCriteria(motelRoom.criteria)
        }
    }, [motelRoom])

    const renderCriteria = () => {
        var elements = criteria.map((value, index) => {
            return (<div key={index} className="custom-control custom-checkbox mb-3 mr-5">
                <input type="checkbox" checked readOnly className="custom-control-input" defaultValue={value.criteriaId} id={value.criteriaId} name={value.criteriaId} />
                <label className="custom-control-label" htmlFor={value.criteriaId}>{value.criteriaName}</label>
            </div>)
        })
        return elements
    }

    return (<>
        {!loadPageError &&
            <fieldset style={{ border: '1px black solid' }}>
                <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">Thông tin phòng</legend>
                <table className="table table-sm table-bordered table-hover mb-0">
                    <tbody>
                        <tr>
                            <td className="field">Tên phòng :</td>
                            <td>{motelRoom.motelName}</td>
                        </tr>
                        <tr>
                            <td className="field">Diện tích :</td>
                            <td>{motelRoom.acreage}</td>
                        </tr>
                        <tr>
                            <td className="field">Giá thuê :</td>
                            <td>{motelRoom.price}</td>
                        </tr>
                        <tr>
                            <td className="field">Số người tối đa :</td>
                            <td>{motelRoom.maxPeople}</td>
                        </tr>
                        <tr>
                            <td className="field">Địa chỉ :</td>
                            <td>{motelRoom.address}</td>
                        </tr>
                        <tr>
                            <td className="field">Tỉnh/Thành phố :</td>
                            <td>{provinceName}</td>
                        </tr>
                        <tr>
                            <td className="field">Quận/Huyện :</td>
                            <td>{districtName}</td>
                        </tr>
                        <tr>
                            <td className="field">Phường/Xã :</td>
                            <td>{wardName}</td>
                        </tr>
                        <tr>
                            <td className="field">Tiện nghi :</td>
                            <td>{renderCriteria()}</td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        }
        {loadPageError && <Forbidden />}
    </>)
}