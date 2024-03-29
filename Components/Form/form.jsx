import { useState } from "react";
import PropTypes from "prop-types";
import "./form.css"
function FormData({onSubmit}){
    const [regNo,setRegNo]=useState(null)
    const [dob,setDob]=useState(null)

    function handleReg(event){
        setRegNo(event.target.value)
    }
    function handleDOB(event){
        setDob(event.target.value)
    }
    function submitData(){
        onSubmit({regNo,dob})
    }

    return(
        <>
        <div className="title">
            GET YOUR KTU RESULT
        </div>
            <form className="form-data">
            <table align="center">
                
                    <tr colSpan="2">
                        <td><input 
                        type="text" 
                        value={regNo} 
                        onChange={handleReg} 
                        placeholder="Register Number" 
                        required /></td>
                    </tr>
                    <tr color="2">
                        <td><input 
                        type="text" 
                        value={dob} 
                        onChange={handleDOB} 
                        placeholder="Date of birth (YYYY-MM-DD)" 
                        pattern="\d{4}-\d{2}-\d{2}"
                        required /></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><button 
                        type="button" 
                        onClick={submitData}>
                        Submit</button></td>
                    </tr>
                
            </table>
            </form>
        </>
    )
}

FormData.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default FormData