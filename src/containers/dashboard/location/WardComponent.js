import React, { useState, useEffect } from 'react'
import WardAPI from '../../../api/WardAPI'
import { MESSENGER_ERROR } from '../../../common/Constant'

export default function Ward(props) {

    const [ward, setWard] = useState(null)

    useEffect(() => {
        getListWard(props.districtId)
        return () => { }
    }, [props])

    const getListWard = (districtId) => {
        WardAPI.findDistrictByDistrictId(districtId).then(res => { setWard(res.data) }).then(err => { })
    }

    const renderOptionWard = () => {
        var elements = ward.map((value, index) => {
            return <option value={value.wardId} key={index}>{value.wardName}</option>
        })
        return elements
    }

    return (<>
        {ward && <select ref={props.register({
            required: MESSENGER_ERROR.ward_required,
            validate: value => (parseInt(value) === -1 ? false : true) || MESSENGER_ERROR.ward_required
        })} defaultValue={props.wardIdDefault} className="form-control form-control-sm" id="ward" placeholder="Enter password" name="ward">
            <option value="-1">Chọn Phường/Xã</option>
            {renderOptionWard()}
        </select>}
        <div className="invalid-feedback d-block mb-2">{props.errors.ward && props.errors.ward.message}</div>
    </>)
}