import Button from "../components/Button"

export default function Modal({deleteHandler,setModalToggle}){
    // console.log(deleteItem)

   
    // console.log(deleteHandler)
    return(
        <div >
            <h3>Are You Sure You Want To Delete Data ?</h3>
            <button onClick={()=>{deleteHandler()}}>delete</button>
            {/* <Button name={'delete'} /> */}
            <Button setModalToggle={setModalToggle} name={'Cancle'} />
        </div>
    )
}