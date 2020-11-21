import React, { useEffect, useState, useRef } from 'react'
import { MESSENGER_ERROR } from '../../../common/Constant'
import CriteriaAPI from '../../../api/CriteriaAPI'
import { useParams } from 'react-router-dom'
import MotelRoomAPI from '../../../api/MotelRoomAPI'
import { useForm } from 'react-hook-form'
import Province from '../location/ProvinceComponent'
import District from '../location/DistrictComponent'
import Ward from '../location/WardComponent'
import CreateNotification from '../notification/CreateNotification'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import Forbidden from '../../layout/Forbidden'

export default function EditRoom(props) {
    const { motelId } = useParams()
    const [motelRoom, setMotelRoom] = useState({})
    const [loaded, setLoaded] = useState(false)

    const [provinceId, setProvinceId] = useState(-1)
    const [districtId, setDistrictId] = useState(-1)
    const [listCriteria, setListCriteria] = useState([])
    const [criteria, setCriteria] = useState(new Set())
    const { handleSubmit, register, errors } = useForm()
    const [option, setOption] = useState({})
    const notification = useRef(null)
    const [loadPageError, setLoadPageError] = useState(false)

    const getMotelRoom = () => {
        MotelRoomAPI.findMotelRoomById(motelId).then(res => {
            if (res.data) {
                setMotelRoom(res.data)
                setProvinceId(res.data.province.provinceId)
                setDistrictId(res.data.district.districtId)
                setLoaded(true)
            } else {
                setLoadPageError(true)
            }
        })
    }

    const getListCriteria = () => {
        CriteriaAPI.findAll().then(res => { setListCriteria(res.data) })
    }

    const renderCriteriaCheckbox = () => {
        let arr = []
        motelRoom.criteria.forEach(c => {
            arr.push(c.criteriaId)
        });
        var elements = listCriteria.map((value, index) => {
            if (arr.includes(value.criteriaId)) {
                return (<div key={index} className="custom-control custom-checkbox mb-3 mr-5">
                    <input ref={register({
                        required: MESSENGER_ERROR.criteria_required,
                        validate: validateMedium || MESSENGER_ERROR.criteria_required
                    })} type="checkbox" className="custom-control-input myCheckbox" defaultValue={value.criteriaId} defaultChecked={true} id={`criteria${value.criteriaId}`} name={"criteria"} />
                    <label className="custom-control-label" htmlFor={`criteria${value.criteriaId}`}>{value.criteriaName}</label>
                </div>)
            } else {
                return (<div key={index} className="custom-control custom-checkbox mb-3 mr-5">
                    <input ref={register({
                        required: MESSENGER_ERROR.criteria_required,
                        validate: validateMedium || MESSENGER_ERROR.criteria_required
                    })} type="checkbox" className="custom-control-input myCheckbox" defaultValue={value.criteriaId} id={`criteria${value.criteriaId}`} name={"criteria"} />
                    <label className="custom-control-label" htmlFor={`criteria${value.criteriaId}`}>{value.criteriaName}</label>
                </div>)
            }
        })
        return elements
    }

    const validateMedium = () => {
        if (criteria.size === 0) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (loaded === false) {
            getMotelRoom()
        }
    })

    useEffect(() => {
        document.title = 'Edit Room'
        getListCriteria()
    }, [props])

    useEffect(() => {
        if (Object.keys(motelRoom).length !== 0) {
            let arr = []
            motelRoom.criteria.forEach(c => {
                arr.push(c.criteriaId)
            });
            setCriteria(new Set(arr))
        }
    }, [motelRoom])

    const onSubmit = values => {
        CriteriaAPI.findCriteriaByListCriteriaId(Array.from(values.criteria)).then(res => {
            let room = {
                "motelId": motelRoom.motelId,
                "motelName": values.motelName,
                "acreage": values.acreage,
                "price": values.price,
                "maxPeople": parseInt(values.maxPeople),
                "address": values.address,
                "province": { "provinceId": parseInt(values.province) },
                "district": { "districtId": parseInt(values.district) },
                "ward": { "wardId": values.ward },
                "account": { "accountId": props.account.accountId },
                "criteria": res.data
            }
            MotelRoomAPI.updateMotelRoom(room).then(res => {
                if (res.data) {
                    setOption({ title: 'Thông báo', message: 'Chỉnh sửa thành công', type: 'success', duration: 1000 })
                    notification.current.click()
                }
            }).then(err => {
                if (err) {
                    setOption({ title: 'Thông báo', message: 'Chỉnh sửa không thành công', type: 'warning', duration: 1000 })
                    notification.current.click()
                }
            })
        }).then(err => {
            if (err) {
                setOption({ title: 'Thông báo', message: 'Chỉnh sửa không thành công', type: 'warning', duration: 1000 })
                notification.current.click()
            }
        })
    }

    return (<>
        <button ref={notification} style={{ display: 'none' }} onClick={CreateNotification({ title: option.title, message: option.message, type: option.type, duration: option.duration })} />
        <NotificationContainer />
        {!loadPageError &&
            <fieldset style={{ border: '1px black solid' }}>
                <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">Chỉnh sửa thông tin phòng</legend>
                <div className="m-2">
                    {loaded && (
                        <form onSubmit={handleSubmit(async values => await onSubmit(values))}>
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor="motelName">Tên phòng:</label>
                                        <input ref={register({
                                            required: MESSENGER_ERROR.motelName_required,
                                            maxLength: { value: 100, message: MESSENGER_ERROR.motelName_maxLength }
                                        })} defaultValue={motelRoom.motelName} type="text" className="form-control form-control-sm " id="motelName" placeholder="Nhập tên phòng" name="motelName" autoComplete="off" />
                                    </div>
                                    <div className="invalid-feedback d-block mb-2">{errors.motelName && errors.motelName.message}</div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="province">Tỉnh/Thành phố:</label>
                                        <Province districtId={districtId} setProvinceId={setProvinceId} provinceIdDefault={provinceId} register={register} errors={errors} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="district">Quận/Huyện:</label>
                                        <District provinceId={provinceId} setDistrictId={setDistrictId} districtIdDefault={districtId} register={register} errors={errors} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="ward">Phường/Xã:</label>
                                        <Ward districtId={districtId} wardIdDefault={motelRoom.ward.wardId} register={register} errors={errors} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="acreage">Diện tích:</label>
                                        <input ref={register({
                                            required: MESSENGER_ERROR.acreage_required,
                                            min: { value: 1, message: MESSENGER_ERROR.acreage_min },
                                            max: { value: 40, message: MESSENGER_ERROR.acreage_max }
                                        })} defaultValue={motelRoom.acreage} type="number" className="form-control form-control-sm " id="acreage" placeholder="Nhập diên tích" name="acreage" autoComplete="off" />
                                        <div className="invalid-feedback d-block mb-2">{errors.acreage && errors.acreage.message}</div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="price">Giá thuê:</label>
                                        <input ref={register({
                                            required: MESSENGER_ERROR.price_required,
                                            min: { value: 100000, message: MESSENGER_ERROR.price_min },
                                            max: { value: 3500000, message: MESSENGER_ERROR.price_max }
                                        })} defaultValue={motelRoom.price} type="number" className="form-control form-control-sm " id="price" placeholder="Nhập giá thuê" name="price" autoComplete="off" />
                                        <div className="invalid-feedback d-block mb-2">{errors.price && errors.price.message}</div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="maxPeople">Ở tối đa:</label>
                                        <input ref={register({
                                            required: MESSENGER_ERROR.maxPeople_required,
                                            min: { value: 1, message: MESSENGER_ERROR.maxPeople_min },
                                            max: { value: 5, message: MESSENGER_ERROR.maxPeople_max }
                                        })} defaultValue={motelRoom.maxPeople} type="number" className="form-control form-control-sm " id="maxPeople" placeholder="Nhập só người tối đa" name="maxPeople" autoComplete="off" />
                                        <div className="invalid-feedback d-block mb-2">{errors.maxPeople && errors.maxPeople.message}</div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-12">
                                    <div className="form-group">
                                        <label htmlFor="address">Địa chỉ trọ:</label>
                                        <input ref={register({
                                            required: MESSENGER_ERROR.address_required,
                                            maxLength: { value: 100, message: MESSENGER_ERROR.address_maxLength }
                                        })} defaultValue={motelRoom.address} type="text" className="form-control form-control-sm " id="address" placeholder="Nhập địa chỉ" name="address" autoComplete="off" />
                                    </div>
                                    <div className="invalid-feedback d-block mb-2">{errors.address && errors.address.message}</div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-12">
                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-4 col-md-3 col-lg-2">Tiêu chí tìm kiếm:</label>
                                        <div className="col-7 col-md-8 col-lg-9 row ">
                                            {renderCriteriaCheckbox()}
                                        </div>
                                    </div>
                                    <div className="invalid-feedback d-block mb-2">{errors.criteria && errors.criteria.message}</div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button type="submit" className="btn btn-sm btn-primary w-100">Lưu</button>
                            </div>
                        </form>
                    )}
                </div>
            </fieldset>
        }
        {loadPageError && <Forbidden />}
    </>)
}