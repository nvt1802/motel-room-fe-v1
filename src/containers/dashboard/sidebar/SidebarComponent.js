import React from 'react'
import { Link } from 'react-router-dom'
import { URL_AVATAR } from '../../../common/Constant'
import '../../../assets/style/dashboard.css'

function Sidebar(props) {

    const handleClick = (e) => {
        let listE = document.getElementsByTagName('a')
        for (let i = 0; i < listE.length; i++) {
            listE[i].classList.remove('active')
        }
        props.setActive(parseInt(e.target.id))
    }

    return (<>
        <div className="sidebar responsive-lg" role="navigation">
            <div className="sidebar-nav">
                <ul className="nav flex-column" id="side-menu">
                    <li className="nav-item sidebar-search">
                        <div className="input-group custom-search-form d-flex justify-content-center">
                            <div style={{
                                width: '140px',
                                height: '140px',
                                backgroundImage: `url("${URL_AVATAR}")`,
                                backgroundPosition: 'top',
                                backgroundSize: 'cover',
                                borderRadius: '50%'
                            }}>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link id='0' onClick={handleClick} to={"/dashboard"} className={props.pathname === '/dashboard' ? 'active' : '' || props.active === 0 ? 'active' : ''}><i className="fa fa-dashboard fa-fw" /> Dashboard</Link>
                    </li>
                    {props.account.role === 1 ? (<>
                        <li className="nav-item">
                            <Link id='1' onClick={handleClick} to={"/dashboard/account"} className={props.pathname === '/dashboard/account' ? 'active' : '' || props.active === 1 ? 'active' : ''}><i className="fa fa-user fa-fw" /> Quản lý tài khoản</Link>
                        </li>
                        <li className="nav-item">
                            <Link id='2' onClick={handleClick} to={"/dashboard/criteria"} className={props.pathname === '/dashboard/criteria' ? 'active' : '' || props.active === 2 ? 'active' : ''}><i className="fa fa-search fa-fw" /> Quản lý tiêu chí</Link>
                        </li>
                    </>) : null}
                    {props.account.role === 1 ? (
                        <li className="nav-item">
                            <Link id='3' onClick={handleClick} to={"/dashboard/postManagement"} className={props.pathname === '/dashboard/postManagement' ? 'active' : '' || props.active === 3 ? 'active' : ''}><i className="fa fa-clipboard fa-fw" /> Quản lý bài viết</Link>
                        </li>
                    ) : (
                            <li className="nav-item">
                                <a data-toggle="collapse" href="#post" aria-expanded="false" aria-controls="collapseExample">
                                    <i className="fa fa-clipboard fa-fw" /> Quản lý bài viết<span className="fa arrow" />
                                </a>
                                <ul className="collapse nav-second-level" id="post">
                                    <li className="nav-item">
                                        <Link id='3' onClick={handleClick} to={"/dashboard/createPost"} className={props.pathname === '/dashboard/createPost' ? 'active' : '' || props.active === 3 ? 'active' : ''}><i className="fa fa-edit fa-fw" /> Đăng bài viết</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link id='4' onClick={handleClick} to={"/dashboard/myPost"} className={props.pathname === '/dashboard/myPost' ? 'active' : '' || props.active === 4 ? 'active' : ''}><i className="fa fa-list fa-fw" /> Danh sách bài viết</Link>
                                    </li>
                                </ul>
                            </li>
                        )}
                    {props.account.role === 2 &&
                        <li className="nav-item">
                            <a data-toggle="collapse" href="#roomSideBar" aria-expanded="false" aria-controls="collapseExample">
                                <i className="fa fa-home" /> Quản lý phòng trọ<span className="fa arrow" />
                            </a>
                            <ul className="collapse nav-second-level" id="roomSideBar">
                                <li className="nav-item">
                                    <Link id='5' onClick={handleClick} to={"/dashboard/createRoom"} className={props.pathname === '/dashboard/createRoom' ? 'active' : '' || props.active === 5 ? 'active' : ''}><i className="fa fa-edit fa-fw" /> Tạo mới</Link>
                                </li>
                                <li className="nav-item">
                                    <Link id='6' onClick={handleClick} to={"/dashboard/room"} className={props.pathname === '/dashboard/room' ? 'active' : '' || props.active === 6 ? 'active' : ''}><i className="fa fa-list fa-fw" /> Danh sách phòng</Link>
                                </li>
                            </ul>
                        </li>
                    }
                    <li className="nav-item">
                        <a data-toggle="collapse" href="#secondLevel" aria-expanded="false" aria-controls="collapseExample">
                            <i className="fa fa-user-circle fa-fw" /> Thông tin cá nhân<span className="fa arrow" />
                        </a>
                        <ul className="collapse nav-second-level" id="secondLevel">
                            <li className="nav-item">
                                <Link id='7' onClick={handleClick} to={"/dashboard/info"} className={props.pathname === '/dashboard/info' ? 'active' : '' || props.active === 7 ? 'active' : ''}><i className="fa fa-info-circle" /> Chỉnh sửa thông tin</Link>
                            </li>
                            <li className="nav-item">
                                <Link id='8' onClick={handleClick} to={"/dashboard/changePassword"} className={props.pathname === '/dashboard/changePassword' ? 'active' : '' || props.active === 8 ? 'active' : ''}><i className="fa fa-key fa-fw" /> Đổi mật khẩu</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div className="sidebar responsive-sm" role="navigation" style={{ width: '45px' }}>
            <div className="sidebar-nav">
                <ul className="nav flex-column" id="side-menu">
                    <li className="nav-item">
                        <Link id='11' onClick={handleClick} to={"/dashboard"} className={props.pathname === '/dashboard' ? 'active' : '' || props.active === 11 ? 'active' : ''}><i id='11' onClick={handleClick} className="fa fa-dashboard fa-fw" /></Link>
                    </li>
                    {props.account.role === 1 ? (<>
                        <li className="nav-item">
                            <Link id='12' onClick={handleClick} to={"/dashboard/account"} className={props.pathname === '/dashboard/account' ? 'active' : '' || props.active === 12 ? 'active' : ''}><i id='12' onClick={handleClick} className="fa fa-user fa-fw" /></Link>
                        </li>
                        <li className="nav-item">
                            <Link id='13' onClick={handleClick} to={"/dashboard/criteria"} className={props.pathname === '/dashboard/criteria' ? 'active' : '' || props.active === 13 ? 'active' : ''}><i id='13' onClick={handleClick} className="fa fa-search fa-fw" /></Link>
                        </li>
                    </>) : null}
                    {props.account.role === 1 ? (
                        <li className="nav-item">
                            <Link id='3' style={{ padding: '5px 5px 5px 15px' }} onClick={handleClick} to={"/dashboard/postManagement"} className={props.pathname === '/dashboard/postManagement' ? 'active' : '' || props.active === 3 ? 'active' : ''}><i className="fa fa-clipboard fa-fw" /></Link>
                        </li>
                    ) : (
                            <li className="nav-item">
                                <a data-toggle="collapse" href="#post" aria-expanded="false" aria-controls="collapseExample">
                                    <i className="fa fa-clipboard fa-fw" />
                                </a>
                                <ul className="collapse nav-second-level" id="post">
                                    <li className="nav-item">
                                        <Link id='14' style={{ padding: '5px 5px 5px 15px' }} onClick={handleClick} to={"/dashboard/createPost"} className={props.pathname === '/dashboard/createPost' ? 'active' : '' || props.active === 14 ? 'active' : ''}><i id='14' onClick={handleClick} className="fa fa-edit fa-fw" /></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link id='15' style={{ padding: '5px 5px 5px 15px' }} onClick={handleClick} to={"/dashboard/myPost"} className={props.pathname === '/dashboard/myPost' ? 'active' : '' || props.active === 15 ? 'active' : ''}><i id='15' onClick={handleClick} className="fa fa-list fa-fw" /></Link>
                                    </li>
                                </ul>
                            </li>
                        )
                    }
                    {props.account.role === 2 &&
                        <li className="nav-item">
                            <a data-toggle="collapse" href="#room" aria-expanded="false" aria-controls="collapseExample">
                                <i className="fa fa-home" />
                            </a>
                            <ul className="collapse nav-second-level" id="room">
                                <li className="nav-item">
                                    <Link id='16' style={{ padding: '5px 5px 5px 15px' }} onClick={handleClick} to={"/dashboard/createRoom"} className={props.pathname === '/dashboard/createRoom' ? 'active' : '' || props.active === 16 ? 'active' : ''}><i id='14' onClick={handleClick} className="fa fa-edit fa-fw" /></Link>
                                </li>
                                <li className="nav-item">
                                    <Link id='17' style={{ padding: '5px 5px 5px 15px' }} onClick={handleClick} to={"/dashboard/room"} className={props.pathname === '/dashboard/room' ? 'active' : '' || props.active === 17 ? 'active' : ''}><i id='15' onClick={handleClick} className="fa fa-list fa-fw" /></Link>
                                </li>
                            </ul>
                        </li>
                    }
                    <li className="nav-item">
                        <a data-toggle="collapse" href="#secondLevel" aria-expanded="false" aria-controls="collapseExample">
                            <i className="fa fa-user-circle fa-fw" />
                        </a>
                        <ul className="collapse nav-second-level" id="secondLevel">
                            <li className="nav-item">
                                <Link id='18' style={{ padding: '5px 5px 5px 15px' }} onClick={handleClick} to={"/dashboard/info"} className={props.pathname === '/dashboard/info' ? 'active' : '' || props.active === 18 ? 'active' : ''}><i id='16' onClick={handleClick} className="fa fa-info-circle" /></Link>
                            </li>
                            <li className="nav-item">
                                <Link id='19' style={{ padding: '5px 5px 5px 15px' }} onClick={handleClick} to={"/dashboard/changePassword"} className={props.pathname === '/dashboard/changePassword' ? 'active' : '' || props.active === 19 ? 'active' : ''}><i id='17' onClick={handleClick} className="fa fa-key fa-fw" /></Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </>)
}
export default Sidebar