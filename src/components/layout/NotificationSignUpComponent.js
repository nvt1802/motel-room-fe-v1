import React, { useEffect } from 'react'

function NotificationModal(props) {

    const showModalNotification = () => {
        document.getElementById('showModal').click()
    }

    useEffect(() => {
        showModalNotification()
    })

    const gotoHomePage = () => {
        props.history.push('/')
    }
    return (<>
        <button id="showModal" data-toggle="modal" data-target="#notificationModal" className="d-none"></button>
        <div className="modal fade" id="notificationModal" data-backdrop="static" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                        <button onClick={props.closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" className="text-dark">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="text-success text-center font-weight-bold">Tạo tài khoản thành công !</div>
                    </div>
                    <div className="modal-footer d-block text-center" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                        <button onClick={props.closeModal} data-toggle="modal" data-dismiss="modal" aria-label="Close" data-target="#loginModal" type="button" className="btn btn-sm my-btn-primary w-100">Đăng nhập Ngay</button>
                        <button type="button" onClick={gotoHomePage} data-dismiss="modal" aria-label="Close" className="btn btn-sm btn-outline-primary w-100">Quay lại trang chủ</button>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default NotificationModal