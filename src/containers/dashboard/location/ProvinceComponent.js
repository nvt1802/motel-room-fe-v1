import React, { useState, useEffect } from 'react'
import ProvinceAPI from '../../../api/ProvinceAPI'
import { MESSENGER_ERROR } from '../../../common/Constant'

export default function Province(props) {

    const [province, setProvince] = useState(null)

    useEffect(() => {
        getProvince()
        return () => { }
    }, [props])

    const getProvince = () => {
        ProvinceAPI.findAll().then((res) => {
            setProvince(res.data)
        })
    }

    const provinceChange = (e) => {
        props.setProvinceId(e.target.value)
    }

    const renderOptionProvince = () => {
        var elements = province.map((value, index) => {
            return <option value={value.provinceId} key={index} >{value.provinceName}</option>
        })
        return elements
    }

    return (<>
        {province && <select ref={props.register({
            required: MESSENGER_ERROR.province_required,
            validate: value => (parseInt(value) === -1 ? false : true) || MESSENGER_ERROR.province_required
        })} onChange={provinceChange} defaultValue={props.provinceIdDefault} className="form-control" id="province" placeholder="Tỉnh/Thành phố" name="province">
            <option value={-1}>Chọn Tỉnh/Thành phố</option>
            {renderOptionProvince()}
        </select>}
        <div className="invalid-feedback d-block">{props.errors.province && props.errors.province.message}</div>
    </>)
}