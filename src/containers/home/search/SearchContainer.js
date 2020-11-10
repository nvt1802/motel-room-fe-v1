import { connect } from 'react-redux'
import Search from '../../../components/home/search/SearchComponent'
import { locationAction, searchAction, criteriaAction } from '../../../store/actions/index'

const mapStateToProps = state => ({
    search: state.search,
    criteria: state.criteria
})

const mapDispatchToProps = dispatch => ({
    initProvince: (province) => dispatch(locationAction.initListProvince(province)),
    initDistrictByProvinceId: (district, provinceId) => {
        dispatch(searchAction.setProvinceId(provinceId))
        dispatch(searchAction.setDistrictId(-1))
        dispatch(searchAction.initListDistrict(district))
    },
    initCriteria: (listCriteria) => dispatch(criteriaAction.initListCriteria(listCriteria)),
    setPrice: (price) => dispatch(searchAction.setPrice(price)),
    setAcreage: (acreage) => dispatch(searchAction.setAcreage(acreage)),
    setListCriteriaId: (listCriteriaId) => dispatch(searchAction.setListCriteriaId(listCriteriaId)),
    setDistrictId: (districtId) => {
        dispatch(searchAction.setDistrictId(districtId))
    },
    setOptionAdvance: (optionAdvance) => dispatch(searchAction.setOptionAdvance(optionAdvance))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
