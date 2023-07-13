import React, { useState } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_action/user_action';
import { useNavigate } from 'react-router-dom';



function LoginPage(props) {
    const dispatch= useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const navigate = useNavigate();
    const onSubmitHandler = (event) => {
        event.preventDefault(); //인거안하면 클릭할때마다 페이지 리프레쉬됨
        let body = {
            email: Email,
            password : Password
        }
       
        dispatch(loginUser(body))
            .then(response => {
               
                if(response.payload.loginSuccess){
                    
                    navigate('/')
                }else{
                    alert('Error')
                }
            })

     
    }

    return (
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'
        , width:'100%', height:'100vh'}}>
          
          
          <form style={{display:'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}
          >
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />
            <br />
            <button type="submit">
                Login
            </button>
          </form>
        </div>
    );
}

export default LoginPage;