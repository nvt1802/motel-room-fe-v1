import React, { useEffect } from 'react'
import '../../assets/style/login-modal.css'
import AuthService from '../../auth/AuthenticationService'
import { MESSENGER_ERROR } from "../../common/Constant"
import { Link } from 'react-router-dom'
import AccountAPI from '../../api/AccountAPI'
import { useForm } from 'react-hook-form'

function Login(props) {

    const { handleSubmit, register, errors, setError } = useForm()

    const onSubmit = values => {
        AuthService.executeJwtAuthenticateService(values.user, values.pass)
            .then((res) => {
                AuthService.createJwtAuthToken(res.data.token)
                AuthService.registerSuccessFullLogin(values.user, values.pass, res.data.token)
                closeFormLogin()
                AccountAPI.findAccountByUserName(AuthService.getUsername()).then(res => {
                    props.initAuthenticate({
                        "accountId": res.data.accountId,
                        "userName": res.data.userName,
                        "role": res.data.role,
                        "name": res.data.name,
                        "gender": res.data.gender,
                        "birthday": res.data.birthday,
                        "phone": res.data.phone,
                        "email": res.data.email,
                        "provinceId": res.data.provinceId,
                        "districtId": res.data.districtId
                    })
                }).catch(res => { })
            }).catch((err) => {
                if (err) {
                    let errMess = err.response.data
                    switch (errMess) {
                        case 'INVALID_USERNAME':
                            setError('user', {
                                type: "manual",
                                message: MESSENGER_ERROR.username
                            })
                            break
                        case 'INVALID_PASSWORD':
                            setError('pass', {
                                type: "manual",
                                message: MESSENGER_ERROR.password
                            })
                            break
                        case 'ACCOUNT_LOCKED':
                            setError('user', {
                                type: "manual",
                                message: MESSENGER_ERROR.account_locked
                            })
                            break
                        default:
                            break
                    }
                }
            })
    }

    const closeFormLogin = () => {
        document.getElementById('hideLoginModal').click()
    }

    useEffect(() => {
        let userElement = document.getElementById('user')
        let passElement = document.getElementById('pass')
        userElement.addEventListener('focus', handleFocus)
        passElement.addEventListener('focus', handleFocus)
        userElement.addEventListener('focusout', handleFocusOut)
        passElement.addEventListener('focusout', handleFocusOut)
    }, [props])

    const handleFocus = (e) => {
        e.target.style.borderColor = "#888"
        let listNode = e.target.parentNode.childNodes
        for (let j = 0; j < listNode.length; j++) {
            if (listNode[j].tagName === 'LABEL') {
                listNode[j].style.top = "-30px"
                listNode[j].style.fontSize = "14px"
                listNode[j].style.fontStyle = "italic"
            }
        }
        let inputLine
        if (e.target.name === 'user') {
            inputLine = document.getElementsByClassName('userInputLine')
        } else {
            inputLine = document.getElementsByClassName('passwordInputLine')
        }
        for (let i = 0; i < inputLine.length; i++) {
            inputLine[i].style.width = '50%'
            inputLine[i].style.transition = '0.5s'
        }
    }

    const handleFocusOut = (e) => {
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
            let inputLine
            if (e.target.name === 'user') {
                inputLine = document.getElementsByClassName('userInputLine')
            } else {
                inputLine = document.getElementsByClassName('passwordInputLine')
            }
            for (let i = 0; i < inputLine.length; i++) {
                inputLine[i].style.width = '0px'
            }
        }
    }

    return (
        <>
            <div className="modal fade" id="loginModal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <form action="/" onSubmit={handleSubmit(async (values) => await onSubmit(values))} method="post" id="loginForm">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                                <h5 className="modal-title my-text-primary">Đăng nhập</h5>
                                <button type="button" id="hideLoginModal" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="text-dark">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="form-group" style={{ position: 'relative' }}>
                                        <label htmlFor="user" id="userInputLabel" className="my-form-label-control">
                                            Tên tài khoản <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input ref={register({
                                            required: MESSENGER_ERROR.username_required
                                        })} type="text" id="user" name="user" className="my-form-input-control" autoComplete="off" />
                                        <div className="my-place-bottom-line" />
                                        <div className="my-bottom-line-left userInputLine" />
                                        <div className="my-bottom-line-right userInputLine" />
                                        <div className="pt-2">{errors.user && <span className="visible error-message pl-0" id="error-user" >{errors.user.message}</span>}</div>
                                    </div>
                                    <div className="form-group mt-5" style={{ position: 'relative' }}>
                                        <label htmlFor="pass" id="passwordInputLabel" className="my-form-label-control">
                                            Mật khẩu<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input ref={register({
                                            required: MESSENGER_ERROR.password_required
                                        })} type="password" id="pass" name="pass" className="my-form-input-control" />
                                        <div className="my-place-bottom-line" />
                                        <div className="my-bottom-line-left passwordInputLine" />
                                        <div className="my-bottom-line-right passwordInputLine" />
                                        <div className="pt-2">{errors.pass && <span className="visible error-message pl-0" id="error-pass" >{errors.pass.message}</span>}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer d-block text-center" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                                <button id="submitLogin" type="submit" className="btn btn-sm my-btn-primary w-100">Đăng nhập</button>
                                <br />
                                <br />
                                <div className="row">
                                    <div className="col-sm-12 col-md-6 pl-0" style={{ textAlign: 'left' }}>
                                        <i style={{ fontSize: '12px' }}>
                                            <a href="/" id="openResetPass" data-toggle="modal" data-dismiss="modal" data-target="#resetPasswordModal" style={{ fontSize: '12px' }}>Quên mật khẩu?</a>
                                        </i>
                                    </div>
                                    <div className="col-sm-12 col-md-6 px-0">
                                        <i style={{ fontSize: '12px' }}>Bạn chưa có tài khoản ?</i>
                                        <u><Link to="/signUp" onClick={closeFormLogin} style={{ fontSize: '12px' }}> Đăng ký</Link></u>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login