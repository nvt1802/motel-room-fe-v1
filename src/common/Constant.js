export const API_URL = 'http://localhost:8080' // 'http://192.168.5.9:8080'
export const URL_AVATAR = 'https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png'
export const URL_IMAGE = 'http://localhost:8080/api/image'
export const PAGE_SIZE_DISCOVER = 4
export const PAGE_SIZE = 5
export const GENDER_MALE = 1
export const ROLE_ADMIN = 1
export const ROLE_USER = 2
export const USER_NAME_SESSION = 'authenticatedUser'
export const JWT_AUTH_HEADER = 'jwtAuthHeader'
export const MESSENGER_ERROR = {
    username: 'Tên tài khoản không chính xác.',
    password: 'Mật khẩu không chính xác.',
    account_locked: 'Tài khoản đã bị khoá',
    username_exist: 'Tên tài khoản đã được sử dụng.',
    username_required: 'Vui lòng nhập tên tài khoản.',
    password_required: 'Vui lòng nhập mật khẩu.',
    password_confirm: 'Mật khẩu xác nhận không khớp.',
    name_required: 'Vui lòng nhập họ tên.',
    name_maxLength: 'Họ tên không được vượt quá 150 ký tự.',
    birthday_required: 'Vui lòng nhập ngày sinh.',
    email_required: 'Vui lòng nhập email.',
    gender_required: 'Vui lòng chọn giới tính.',
    phone_required: 'Vui lòng nhập số điện thoại.',
    role_required: 'Vui lòng chọn vai trò.',
    province_required: 'Vui lòng chọn Tỉnh/Thành phố.',
    district_required: 'Vui lòng chọn Quận/Huyện.',
    email_valid: 'Email không đúng định dạng.',
    birthday_valid: 'Ngày sinh không đúng định dạng.',
    phone_valid: 'Số điện thoại không đúng định dạng.',
    ward_required: 'Vui lòng chọn Phường/Xã',
    motelName_required: 'Vui lòng nhập tên phòng.',
    motelName_maxLength: 'Tiêu đề không được vượt quá 100 ký tự.',
    acreage_required: 'Vui lòng nhập diện tích.',
    acreage_min: 'Diện tích không được nhỏ hơn 1.',
    acreage_max: 'Diện tích không được lớn hơn 40.',
    price_required: 'Vui lòng nhập giá thuê.',
    price_min: 'Giá thuê không được nhỏ hơn 100.000 đ.',
    price_max: 'Giá thuê không được lớn hơn 3.500.000 đ.',
    maxPeople_required: 'Vui lòng nhập số người ở tối đa.',
    maxPeople_min: 'Số người ở tối đa không được nhỏ hơn 1.',
    maxPeople_max: 'Số người ở tối đa không được lớn hơn 5.',
    address_required: 'Vui lòng nhập địa chỉ.',
    address_maxLength: 'Địa chỉ không được vượt quá 100 ký tự..',
    room_required: 'Vui lòng chọn phòng.',
    postTitle_required: 'Vui lòng nhập tiêu đề bài viết.',
    postTitle_maxLength: 'Tiêu đề không được vượt quá 255 ký tự.',
    description_required: 'Vui lòng nhập mô tả.',
    description_maxLength: 'Mô tả không được vượt quá 255 ký tự.',
    imageList_required: 'Vui lòng chọn ít nhất một ảnh.',
    criteria_required: 'Vui lòng chọn ít nhất một tiêu chí.',
}