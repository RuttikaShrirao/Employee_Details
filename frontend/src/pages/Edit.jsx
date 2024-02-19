import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Edit() {
  const [updateInp, setUpdateInp] = useState({
    first_name: "",
    salary: undefined,
  });
  const [updateResp, setUpdateResp] = useState('')
  const params = useParams();
  const navigate= useNavigate()

// token
  const frontendToken = localStorage.getItem('token');

  useEffect(() => {
    const id = params.empid;
    if(!frontendToken){
      navigate('/')

 }

    fetch(`http://localhost:3000/${id}`,
  {headers: {
    'Content-Type': 'application/json',
    'authorization': `Bearer ${frontendToken}`
  }}
    )
      .then((res) => res.json())
      .then((data) => {
        setUpdateInp({
          ...updateInp,
          first_name: data.data.first_name,
          salary: data.data.salary,
        });
      });
  }, []);

  const editHandler=()=>{
    let id= params.empid
  fetch(`http://localhost:3000/${id}`,
  {
    method:'PATCH',
    body:JSON.stringify({...updateInp,first_name:updateInp.first_name ,salary:updateInp.salary}),
    headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${frontendToken}`
      }
  })
  .then((res)=>res.json())
  .then((data) => {
    setUpdateResp(data.msg);
    if (data.status== 200){
        navigate('/home')
    }
  })
  .catch((error)=>{
    setUpdateResp(error)
  })
  }
  const updateHandler = (e) => {
    e.preventDefault()
    editHandler()
  };

  return (
    <form onSubmit={updateHandler} className='form'>
      {/* <input
        value={updateInp.first_name || ""}
        onChange={(e) =>
          setUpdateInp({ ...updateInp, first_name: e.target.value })
        }
      /> */}

<TextField id="demo-helper-text-misaligned-no-helper" type="text"  value={updateInp.first_name || ""}
        onChange={(e) =>
          setUpdateInp({ ...updateInp, first_name: e.target.value })
        }required label="Add Employee" />
<TextField id="demo-helper-text-misaligned-no-helper" type="number"  sx={{ mt: 2, mb: 4, width: '25ch' }}
 value={updateInp.salary || ""}
        onChange={(e) => setUpdateInp({ ...updateInp, salary: e.target.value })} required label="Add Employee" />

      {/* <input type="number"
        value={updateInp.salary || ""}
        onChange={(e) => setUpdateInp({ ...updateInp, salary: e.target.value })}
      /> */}
      <Button variant="contained" >Update</Button>
      <button>Update</button>
     <p>{updateResp}</p>
    </form>
  );
}
