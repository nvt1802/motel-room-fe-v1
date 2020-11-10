import React, { useEffect } from 'react'
import '../../../assets/style/search.css'
import SearchCommon from './SearchCommon/SearchCommonComponent'
import SearchAdvance from './searchAdvance/SearchAdvanceComponent'
import ProvinceAPI from '../../../api/ProvinceAPI'
import DistrictAPI from '../../../api/DistrictAPI'
import CriteriaAPI from '../../../api/CriteriaAPI'

export default function Search(props) {

    useEffect(() => {
        if (props.search.province.length === 0) {
            ProvinceAPI.findAll().then(res => {
                props.initProvince(res.data)
            }).catch(err => { })
        }
        if(props.criteria.length === 0){
            CriteriaAPI.findAll().then(res => {
                props.initCriteria(res.data)
            }).catch(err => { })
        }
    }, [props])

    const getDistrictByProvinceId = (provinceId, districtId) => {
        DistrictAPI.findDistrictByProvinceId(provinceId).then(res => {
            props.initDistrictByProvinceId(res.data, parseInt(provinceId), parseInt(districtId))
        }).catch(err => { })
    }

    const handleChangeOptionAdvance = (e) => {
        props.setOptionAdvance(!props.search.optionAdvance)
    }

    return (<div id="bg-search">
        <div id="menu-search">
            <form id="form-search" method="get" action="/">
                <div id="accordion" className="w-100">
                    <div className="card w-100 shadow p-3" style={{ borderRadius: '15px' }}>
                        <SearchCommon search={props.search} getDistrictByProvinceId={getDistrictByProvinceId} setDistrictId={props.setDistrictId} />
                        <div id="accordianId" role="tablist" aria-multiselectable="true">
                            <SearchAdvance {...props} />
                            <center className="mt-3 mb-3">
                                <button className="btn btn-sm my-btn-primary w-100">Tìm kiếm</button>
                            </center>
                            <a id="optionAdvance" onClick={handleChangeOptionAdvance} data-toggle="collapse" data-parent="#accordianId" href="#sectionContentId" style={{ fontWeight: 'normal', fontSize: '12px', float: 'right' }} aria-expanded="true" aria-controls="sectionContentId">
                                { } ∇
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}