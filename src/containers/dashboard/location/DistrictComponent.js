import React, { useState, useEffect } from 'react'
import DistrictAPI from '../../../api/DistrictAPI'
import { MESSENGER_ERROR } from '../../../common/Constant'

export default function District(props) {

    const [district, setDistrict] = useState(null)

    useEffect(() => {
        getDistrictByProvinceId(props.provinceId)
        return () => { }
    }, [props])

    const getDistrictByProvinceId = (provinceId) => {
        DistrictAPI.findDistrictByProvinceId(provinceId).then((res) => {
            setDistrict(res.data)
        })
    }

    const renderOptionDistrict = () => {
        var elements = district.map((value, index) => {
            return <option value={value.districtId} key={index}>{value.districtName}</option>
        })
        return elements
    }

    const districtChange = (e) => {
        props.setDistrictId(e.target.value)
    }

    return (<>
        {district && <select ref={props.register({
            required: MESSENGER_ERROR.district_required,
            validate: value => (parseInt(value) === -1 ? false : true) || MESSENGER_ERROR.district_required
        })} onChange={districtChange} defaultValue={props.districtIdDefault} className="form-control" id="district" placeholder="Quận/Huyện" name="district">
            <option value={-1}>Chọn Quận/Huyện</option>
            {renderOptionDistrict()}
        </select>}
        <div className="invalid-feedback d-block">{props.errors.district && props.errors.district.message}</div>
    </>)
}