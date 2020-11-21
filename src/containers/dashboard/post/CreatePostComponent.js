import React, { useEffect, useRef } from 'react'
import MotelRoomAPI from '../../../api/MotelRoomAPI'
import { useState } from 'react'
import { MESSENGER_ERROR } from '../../../common/Constant'
import ImageAPI from '../../../api/ImageAPI'
import PostAPI from '../../../api/PostAPI'
import { useForm } from 'react-hook-form'
import CreateNotification from '../notification/CreateNotification'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

export default function CreatePost(props) {

    const [option, setOption] = useState({})
    const notification = useRef(null)
    const [room, setRoom] = useState([])
    const { handleSubmit, register, errors } = useForm()

    const handleEventChoseImage = () => {
        let imageListElement = document.getElementById('imageList')
        imageListElement.addEventListener('change', (e) => {
            var countFiles = imageListElement.files.length
            var imgPath = imageListElement.value
            var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase()
            var image_holder = document.getElementById('image_holder')
            image_holder.innerHTML = ''
            let boxImg = document.getElementById('boxImg')
            if (countFiles > 0) {
                boxImg.classList.add('mt-2')
                boxImg.classList.add('mb-2')
                boxImg.style.maxHeight = '210px'
            } else {
                boxImg.classList.remove('mt-2')
                boxImg.classList.remove('mb-2')
                boxImg.style.maxHeight = '0px'
            }
            if (extn === "gif" || extn === "png" || extn === "jpg" || extn === "jpeg") {
                if (typeof (FileReader) !== "undefined") {
                    for (var i = 0; i < countFiles; i++) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var img = document.createElement("IMG")
                            img.setAttribute('src', e.target.result)
                            img.classList.add('image_holder')
                            image_holder.appendChild(img)
                        }
                        reader.readAsDataURL(imageListElement.files[i]);
                    }
                } else { }
            } else { }
        })
    }

    useEffect(() => {
        if (props.account.role === 1) {
            props.history.push("/dashboard")
        }
    }, [props])

    useEffect(() => {
        document.title = 'Create Post'
        handleEventChoseImage()
        getMotelRoom(props.account.accountId)
    }, [props])

    const getMotelRoom = (accountId) => {
        MotelRoomAPI.findMotelRoomByAccountId(accountId).then(res => {
            setRoom(res.data)
        })
    }

    const handleClickClear = () => {
        document.getElementById('imageList').value = null
        document.getElementById('image_holder').innerHTML = ''
        let boxImg = document.getElementById('boxImg')
        boxImg.classList.remove('mt-2')
        boxImg.classList.remove('mb-2')
        boxImg.style.maxHeight = '0px'
    }

    const renderOptionRoom = () => {
        var elements = room.map((value, index) => {
            return <option value={value.motelId} key={value.motelId}>{value.motelName}</option>
        })
        return elements
    }

    const onSubmit = values => {
        let post = {
            postId: -1,
            postTitle: values.postTitle,
            description: values.description,
            postView: 0,
            motelRoom: { motelId: parseInt(values.room) },
            account: { accountId: parseInt(props.account.accountId) }
        }
        PostAPI.createPost(post).then(res => {
            if (res.data) {
                ImageAPI.fileUpload(post.motelRoom.motelId, document.getElementById('imageList')).then(res => {
                    setOption({ title: 'Thông báo', message: 'Tạo thành công', type: 'success', duration: 1000 })
                    notification.current.click()
                })
            } else {
                setOption({ title: 'Thông báo', message: 'Tạo không thành công', type: 'warning', duration: 1000 })
                notification.current.click()
            }
        }).catch(err => {
            setOption({ title: 'Thông báo', message: 'Tạo không thành công', type: 'warning', duration: 1000 })
            notification.current.click()
        })
    }

    return (<>
        <button ref={notification} style={{ display: 'none' }} onClick={CreateNotification({ title: option.title, message: option.message, type: option.type, duration: option.duration })} />
        <NotificationContainer />
        <fieldset style={{ border: '1px black solid' }}>
            <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">Đăng bài viết mới</legend>
            <div className="m-5">
                <form onSubmit={handleSubmit(async (values) => await onSubmit(values))}>
                    <div className="form-group">
                        <label htmlFor="room">Chọn phòng:</label>
                        <select ref={register({
                            required: MESSENGER_ERROR.room_required,
                            validate: value => (parseInt(value) === -1 ? false : true) || MESSENGER_ERROR.room_required
                        })} className="form-control form-control-sm" id="room" placeholder="Quận/Huyện" name="room">
                            <option value="-1">Chọn phòng</option>
                            {renderOptionRoom()}
                        </select>
                        <div className="invalid-feedback d-block">{errors.room && errors.room.message}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="postTitle">Tiêu đề:</label>
                        <input ref={register({
                            required: MESSENGER_ERROR.postTitle_required,
                            maxLength: { value: 255, message: MESSENGER_ERROR.postTitle_maxLength }
                        })} type="text" className="form-control form-control-sm" id="postTitle" placeholder="Nhập tiêu đề" name="postTitle" autoComplete="off" />
                        <div className="invalid-feedback d-block">{errors.postTitle && errors.postTitle.message}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Mô tả:</label>
                        <textarea ref={register({
                            required: MESSENGER_ERROR.description_required,
                            maxLength: { value: 255, message: MESSENGER_ERROR.description_maxLength }
                        })} type="text" className="form-control form-control-sm" id="description" placeholder="Nhập mô tả" name="description" autoComplete="off" />
                        <div className="invalid-feedback d-block">{errors.description && errors.description.message}</div>
                    </div>
                    <div className="input-group">
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={handleClickClear}>Reset</button>
                        </div>
                        <div className="custom-file">
                            <input ref={register({
                                required: MESSENGER_ERROR.imageList_required
                            })} type="file" className="custom-file-input" id="imageList" name="imageList" multiple accept="image/*" formEncType="multipart/form-data" />
                            <label className="custom-file-label" htmlFor="imageList">Choose file ...</label>
                        </div>
                        <div className="invalid-feedback d-block">{errors.imageList && errors.imageList.message}</div>
                    </div>
                    <div id="boxImg" className="form-group">
                        <div id="image_holder" className="d-flex justify-content-start align-items-center flex-wrap"></div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-sm btn-primary w-100">Đăng bài</button>
                    </div>
                </form>
            </div>
        </fieldset>
    </>)
}