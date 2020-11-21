import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { layoutAction } from '../../store/actions/index'

function IndexContainer(props) {

    useEffect(() => {
        if (props.layout.adminPage === true) {
            props.updateLayout(false)
        }
    }, [props])

    return (<>
        {props.children}
    </>
    )
}

const mapStateToProps = state => ({
    layout: state.layout
})


const mapDispatchToProps = dispatch => ({
    updateLayout: value => dispatch(layoutAction.changeLayout(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexContainer)
