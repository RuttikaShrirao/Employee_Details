import * as React from 'react';
import { useState } from "react";
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

export default function Registration() {
  const[registrationInfo, setRegistrationInfo] = useState({
                                                              email:'',
                                                              password:''
                                                          })
    const [msg, setMsg]=useState('') 
    const [showPassword, setShowPassword] = React.useState(false);
    
// passwoord 
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

// navigate
    const navigate = useNavigate()

    const registrationHandler=()=>{
      fetch('http://localhost:3000/registration',
      {
          method:'POST',
          body:JSON.stringify({email:registrationInfo.email,password:registrationInfo.password}),
          headers: {
            'Content-Type': 'application/json'
          }
      }
      )

      .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setMsg(data.msg)
      if(data.status==200){
        navigate('/')
      }
    })     
    }

    const registredEmail=(e)=>{
      setRegistrationInfo({...registrationInfo,email:(e.target.value)})
    }
    
    const registredPassword=(e)=>{
      setRegistrationInfo({...registrationInfo,password:(e.target.value)})
    }

  return (
    <div className='form'>
   <TextField id="demo-helper-text-misaligned-no-helper" type="email" onChange={registredEmail} required label="Email" />
      {/* <input type="email" required onChange={registredEmail} placeholder="Email" /> */}
      {/* <input type="password" required onChange={registredPassword} placeholder="Password" /> */}
      <FormControl sx={{ mt: 2, mb: 4, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            onChange={registredPassword}
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
        <Button variant="contained" onClick={registrationHandler}>registration</Button>
      {/* <button onClick={registrationHandler}>registration</button> */}
     <p>{msg}</p>
     </div>
  );
}
