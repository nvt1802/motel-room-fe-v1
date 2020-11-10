import React, { useEffect } from 'react'
import '../../assets/style/login-modal.css'
import { MESSENGER_ERROR } from "../../common/Constant"
import { Link } from 'react-router-dom'

function Login(props) {

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
                <form action="/" onSubmit={props.handleSubmit(async (values) => await props.onSubmit(values))} method="post" id="loginForm">
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
                                        <input ref={props.register({
                                            required: MESSENGER_ERROR.username_required
                                        })} type="text" id="user" name="user" className="my-form-input-control" autoComplete="off" />
                                        <div className="my-place-bottom-line" />
                                        <div className="my-bottom-line-left userInputLine" />
                                        <div className="my-bottom-line-right userInputLine" />
                                        <div className="pt-2">{props.errors.user && <span className="visible error-message pl-0" id="error-user" >{props.errors.user.message}</span>}</div>
                                    </div>
                                    <div className="form-group mt-5" style={{ position: 'relative' }}>
                                        <label htmlFor="pass" id="passwordInputLabel" className="my-form-label-control">
                                            Mật khẩu<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input ref={props.register({
                                            required: MESSENGER_ERROR.password_required
                                        })} type="password" id="pass" name="pass" className="my-form-input-control" />
                                        <div className="my-place-bottom-line" />
                                        <div className="my-bottom-line-left passwordInputLine" />
                                        <div className="my-bottom-line-right passwordInputLine" />
                                        <div className="pt-2">{props.errors.pass && <span className="visible error-message pl-0" id="error-pass" >{props.errors.pass.message}</span>}</div>
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
                                        <u><Link to="/signUp" onClick={props.closeFormLogin} style={{ fontSize: '12px' }}> Đăng ký</Link></u>
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