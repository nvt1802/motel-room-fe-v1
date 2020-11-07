import React, { useEffect } from 'react'

export default function SearchCommon(props) {

    const renderOptionProvince = () => {
        var elements = props.province.map((value, index) => {
            return <option value={value.provinceId} key={index}>{value.provinceName}</option>
        })
        return elements
    }

    const renderOptionDistrict = () => {
        var elements = props.district.map((value, index) => {
            return <option value={value.districtId} key={index}>{value.districtName}</option>
        })
        return elements
    }

    const handleProvinceChange = (e) => {
        props.getDistrictByProvinceId(e.target.value)
    }

    const handleDistrictChange = (e) => {
        props.setDistrictId(e.target.value)
    }

    useEffect(() => {
        // props.getProvince()
    }, [props])

    return <>
        <div className="row">
            <div className="form-group col-12">
                {props.province &&
                    <select onChange={handleProvinceChange} defaultValue={props.provinceId} name="province" id="province" className="form-control form-control-sm cursor border-radius-45">
                        <option value={-1}>Chọn Tỉnh/Thành phố</option>
                        {renderOptionProvince()}
                    </select>
                }
            </div>
        </div>
        <div className="row">
            <div className="form-group col-12">
                {props.district && props.district.length === 0 &&
                    <select onChange={handleDistrictChange} defaultValue={props.districtId} name="district" id="district" className="form-control form-control-sm cursor border-radius-45">
                        <option value={-1}>Chọn Quận/Huyện</option>
                        {renderOptionDistrict()}
                    </select>
                }
                {props.district && props.district.length > 0 &&
                    <select onChange={handleDistrictChange} defaultValue={props.districtId} name="district" id="district" className="form-control form-control-sm cursor border-radius-45">
                        <option value={-1}>Chọn Quận/Huyện</option>
                        {renderOptionDistrict()}
                    </select>
                }
            </div>
        </div>
    </>
}