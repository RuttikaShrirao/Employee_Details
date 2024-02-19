import EmployeeTable from './pages/EmployeeTable';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from './pages/Edit' ;
import AddEmployee from './pages/AddEmployee';
import Login from './pages/Login';
import Registration from './pages/Registration'
import './App.css';

function App() {


  return (
    <>
     <Routes>
     <Route path="/" element={ <Login/>}/>
     <Route path="/registration" element={<Registration />}/>
     <Route path="/home" element={ <EmployeeTable/>}/>
     <Route path="/edit/:empid" element={<Edit />}/>
     <Route path="/addEmployee" element={<AddEmployee />}/>
    
    </Routes>
    </>
  )
}

export default App
