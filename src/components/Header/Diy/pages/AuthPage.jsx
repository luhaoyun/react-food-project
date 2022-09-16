import React, { useRef } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation, useRegisterMutation } from '../store/authApi'
import { login } from '../store/authReducer'

const AuthPage = () => {
  // 引入注册的api
  const [register, { error: regError }] = useRegisterMutation()
  const [loginFn, { error: loginError }] = useLoginMutation()
  // const [isEdit, setIsEdit] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(false)
  const usernameRef = useRef()
  const passwordRef = useRef()
  const emailRef = useRef()

  // 获取react-redux中的dispatch钩子
  const dispatch = useDispatch()

  const navigate = useNavigate()



  const submitHandler = (e) => {
    e.preventDefault();

    // 获取用户输入的对象
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (isLoginForm) {
      console.log(username, password)
      loginFn({
        identifier: username,
        password
      }).then(res => {
        if (!res.error) {
          dispatch(login({
            token: res.data.jwt,
            user: res.data.user
          }))
          console.log('登录成功')
          // 登陆成功后，跳转页面到根目录
          navigate('/foods', {repalce:true})
        }
      })
    } else {
      const email = emailRef.current.value;
      console.log(username, password, email)
      register({
        username,
        password,
        email
      }).then(res => {
        if (!res.error) {

          // 注册成功
          setIsLoginForm(true);
        }
      }, err => { console.log(err.message) });
    }
  }


  return (
    <div>

      {regError && <p style={{ color: 'red' }}>用户名或电子邮件重复</p> }
      
      {loginError && '用户名或密码错误'}
      <h2>{isLoginForm ? '登录' : '注册'}</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input ref={usernameRef} type="text" placeholder={'用户名'} />
        </div>
        <div>
          <input ref={passwordRef} type="password" placeholder={'密码'} />
        </div>
        {isLoginForm ?
          null :
          <div>
            <input ref={emailRef} type="email" placeholder={'邮箱'} />
          </div>}

        <div>
          {isLoginForm ? <button>登录</button> : <button>注册</button>}
          <br />
          <a href='#'
            onClick={e => {
              e.preventDefault();
              setIsLoginForm(prevState => !prevState)
            }}>
            {isLoginForm ? '没有账号，申请注册' : '已有账号，点击登录'}
          </a>
        </div>


      </form>
    </div>
  )
}


export default AuthPage