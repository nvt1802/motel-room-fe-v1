import React, { } from 'react'

export default function SearchCommon(props) {

    const renderOptionProvince = () => {
        var elements = props.search.province.map((value, index) => {
            return <option value={value.provinceId} key={index}>{value.provinceName}</option>
        })
        return elements
    }

    const renderOptionDistrict = () => {
        var elements = props.search.district.map((value, index) => {
            return <option value={value.districtId} key={index}>{value.districtName}</option>
        })
        return elements
    }

    const handleProvinceChange = (e) => {
        document.getElementById('district').value = -1
        props.getDistrictByProvinceId(e.target.value)
    }

    const handleDistrictChange = (e) => {
        props.setDistrictId(parseInt(e.target.value))
    }

    return <>
        <div className="row">
            <div className="form-group col-12">
                {props.search.province &&
                    <select onChange={handleProvinceChange} name="province" id="province" className="form-control form-control-sm cursor border-radius-45">
                        <option value={-1}>Chọn Tỉnh/Thành phố</option>
                        {renderOptionProvince()}
                    </select>
                }
            </div>
        </div>
        <div className="row">
            <div className="form-group col-12">
                {
                    <select onChange={handleDistrictChange} defaultValue={-1} name="district" id="district" className="form-control form-control-sm cursor border-radius-45">
                        <option value={-1}>Chọn Quận/Huyện</option>
                        {renderOptionDistrict()}
                    </select>
                }
            </div>
        </div>
    </>
}