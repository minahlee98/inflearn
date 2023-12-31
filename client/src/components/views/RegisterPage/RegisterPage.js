import React , { useState }  from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_action/user_action';
import { useNavigate } from 'react-router-dom';

function RegisterPage(props) {

    const dispatch= useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const navigate = useNavigate();
    const onSubmitHandler = (event) => {
        event.preventDefault(); //인거안하면 클릭할때마다 페이지 리프레쉬됨

        if(Password !== ConfirmPassword){
            return alert('비밀번호가 일치하지 않습니다.')
        }

        let body = {
            email: Email,
            name : Name,
            password : Password
        }
       
        dispatch(registerUser(body))
            .then(response => {
               
                if(response.payload.success){
                    
                    navigate('/login')
                }else{
                    alert('회원가입에 실패했습니다')
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
            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHandler} />
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />
            <label>Confirm Password</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
            <br />
            <button type="submit">
                회원가입
            </button>
          </form>
        </div>
    );
}

export default RegisterPage;