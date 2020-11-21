import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import AccountAPI from '../../../api/AccountAPI'
import { MESSENGER_ERROR } from "../../../common/Constant"
import { REGEX_DATE, REGEX_PHONE, REGEX_EMAIL } from '../../../common/ValidateCommon'
import { useForm } from 'react-hook-form'
import Province from '../location/ProvinceComponent'
import District from '../location/DistrictComponent'
import CreateNotification from '../notification/CreateNotification'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import Forbidden from '../../layout/Forbidden'

export default function EditAccountComponent(props) {
    let { accountId } = useParams()

    const [account, setAccount] = useState([])
    const [provinceId, setProvinceId] = useState(null)
    const [districtId, setDistrictId] = useState(null)
    const { handleSubmit, register, errors } = useForm()
    const [option, setOption] = useState({})
    const notification = useRef(null)
    const [loadPageError, setLoadPageError] = useState(false)

    const getOneAccount = (accountId) => {
        AccountAPI.findAccountByAccountId(accountId).then(res => {
            setAccount(res.data)
            setProvinceId(res.data.provinceId)
            setDistrictId(res.data.districtId)
        }).catch(err => {
            setLoadPageError(true)
        })
    }

    const onSubmit = values => {
        let acc = {
            "accountId": account.accountId,
            "userName": account.userName,
            "birthday": values.birthday,
            "districtId": values.district,
            "email": values.email,
            "gender": values.gender,
            "name": values.name,
            "phone": values.phone,
            "provinceId": values.province,
            "role": values.role
        }
        AccountAPI.updateOneAccount(acc).then(res => {
            if (res.data) {
                setOption({ title: 'Thông báo', message: 'Chỉnh sửa thành công', type: 'success', duration: 1000 })
                notification.current.click()
            } else {
                setOption({ title: 'Thông báo', message: 'Chỉnh sửa không thành công', type: 'warning', duration: 1000 })
                notification.current.click()
            }
        })
    }

    useEffect(() => {
        getOneAccount(accountId)
    }, [accountId, props])

    return (<>
        <button ref={notification} style={{ display: 'none' }} onClick={CreateNotification({ title: option.title, message: option.message, type: option.type, duration: option.duration })} />
        <NotificationContainer />
        {!loadPageError &&
            <fieldset style={{ border: '1px black solid' }}>
                <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">Chỉnh sửa thông tin tài khoản</legend>
                <div className="m-5">
                    <form action="/" onSubmit={handleSubmit(async (values) => await onSubmit(values))}>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="email">Tên đăng nhập:</label>
                                    <input type="text" className="form-control" id="username" placeholder="Nhập tên đăng nhập" name="username" defaultValue={account.userName} readOnly />
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="role">Vai trò:</label>
                                    <select ref={register({
                                        required: MESSENGER_ERROR.role_required,
                                        validate: value => (parseInt(value) === -1 ? false : true) || MESSENGER_ERROR.role_required
                                    })} className="form-control" id="role" placeholder="Vai trò" name="role" defaultValue={account.role}>
                                        <option value="-1">Chọn vai trò</option>
                                        {account.role === 1 ? <option selected value="1">Quản trị viên</option> : <option value="1">Quản trị viên</option>}
                                        {account.role === 2 ? <option selected value="2">Người dùng</option> : <option value="2">Người dùng</option>}
                                    </select>
                                    <div className="invalid-feedback d-block">{errors.role && errors.role.message}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="name">Họ tên:</label>
                                    <input ref={register({
                                        maxLength: { value: 150, message: MESSENGER_ERROR.name_maxLength },
                                        required: MESSENGER_ERROR.name_required
                                    })} type="text" className="form-control" id="name" placeholder="Nhập họ tên" name="name" defaultValue={account.name} />
                                    <div className="invalid-feedback d-block">{errors.name && errors.name.message}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="gender">Giới tính:</label>
                                    <select ref={register({
                                        required: MESSENGER_ERROR.gender_required,
                                        validate: value => (parseInt(value) === -1 ? false : true) || MESSENGER_ERROR.gender_required
                                    })} className="form-control" id="gender" placeholder="Nhập giới tính" name="gender" defaultValue={account.gender}>
                                        <option value="-1">Chọn giới tính</option>
                                        {account.gender === 1 ? <option selected value="1">Nam</option> : <option value="1">Nam</option>}
                                        {account.gender === 2 ? <option selected value="2">Nữ</option> : <option value="2">Nữ</option>}
                                    </select>
                                    <div className="invalid-feedback d-block">{errors.gender && errors.gender.message}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="birthday">Ngày sinh:</label>
                                    <input ref={register({
                                        required: MESSENGER_ERROR.birthday_required,
                                        pattern: {
                                            value: REGEX_DATE,
                                            message: MESSENGER_ERROR.birthday_valid
                                        }
                                    })} type="date" className="form-control" id="birthday" placeholder="Nhập ngày sinh" name="birthday" defaultValue={account.birthday} />
                                    <div className="invalid-feedback d-block">{errors.birthday && errors.birthday.message}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại:</label>
                                    <input ref={register({
                                        required: MESSENGER_ERROR.phone_required,
                                        pattern: {
                                            value: REGEX_PHONE,
                                            message: MESSENGER_ERROR.phone_valid
                                        }
                                    })} type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" name="phone" defaultValue={account.phone} />
                                    <div className="invalid-feedback d-block">{errors.phone && errors.phone.message}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="email">email:</label>
                                    <input ref={register({
                                        required: MESSENGER_ERROR.email_required,
                                        pattern: {
                                            value: REGEX_EMAIL,
                                            message: MESSENGER_ERROR.email_valid
                                        }
                                    })} type="email" className="form-control" id="email" placeholder="Nhập email" name="email" defaultValue={account.email} />
                                    <div className="invalid-feedback d-block">{errors.email && errors.email.message}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="province">Tỉnh/Thành phố:</label>
                                    {Object.keys(account).length !== 0 && <Province districtId={districtId} setProvinceId={setProvinceId} provinceIdDefault={account.provinceId} register={register} errors={errors} />}
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                    <label htmlFor="district">Quận/Huyện/Thị xã:</label>
                                    {Object.keys(account).length !== 0 && provinceId && <District provinceId={provinceId} setDistrictId={setDistrictId} districtIdDefault={account.districtId} register={register} errors={errors} />}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">Lưu</button>
                        </div>
                    </form>
                </div>
            </fieldset>
        }
        {loadPageError && <Forbidden />}
    </>)
}

