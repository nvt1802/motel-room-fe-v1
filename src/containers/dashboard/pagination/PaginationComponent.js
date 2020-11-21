import React, { useState, useEffect } from 'react'

export default function Pagination(props) {
    const [active, setActive] = useState(0)

    const renderPage = () => {
        let arr = []
        for (let i = 0; i < props.totalPages; i++) {
            arr.push(i)
        }
        var elements = arr.map((value, index) => {
            return <li className={active === index ? "page-item active" : 'page-item'} key={index} onClick={handleClickPage}>
                <a id={index} className="page-link" href="/">{index + 1}</a>
            </li>
        })
        return elements
    }

    const handleClickPage = (e) => {
        e.preventDefault()
        props.handleClickPagination(e.target.id)
        setActive(parseInt(e.target.id))
    }

    useEffect(() => {
        if (props.deleted) {
            setActive(0)
        }
    }, [props])

    return <>
        <div className="d-flex justify-content-end">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {props.totalPages !== 0 ? (
                        <li className="page-item">
                            <a onClick={handleClickPage} id="0" className="page-link" href="/" aria-label="Previous">
                                <span onClick={handleClickPage} id="0" aria-hidden="true">«</span>
                            </a>
                        </li>
                    ) : null}
                    {renderPage()}
                    {props.totalPages !== 0 ? (
                        <li className="page-item">
                            <a onClick={handleClickPage} id={props.totalPages - 1} className="page-link" href="/" aria-label="Next">
                                <span onClick={handleClickPage} id={props.totalPages - 1} aria-hidden="true">»</span>
                            </a>
                        </li>
                    ) : null}
                    {props.totalPages === 0 ? '' : ''}
                </ul>
            </nav>
        </div>
    </>
}