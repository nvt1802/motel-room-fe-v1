import React, { useState, useRef, useEffect } from 'react'
import AccountAPI from '../../../api/AccountAPI'
import { MESSENGER_ERROR } from "../../../common/Constant"
import { REGEX_DATE, REGEX_PHONE, REGEX_EMAIL } from '../../../common/ValidateCommon'
import CreateNotification from '../notification/CreateNotification'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import { useForm } from 'react-hook-form'
import Province from '../location/ProvinceComponent'
import District from '../location/DistrictComponent'

export default function ChangeInfo(props) {
    const [provinceId, setProvinceId] = useState(props.account.provinceId)
    const [districtId, setDistrictId] = useState(props.account.districtId)

    const [option, setOption] = useState({})
    const notification = useRef(null)
    const { handleSubmit, register, errors } = useForm()

    const onSubmit = values => {
        let acc = {
            "accountId": props.account.accountId,
            "userName": props.account.userName,
            "birthday": values.birthday,
            "email": values.email,
            "gender": values.gender,
            "name": values.name,
            "phone": values.phone,
            "provinceId": values.province,
            "districtId": values.district,
            "role": props.account.role
        }
        AccountAPI.updateInfo(acc).then(res => {
            if (res.data) {
                setOption({ title: 'Thông báo', message: 'Thay đổi thông tin thành công. Đăng nhập lại để thông tin được hiển thị đúng.', type: 'success', duration: 1000 })
                notification.current.click()
            } else {
                setOption({ title: 'Thông báo', message: 'Thay đổi thông tin không thành công', type: 'warning', duration: 1000 })
                notification.current.click()
            }
        }).catch((err) => {
            setOption({ title: 'Thông báo', message: 'Thay đổi thông tin không thành công', type: 'warning', duration: 1000 })
            notification.current.click()
        })
    }

    useEffect(() => {
        document.title = 'Change Info'
    }, [props])

    return (<>
        <button ref={notification} style={{ display: 'none' }} onClick={CreateNotification({ title: option.title, message: option.message, type: option.type, duration: option.duration })} />
        <NotificationContainer />
        <fieldset style={{ border: '1px black solid' }}>
            <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">
                <div id="avatar">
                    <a href="#1" id="btn-upload-avatar"><i className="fa fa-cloud-upload text-danger"></i></a>
                </div>
            </legend>
            <div className="m-3">
                <form action="/" onSubmit={handleSubmit(async (values) => await onSubmit(values))}>
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="email">Tên đăng nhập:</label>
                                <input type="text" className="form-control" id="username" name="username" defaultValue={props.account.userName} readOnly />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="role">Vai trò:</label>
                                <input type="text" className="form-control" id="role" name="role" defaultValue={props.account.role === 1 ? 'Quản trị viên' : 'Người dùng'} readOnly />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="name">Họ tên:</label>
                                <input ref={register({
                                    maxLength: { value: 150, message: MESSENGER_ERROR.name_maxLength },
                                    required: MESSENGER_ERROR.name_required
                                })} type="text" className="form-control" id="name" placeholder="Nhập họ tên" name="name" defaultValue={props.account.name} />
                                <div></div>
                                <div className="invalid-feedback d-block">{errors.name && errors.name.message}</div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="gender">Giới tính:</label>
                                <select ref={register({
                                    required: MESSENGER_ERROR.gender_required,
                                    validate: value => (parseInt(value) === -1 ? false : true) || MESSENGER_ERROR.gender_required
                                })} className="form-control" id="gender" placeholder="Giới tính" name="gender" defaultValue={props.account.gender}>
                                    <option value="-1">Chọn giới tính</option>
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
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
                                })} type="date" className="form-control" id="birthday" placeholder="Nhập ngày sinh" name="birthday" defaultValue={props.account.birthday} />
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
                                })} type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" name="phone" defaultValue={props.account.phone} />
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
                                })} type="email" className="form-control" id="email" placeholder="Nhập email" name="email" defaultValue={props.account.email} />
                                <div className="invalid-feedback d-block">{errors.email && errors.email.message}</div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="province">Tỉnh/Thành phố:</label>
                                <Province districtId={districtId} setProvinceId={setProvinceId} provinceIdDefault={props.account.provinceId} register={register} errors={errors} />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="form-group">
                                <label htmlFor="district">Quận/Huyện:</label>
                                <District provinceId={provinceId} setDistrictId={setDistrictId} districtIdDefault={props.account.districtId} register={register} errors={errors} />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">Lưu</button>
                    </div>
                </form>
            </div>
        </fieldset>
    </>)
}