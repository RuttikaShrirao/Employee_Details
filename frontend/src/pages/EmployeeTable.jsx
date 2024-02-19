import { useState } from "react";
import Button from '@mui/material/Button';
import { useEffect } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function EmployeeTable() {
  const url = "http://localhost:3000/";
  const [emp_info, setemp_info] = useState([]);
  const [modalToggle, setModalToggle] = useState(false);
  const [deleteItem, setdeleteItem] = useState();
  const [itemToDelete, setitemToDelete] = useState();
  // const [token, setToken] = useState('');
  // const [getPrevValueToUpdate, setGetPrevValueToUpdate] = useState({})
 

// table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

  const navigate = useNavigate();
  const frontendToken = localStorage.getItem('token');
  useEffect(() => {
    if (frontendToken) {
      empApi(frontendToken);
    }
    else{
      navigate('/')
    }
  }, []);
  

  const empApi = (frontendToken) => { 

    return fetch(url,
      {
        headers:{
          'Content-Type': 'application/json',
          'authorization': `Bearer ${frontendToken}` 
        }
      })
      .then((response) => response.json())
      .then((data) => {
        setemp_info(data.data);
      })
      .catch((error) => {
        console.error("Errorrrrrrrrrrr:", error);
      });
  };


  const deleteHandler=async()=>{
    const id = itemToDelete
    let result= fetch(`http://localhost:3000/delete/${id}`,
      {
      method:'delete',
      headers:{
        'Content-Type': 'application/json',
        'authorization': `Bearer ${frontendToken}` 
      }
      })
      .then(res=>{return res.json()
      })
      .then(data=>{
        console.log(data)
      })
      if(result){
        setemp_info(
          emp_info.filter(emp => emp.id != id)
          )
      }
  }

const handleNevigate = (empid) => {
  navigate(`/Edit/${empid}`);
};
  return (
    <div >
      <div>
        {/* <Button name={"Add"} /> */}
        {/* <button onClick={()=>{localStorage.removeItem('token'); navigate('/')}}>Log Out</button> */}
        <div className="Top-buttons">
        <Button   variant="contained" onClick={()=>{navigate("/addEmployee")}} >add employee</Button>
        <Button onClick={()=>{localStorage.removeItem('token'); navigate('/')}}  variant="contained" color="success" >Log Out</Button>
        </div>

        {/* <table>
          <tbody>
            <tr>
              <th>Sr No.</th>
              <th>Emp_Name</th>
              <th>Salary</th>
            </tr>
            {emp_info.map((e, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{e.first_name}</td>
                <td>{e.salary}</td>
                <td>
                <button onClick={()=>{handleNevigate(e.id)}}>edit</button>
               
                </td>
                <td>
                <button  onClick={()=>{setModalToggle(true),
                                         setitemToDelete(e.id)}}>delete</button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}


<div >
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{fontSize:'1.5em'}}>Id</StyledTableCell>
            {/* <StyledTableCell align="right">Calories</StyledTableCell> */}
            <StyledTableCell align="center" style={{fontSize:'1.5em'}}>First Name</StyledTableCell>
            <StyledTableCell align="center" style={{fontSize:'1.5em'}}>Salary</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emp_info.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row" style={{fontSize:'1.5em'}}>
                {index+1}
              </StyledTableCell>

              <StyledTableCell align="center" style={{fontSize:'1.5em'}}>{row.first_name}</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize:'1.5em'}}>{row.salary}</StyledTableCell>
              <StyledTableCell align="center" onClick={()=>{handleNevigate(row.id)}}><Button variant="contained">edit</Button></StyledTableCell>
              <StyledTableCell align="center"><Button variant="contained" color="error" onClick={()=>{setModalToggle(true),
                                         setitemToDelete(row.id)}}>delete</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</div>


      </div>
     {modalToggle && <Modal deleteItem={deleteItem} deleteHandler={deleteHandler} setModalToggle={setModalToggle}/>}
    </div>
  );
}
