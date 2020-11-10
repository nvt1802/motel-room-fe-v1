import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import Login from '../../components/home/LoginComponent'
import { authenticate } from '../../store/actions/index'
import AuthService from '../../auth/AuthenticationService'
import AccountAPI from '../../api/AccountAPI'
import { MESSENGER_ERROR } from "../../common/Constant"

function LoginContainer(props) {
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

    return <Login
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
    />
}

const mapDispatchToProps = dispatch => ({
    initAuthenticate: (account) => dispatch(authenticate.initAuthenticate(account, true))
})

export default connect(null, mapDispatchToProps)(LoginContainer)
