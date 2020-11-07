import React from 'react'
import '../../assets/style/layout/footer.css'

function Footer(props) {
    if (props.currentPath !== '/dashboard') {
        return (
            <footer className="footer-area pt-5">
                <div className="footer-logo mb-100">
                    <span style={{ fontSize: '40px', fontWeight: 600, backgroundColor: 'white', paddingLeft: '10px', paddingRight: '10px' }}>
                        <span style={{ color: 'red' }}>M</span>otel <span style={{ color: 'red' }}>R</span>oom
              </span>
                </div>
                <div className="container">
                    <div className="row" style={{ marginBottom: '0px' }}>
                        <div className="col-12">
                            <div className="footer-content text-center">
                                <p className="copywrite-text"> Copyright © 2020 All rights reserved </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    } else {
        return null
    }
}

export default Footer