import React, { useEffect } from 'react'
import AccountAPI from '../../api/AccountAPI'
import { REGEX_DATE, REGEX_PHONE, REGEX_EMAIL } from '../../common/ValidateCommon'
import NotificationModal from '../../components/layout/NotificationSignUpComponent'
import '../../assets/style/sign-up.css'
import { MESSENGER_ERROR } from '../../common/Constant'

export default function SignUp(props) {

    const renderOptionProvince = () => {
        var elements = props.location.province.map((value, index) => {
            return <option value={value.provinceId} key={value.provinceId}>{value.provinceName}</option>
        })
        return elements
    }

    const renderOptionDistrict = () => {
        var elements = props.location.district.map((value, index) => {
            return <option value={value.districtId} key={value.districtId}>{value.districtName}</option>
        })
        return elements
    }

    const addEventTagInput = () => {
        let list = document.getElementsByTagName('input')
        for (let i = 0; i < list.length; i++) {
            list[i].addEventListener('focus', (e) => {
                e.target.style.borderColor = "#888"
                let listNode = e.target.parentNode.childNodes
                for (let j = 0; j < listNode.length; j++) {
                    if (listNode[j].tagName === 'LABEL') {
                        listNode[j].style.top = "-10px"
                        listNode[j].style.color = "#666"
                        listNode[j].style.fontSize = "12px"
                        listNode[j].style.fontStyle = "italic"
                    }
                }
            })
            list[i].addEventListener('focusout', (e) => {
                e.target.style.borderColor = "#ddd"
                if (e.target.value === '') {
                    let listNode = e.target.parentNode.childNodes
                    for (let j = 0; j < listNode.length; j++) {
                        if (listNode[j].tagName === 'LABEL') {
                            listNode[j].style.top = "10%"
                            listNode[j].style.color = "inherit"
                            listNode[j].style.fontSize = "inherit"
                            listNode[j].style.fontStyle = "normal"
                        }
                    }
                }
            })
        }

        document.getElementsByClassName("show-password-icon")[0].addEventListener('click', (e) => {
            let node = e.target.parentNode.childNodes[0]
            let rePassword = document.getElementById("rePassword")
            if (node.type === 'password') {
                node.type = "text"
                rePassword.type = "text"
                e.target.classList.remove('fa-eye-slash')
                e.target.classList.add('fa-eye')
            } else {
                node.type = "password"
                rePassword.type = "password"
                e.target.classList.add('fa-eye-slash')
                e.target.classList.remove('fa-eye')
            }
        })

        let birthDateElement = document.getElementById('birthday')

        birthDateElement.addEventListener('focusin', e => {
            e.target.type = 'date'
        })

        birthDateElement.addEventListener('focusout', e => {
            if (e.target.value === '') {
                e.target.type = 'text'
            }
        })

    }

    useEffect(() => {
        addEventTagInput()
        document.title = 'SignUp'
    }, [])

    const closeModalNotification = () => {
        props.setSignUpSuccess(false)
    }

    return (<>
        <div className="pt-5 pb-5">
            <div className="container my-sign-up-form">
                <div>
                    <div className="alert alert-light text-center text-success font-weight-bold m-0" role="alert">Đăng ký tài khoản</div>
                </div>
                <form action="/SignUp" onSubmit={props.handleSubmit(async (values) => await props.onSubmit(values))} method="POST">
                    <div className="row">
                        <div className="form-bounded col-sm-12 col-md-6 pl-0">
                            <input ref={props.register({
                                required: MESSENGER_ERROR.username_required,
                                validate: async value => await AccountAPI.checkUserNameExist(value).then(res => { return res.data }) || MESSENGER_ERROR.username_exist
                            })} type="text" name="username" id="username" className="form-control" style={{ borderColor: 'rgb(221, 221, 221)' }} autoComplete="off" />
                            <label htmlFor="username" style={{ top: '10%', color: 'inherit', fontSize: 'inherit', fontStyle: 'normal' }}>
                                Tên tài khoản <span className="text-danger">*</span>
                            </label>
                            <span className="visible error-message">{props.errors.username && props.errors.username.message}</span>
                        </div>
                        <div className="form-bounded col-sm-12 col-md-6 pl-0">
                            <input ref={props.register({
                                required: MESSENGER_ERROR.email_required,
                                pattern: {
                                    value: REGEX_EMAIL,
                                    message: MESSENGER_ERROR.email_valid
                                }
                            })} type="email" name="email" id="email" className="form-control" style={{ borderColor: 'rgb(221, 221, 221)' }} autoComplete="off" />
                            <label htmlFor="email" style={{ top: '10%', color: 'inherit', fontSize: 'inherit', fontStyle: 'normal' }}>
                                Email<span className="text-danger visible">*</span>
                            </label>
                            <span className="visible error-message">{props.errors.email && props.errors.email.message}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-bounded col-sm-12 col-md-6 pl-0">
                            <input ref={props.register({
                                required: MESSENGER_ERROR.password_required
                            })} type="password" name="password" id="password" className="form-control" style={{ borderColor: 'rgb(221, 221, 221)' }} autoComplete="off" />
                            <label htmlFor="password" style={{ top: '10%', color: 'inherit', fontSize: 'inherit', fontStyle: 'normal' }}>
                                Mật khẩu <span className="text-danger visible">*</span>
                            </label>
                            <i className="fa fa-eye-slash show-password-icon" />
                            <span className="visible error-message">{props.errors.password && props.errors.password.message}</span>
                        </div>
                        <div className="form-bounded col-sm-12 col-md-6 px-0">
                            <input ref={props.register({
                                required: MESSENGER_ERROR.password_required,
                                validate: value => (value !== props.getValues('password') ? false : true) || MESSENGER_ERROR.password_confirm
                            })} type="password" name="rePassword" id="rePassword" className="form-control" style={{ borderColor: 'rgb(221, 221, 221)' }} autoComplete="off" />
                            <label htmlFor="rePassword" style={{ top: '10%', color: 'inherit', fontSize: 'inherit', fontStyle: 'normal' }}>
                                Xác nhận mật khẩu <span className="text-danger visible">*</span>
                            </label>
                            <span className="visible error-message">{props.errors.rePassword && props.errors.rePassword.message}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-bounded col-sm-12 col-md-6 pl-0">
                            <input ref={props.register({
                                required: MESSENGER_ERROR.name_required
                            })} type="text" name="name" id="name" className="form-control" style={{ borderColor: 'rgb(221, 221, 221)' }} autoComplete="off" />
                            <label htmlFor="name" style={{ top: '10%', color: 'inherit', fontSize: 'inherit', fontStyle: 'normal' }}>
                                Họ tên <span className="text-danger visible">*</span>
                            </label>
                            <span className="visible error-message">{props.errors.name && props.errors.name.message}</span>
                        </div>
                        <div className="form-bounded col-sm-12 col-md-6 px-0">
                            <input ref={props.register({
                                required: MESSENGER_ERROR.birthday_required,
                                pattern: {
                                    value: REGEX_DATE,
                                    message: MESSENGER_ERROR.birthday_valid
                                }
                            })} type="text" name="birthday" id="birthday" className="datepicker form-control" style={{ borderColor: 'rgb(221, 221, 221)' }} autoComplete="off" />
                            <label htmlFor="birthday" style={{ top: '10%', color: 'inherit', fontSize: 'inherit', fontStyle: 'normal' }}>
                                Ngày sinh <span className="text-danger visible">*</span>
                            </label>
                            <span className="visible error-message">{props.errors.birthday && props.errors.birthday.message}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-bounded col-sm-12 col-md-6 pl-0">
                            <input ref={props.register({
                                required: MESSENGER_ERROR.phone_required,
                                pattern: {
                                    value: REGEX_PHONE,
                                    message: MESSENGER_ERROR.phone_valid
                                }
                            })} type="text" name="phone" id="phone" className="form-control" style={{ borderColor: 'rgb(221, 221, 221)' }} />
                            <label htmlFor="phone" style={{ top: '10%', color: 'inherit', fontSize: 'inherit', fontStyle: 'normal' }}>
                                Số điện thoại <span className="text-danger visible">*</span>
                            </label>
                            <span className="visible error-message">{props.errors.phone && props.errors.phone.message}</span>
                        </div>
                        <div className="form-bounded col-sm-12 col-md-6 px-0">
                            <select ref={props.register({
                                required: MESSENGER_ERROR.gender_required,
                                validate: value => (parseInt(value) === -1 ? false : true) || MESSENGER_ERROR.gender_required
                            })} className="form-control cursor" id="gender" name="gender" style={{ borderColor: 'rgb(221, 221, 221)' }}>
                                <option value={-1}>N/A</option>
                                <option value={1}>Nam</option>
                                <option value={2}>Nữ</option>
                            </select>
                            <label htmlFor="gender" style={{ top: '-10px', color: 'rgb(102, 102, 102)', fontSize: '12px', fontStyle: 'italic' }}>
                                Giới tính <span className="text-danger">*</span>
                            </label>
                            <span className="visible error-message">{props.errors.gender && props.errors.gender.message}</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-bounded col-sm-12 col-md-6 pl-0">
                            <select ref={props.register({
                                required: MESSENGER_ERROR.province_required,
                                validate: value => (parseInt(value) === -1 ? false : true) || MESSENGER_ERROR.province_required
                            })} onChange={props.handleChangeProvince}
                                className="form-control cursor" id="provinceSignUp" name="province" style={{ borderColor: 'rgb(221, 221, 221)' }}>
                                <option value={-1}>Tỉnh/Thành phố</option>
                                {renderOptionProvince()}
                            </select>
                            <label htmlFor="provinceSignUp" style={{ top: '-10px', color: 'rgb(102, 102, 102)', fontSize: '12px', fontStyle: 'italic' }}>
                                Chọn Tỉnh/Thành phố <span className="text-danger">*</span>
                            </label>
                            <span className="visible error-message">{props.errors.province && props.errors.province.message}</span>
                        </div>
                        <div className="form-bounded col-sm-12 col-md-6 px-0">
                            <select ref={props.register({
                                required: MESSENGER_ERROR.district_required,
                                validate: value => (parseInt(value) === -1 ? false : true) || MESSENGER_ERROR.district_required
                            })} className="form-control cursor" id="districtSignUp" name="district" style={{ borderColor: 'rgb(221, 221, 221)' }}>
                                <option value={-1}> Quận/Huyện</option>
                                {renderOptionDistrict()}
                            </select>
                            <label htmlFor="districtSignUp" style={{ top: '-10px', color: 'rgb(102, 102, 102)', fontSize: '12px', fontStyle: 'italic' }}>
                                Chọn Quận/Huyện<span className="text-danger">*</span>
                            </label>
                            <span className="visible error-message">{props.errors.district && props.errors.district.message}</span>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-between mt-3">
                        <div className="w-50 text-left">
                            <a href="/" id="closeSignUpModal" className="btn btn-sm my-btn-default" style={{ width: '105px' }} data-toggle="modal" data-target="#loginModal">Đăng nhập</a>
                        </div>
                        <div className="w-50 text-right">
                            <button id="signUp" type="submit" className="btn btn-sm my-btn-primary" style={{ width: '125px' }} >Đăng ký</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        {props.signUpSuccess === true ? <NotificationModal closeModal={closeModalNotification} history={props.history} /> : null}
    </>
    )
}