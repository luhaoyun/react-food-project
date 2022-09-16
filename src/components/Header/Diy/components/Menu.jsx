import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/authReducer'
import './menu.css'
const Menu = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    return (
        <header>
            <ul style={{ listStyle: "none" }}>
                <li>
                    <Link to={'/'}>首页</Link>
                </li>
                {!auth.isLogged && <li><Link to={'users'}>登录/注册</Link></li>}
                {auth.isLogged &&
                    <>
                        <li><Link to={'foods'}>食品列表</Link></li>
                        <li><Link to={'/'} onClick={()=>dispatch(logout())}>登出</Link></li>
                    </>
                }
            </ul>
        </header>
    )
}

export default Menu
