import React, { useState, useEffect } from 'react'
import CriteriaAPI from '../../../../api/CriteriaAPI'

export default function Criteria(props) {

    const [criteria, setCriteria] = useState([])

    const handleCriteriaClick = (e) => {
        let myListCriteria = new Set()
        myListCriteria = props.listCriteria
        if (myListCriteria.has(e.target.value)) {
            myListCriteria.delete(e.target.value)
        } else {
            myListCriteria.add(e.target.value)
        }
        props.setListCriteria(myListCriteria)
    }

    const renderCriteria = () => {
        var elements = criteria.map((value, index) => {
            return (<div key={index} className="form-group col-sm-12 col-md-6">
                <label className="my-checkbox-container"> {'Có ' + value.criteriaName}
                    {props.listCriteria.has(value.criteriaId.toString()) === true ? (
                        <input onClick={handleCriteriaClick} defaultChecked id={value.criteriaId} defaultValue={value.criteriaId} type="checkbox" name={value.criteriaId} />
                    ) : (
                            <input onClick={handleCriteriaClick} id={value.criteriaId} defaultValue={value.criteriaId} type="checkbox" name={value.criteriaId} />
                        )}
                    <span className="checkmark" />
                </label>
            </div>)
        })
        return elements
    }

    useEffect(() => {
        CriteriaAPI.findAll().then(res => {
            setCriteria(res.data)
        })
    }, [])
    return <>
        {/* {renderCriteria()} */}
    </>
}