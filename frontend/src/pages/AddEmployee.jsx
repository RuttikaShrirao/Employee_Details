import { useEffect, useState } from "react";
// import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddEmployee(){
    const [emplyeeDetails, setEmplyeeDetails] = useState({
                                                        first_name:"",
                                                        salary: undefined
                                                    })
    const [msg, setmsg] = useState("")
            const navigate =useNavigate()
        const frontendToken = localStorage.getItem('token');
useEffect(()=>{
    if(!frontendToken){
        navigate('/')
  
   }
},[])
       

    const url='http://localhost:3000/'

 
        const addEmployee=()=>{
            fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({...emplyeeDetails, salary: parseInt(emplyeeDetails.salary)}),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${frontendToken}` 
                  }
            })         
           .then(res=>{     
            return res.json()
           })
           .then(data=>{
            console.log(data)
            setmsg(data.massege)}
            )
            .catch(error => {
                console.error('Errorrrrrrrrrrr:', error);
                setmsg(error)
              });
        }
       
        function isAlphabetical(inputString) {
            // Regular expression to match only alphabetical characters
            const alphabeticalRegex = /^[a-zA-Z]+$/;
          
            // Test the input string against the regular expression
            return alphabeticalRegex.test(inputString);
          }

    const changeHandler=(e)=>{
    setEmplyeeDetails({...emplyeeDetails, first_name: e.target.value})
    console.log('empp')
    }

    const changeHandlerSalary=(e)=>{
        setEmplyeeDetails({...emplyeeDetails, salary: e.target.value})
        console.log('salary')
        }

    const onSubmit=(e)=>{
        e.preventDefault();
            addEmployee()
            console.log('submit')
    }


// useEffect(() =>{console.log(data,salary) },[data,salary])
    return(
        <form onSubmit={onSubmit} className='form'>
        {/* <Input type='text' changeHandler={changeHandler} placeholder='Enter emp_name'/>    */}
        <TextField id="demo-helper-text-misaligned-no-helper" type="text" onChange={changeHandler} required label="Add Employee" />
        <TextField id="demo-helper-text-misaligned-no-helper" sx={{ mt: 2, mb: 4, width: '25ch' }} variant="standard" type="number"
         onChange={changeHandlerSalary} required label="Salary" />
        {/* <Input  type='number' changeHandler={changeHandlerSalary} placeholder='Enter salary'/>   */}
        <Button   variant="contained"  >add employee</Button>
        <p>{msg}</p>
        </form>
    )
}