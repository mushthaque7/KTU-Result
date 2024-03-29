import { useState, useEffect } from "react";
import axios from "axios";
import FormData from "../Form/form";
import "./result.css"
function Result() {
    const [resultSummary, setResult] = useState(null);
    const [formData, setForm] = useState(null);
    const [found,setFound] = useState(true)
    function handleSubmit(data) {
        setForm(data);
    }

    const RESULT_API = "https://api.ktu.edu.in/ktu-web-service/anon/individualresult";

    useEffect(() => {
        async function getResult() {
            if (!formData.regNo || !formData.dob) return;
            const resultFormat = {
                "registerNo": formData.regNo,
                "dateOfBirth": formData.dob,
                "examDefId": 963,
                "schemeId": 17
            };

            try {
                const response = await axios.post(RESULT_API, resultFormat);
                setResult(response.data.resultDetails);
                setFound(true)
            } catch (error) {
                setFound(false)
                console.log("ERROR: ", error);
            }
        }

        getResult();
    }, [formData]);

    useEffect(() => {
        if (resultSummary !== null) {
            console.log(resultSummary);
        }
    }, [resultSummary]);

    return (
        <>
            <FormData onSubmit={handleSubmit} />
            {resultSummary !== null && found==true && (
                <div className="row">
                    <table align="center" className="table">
                    <thead align="left">
                            <tr>
                                <th>FIRST NAME</th>
                                <th>{resultSummary.length > 0 ? resultSummary[0].firstName : ''}</th>
                            </tr>
                            <tr>
                                <th>INSTITUTION NAME</th>
                                <th>{resultSummary.length > 0 ? resultSummary[0].institutionName : ''}</th>
                            </tr>
                            <tr>
                                <th>BRANCH NAME</th>
                                <th>{resultSummary.length > 0 ? resultSummary[0].branchName : ''}</th>
                            </tr>
                            <tr>
                                <th>REGISTER NUMBER</th>
                                <th>{resultSummary.length > 0 ? resultSummary[0].registerNo : ''}</th>
                            </tr>
                            <tr>
                                <th>SEMESTER</th>
                                <th>{resultSummary.length > 0 ? resultSummary[0].semesterName : ''}</th>
                            </tr>
                        </thead>
                    </table>
                    <table align="center" className="table table-hover">
                       <thead className="thead-dark">
                        <tr align="left">
                            <th>SUBJECT</th>
                            <th>GRADE</th>
                            <th>CREDIT</th>
                        </tr>
                       </thead>
                        <tbody>
                            {resultSummary.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.courseName}</td>
                                    <td>{element.grade}</td>
                                    <td>{element.credits}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
                {found ==false &&(
                    <div className="failed">
                        <p>No record found</p>
                    </div>
                )}
            
        </>
    );
}

export default Result;
