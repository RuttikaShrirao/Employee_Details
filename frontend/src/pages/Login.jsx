import * as React from 'react';
import { useState,useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const[loginInfo, setLoginInfo] = useState({
    email:'',
    password:''
})
const [msg, setMsg]=useState('')  
const [token, setToken] = useState('');
const [showPassword, setShowPassword] = React.useState(false);


// passwoord 
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

// navigate
    const navigate = useNavigate()
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setToken(token);
      }
    }, []);

    const loginHandler=()=>{
  
      fetch('http://localhost:3000/login',
      {
          method:'POST',
          body:JSON.stringify({email:loginInfo.email, password:loginInfo.password}),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
      }
      )

      .then(res=>res.json())
    .then(data=>{
      localStorage.setItem('token',data.token)
      if(data.status_code==200){
        navigate('/home')
      }
      setMsg(data.msg)
    })     
    }

    const loginEmail=(e)=>{
      setLoginInfo({...loginInfo,email:(e.target.value)})
    }
    
    const loginPassword=(e)=>{
      setLoginInfo({...loginInfo,password:(e.target.value)})
    }

  return (
  <div className='form'>
  <TextField id="demo-helper-text-misaligned-no-helper" type="email" onChange={loginEmail} required label="Email" />
      {/* <input type="email" onChange={loginEmail} required placeholder="Email" />
      <input type="password" onChange={loginPassword} required placeholder="Password" /> */}
      <FormControl sx={{ mt: 2, mb: 4, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            onChange={loginPassword}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

      {/* <button onClick={loginHandler}>login</button> */}
      <Button variant="contained" onClick={loginHandler}>Login</Button>
      <p>{msg}</p>
     <p>Don't have account? </p>
     <a onClick={()=>{navigate('/registration')}}>sign up</a>
    </div>
  );
}
