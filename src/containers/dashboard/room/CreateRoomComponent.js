import React, { useEffect, useState, useRef } from 'react'
import { MESSENGER_ERROR } from '../../../common/Constant'
import MotelRoomAPI from '../../../api/MotelRoomAPI'
import CriteriaAPI from '../../../api/CriteriaAPI'
import { useForm } from 'react-hook-form'
import Province from '../location/ProvinceComponent'
import District from '../location/DistrictComponent'
import Ward from '../location/WardComponent'
import CreateNotification from '../notification/CreateNotification'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'


export default function CreateRoom(props) {

    const [provinceId, setProvinceId] = useState(-1)
    const [districtId, setDistrictId] = useState(-1)
    const [listCriteria, setListCriteria] = useState([])
    const { handleSubmit, register, errors } = useForm()
    const [option, setOption] = useState({})
    const notification = useRef(null)

    const getListCriteria = () => {
        CriteriaAPI.findAll().then(res => { setListCriteria(res.data) })
    }

    const renderCriteriaCheckbox = () => {
        var elements = listCriteria.map((value, index) => {
            return (<div key={index} className="custom-control custom-checkbox mb-3 mr-5">
                <input ref={register({
                    required: MESSENGER_ERROR.criteria_required,
                    validate: (value) => validateMedium(value) || MESSENGER_ERROR.criteria_required
                })} type="checkbox" className="custom-control-input" defaultValue={value.criteriaId} id={value.criteriaId} name={"criteria"} />
                <label className="custom-control-label" htmlFor={value.criteriaId}>{value.criteriaName}</label>
            </div>)
        })
        return elements
    }

    const validateMedium = (value) => {
        if (value.size === 0) {
            return false;
        }
        return true;
    }
    
    useEffect(() => {
        if (props.account.role === 1) {
            props.history.push("/dashboard")
        }
    }, [props])

    useEffect(() => {
        document.title = 'Create Room'
        getListCriteria()
    }, [props])

    const onSubmit = values => {
        CriteriaAPI.findCriteriaByListCriteriaId(Array.from(values.criteria)).then(res => {
            let motelRoom = {
                "motelId": -1,
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
            MotelRoomAPI.createMotelRoom(motelRoom).then(res => {
                if (res.data) {
                    setOption({ title: 'Thông báo', message: 'Tạo thành công', type: 'success', duration: 1000 })
                    notification.current.click()
                } else {
                    setOption({ title: 'Thông báo', message: 'Tạo không thành công', type: 'warning', duration: 1000 })
                    notification.current.click()
                }
            }).catch(err => {
                setOption({ title: 'Thông báo', message: 'Tạo không thành công', type: 'warning', duration: 1000 })
                notification.current.click()
            })
        }).catch(err => {
            setOption({ title: 'Thông báo', message: 'Tạo không thành công', type: 'warning', duration: 1000 })
            notification.current.click()
        })
    }

    return (<>
        <button ref={notification} style={{ display: 'none' }} onClick={CreateNotification({ title: option.title, message: option.message, type: option.type, duration: option.duration })} />
        <NotificationContainer />
        <fieldset style={{ border: '1px black solid' }}>
            <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">Tạo phòng trọ mới</legend>
            <div className="m-2">
                <form onSubmit={handleSubmit(async values => await onSubmit(values))}>
                    <div className="row">
                        <div className="col-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <label htmlFor="motelName">Tên phòng:</label>
                                <input ref={register({
                                    required: MESSENGER_ERROR.motelName_required,
                                    maxLength: { value: 100, message: MESSENGER_ERROR.motelName_maxLength }
                                })} type="text" className="form-control form-control-sm " id="motelName" placeholder="Nhập tên phòng" name="motelName" autoComplete="off" />
                            </div>
                            <div className="invalid-feedback d-block mb-2">{errors.motelName && errors.motelName.message}</div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="province">Tỉnh/Thành phố:</label>
                                <Province districtId={districtId} setProvinceId={setProvinceId} register={register} errors={errors} />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="district">Quận/Huyện:</label>
                                <District provinceId={provinceId} setDistrictId={setDistrictId} register={register} errors={errors} />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="ward">Phường/Xã:</label>
                                <Ward districtId={districtId} register={register} errors={errors} />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="acreage">Diện tích:</label>
                                <input ref={register({
                                    required: MESSENGER_ERROR.acreage_required,
                                    min: { value: 1, message: MESSENGER_ERROR.acreage_min },
                                    max: { value: 40, message: MESSENGER_ERROR.acreage_max }
                                })} type="number" className="form-control form-control-sm " id="acreage" placeholder="Nhập diên tích" name="acreage" autoComplete="off" />
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
                                })} type="number" className="form-control form-control-sm " id="price" placeholder="Nhập giá thuê" name="price" autoComplete="off" />
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
                                })} type="number" className="form-control form-control-sm " id="maxPeople" placeholder="Nhập só người tối đa" name="maxPeople" autoComplete="off" />
                                <div className="invalid-feedback d-block mb-2">{errors.maxPeople && errors.maxPeople.message}</div>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <label htmlFor="address">Địa chỉ trọ:</label>
                                <input ref={register({
                                    required: MESSENGER_ERROR.address_required,
                                    maxLength: { value: 100, message: MESSENGER_ERROR.address_maxLength }
                                })} type="text" className="form-control form-control-sm " id="address" placeholder="Nhập địa chỉ" name="address" autoComplete="off" />
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
                        <button type="submit" className="btn btn-sm btn-primary w-100">Thêm</button>
                    </div>
                </form>
            </div>
        </fieldset>
    </>)
}