
export default function Input(prop){
// console.log(prop.updateInp)
    return(
     <input type={prop.type} required  onChange={prop.changeHandler} name={prop.name}  placeholder={prop.placeholder} />
    )
}