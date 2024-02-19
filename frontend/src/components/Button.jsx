import { useNavigate } from "react-router-dom";

export default function Button(prop){

    const navigate = useNavigate();

const handleClick = () => {
    if(prop.name==='edit'){
  navigate("/Edit");
    }
  else if(prop.name==='Add'){
    navigate("/addEmployee");
  }
  // else if(prop.name==='delete'){
  //   prop.modalHandler()

  // }
  else if(prop.name==='Cancle'){
    prop.setModalToggle(false)
      
    }
}

    return(
    <>
        <button onClick={handleClick} >{prop.name}</button>
    </>
    )
}