import React, { useEffect, useState } from 'react'
import AccountAPI from '../../../api/AccountAPI'
import DistrictAPI from '../../../api/DistrictAPI'
import ProvinceAPI from '../../../api/ProvinceAPI'
import { useParams } from 'react-router-dom'
import Forbidden from '../../layout/Forbidden'

export default function ViewAccount(props) {
    let { accountId } = useParams()
    const [account, setAccount] = useState({})
    const [provinceName, setProvinceName] = useState('')
    const [districtName, setDistrictName] = useState('')
    const [loadPageError, setLoadPageError] = useState(false)

    useEffect(() => {
        AccountAPI.findAccountByAccountId(accountId).then(res => {
            ProvinceAPI.findProvinceById(res.data.provinceId).then(res => { setProvinceName(res.data.provinceName) })
            DistrictAPI.findDistrictByDistrictId(res.data.districtId).then(res => { setDistrictName(res.data.districtName) })
            setAccount(res.data)
        }).catch(err => {
            setLoadPageError(true)
        })
    }, [accountId, props])

    return (<>
        {!loadPageError &&
            <fieldset style={{ border: '1px black solid' }}>
                <legend style={{ width: 'unset' }} className="text-center text-primary font-weight-bold">Thông tin tài khoản</legend>
                <table className="table table-sm table-bordered table-hover mb-0">
                    <tbody>
                        <tr>
                            <td className="field">Tên tài khoản :</td>
                            <td>{account.userName}</td>
                        </tr>
                        <tr>
                            <td className="field">Họ tên :</td>
                            <td>{account.name}</td>
                        </tr>
                        <tr>
                            <td className="field">Ngày sinh :</td>
                            <td>{account.birthday}</td>
                        </tr>
                        <tr>
                            <td className="field">Giới tính :</td>
                            <td>{account.gender === 1 ? 'Nam' : 'Nữ'}</td>
                        </tr>
                        <tr>
                            <td className="field">Email :</td>
                            <td>{account.email}</td>
                        </tr>
                        <tr>
                            <td className="field">Số điện thoại :</td>
                            <td>{account.phone}</td>
                        </tr>
                        <tr>
                            <td className="field">Thành phố :</td>
                            <td>{provinceName}</td>
                        </tr>
                        <tr>
                            <td className="field">Quận/Huyện/Thị xã :</td>
                            <td>{districtName}</td>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
        }
        {loadPageError && <Forbidden />}
    </>)
}