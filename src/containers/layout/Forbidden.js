import React from 'react'
import '../../assets/style/layout/notFound.css'

export default function Forbidden() {
    return (
        <div className="container" id="notFound">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h2>403 Forbidden</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}