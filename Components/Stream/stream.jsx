import { useState, useEffect } from "react";
import axios from "axios";
import Result from "../Result/result";
function Stream() {
    const [selectedOption, setSelectedOption] = useState("");
    const [streamInfo, setStreamInfo] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null); 
    const STREAM_API = "https://api.ktu.edu.in/ktu-web-service/anon/result";

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(selectedOption);

        try {
            if (selectedOption === "") return;

            const streamFormat = {
                "program": selectedOption
            };

            const response = await axios.post(STREAM_API, streamFormat);
            setStreamInfo(response.data);
        } catch (error) {
            console.log("ERROR: ", error);
        }
    };
    const handleRowClick = () => {
        setSelectedRowId(streamInfo.examDefId);
    };

    useEffect(() => {
        console.log(streamInfo);
    }, [streamInfo]); 

    return (
    <>
        <form onSubmit={handleSubmit}>
            <table align="center">
                <tbody>
                    <tr>
                        <td>
                            <select value={selectedOption} onChange={handleChange}>
                                <option disabled value="">Select your stream</option>
                                <option value="1">B.Tech</option>
                                <option value="2">M.Tech</option>
                                <option value="3">MBA</option>
                                <option value="4">MCA</option>
                                <option value="5">B.Arch</option>
                                <option value="6">M.Arch</option>
                                <option value="7">BHMCT</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
        {streamInfo != null && (
            <div className="row">
                <table className="table table-hover" align="center" style={{ width:'fit-content' }}>
                    <thead className="table-dark" align="left">
                        <tr>
                            <td>Name</td>
                            <td >Date</td>
                        </tr>
                    </thead>
                    <tbody style={{ width:'fit-content' }}>
                        <tr>
                            {streamInfo.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.resultName}</td>
                                    <td>{element.publishDate}</td>
                                    <td>
                                        <button onClick={handleRowClick}>Get Result</button>
                                    </td>
                                </tr>
          ))}
                        </tr>
                    </tbody>
    </table>
  </div>
)}
    {selectedRowId && <Result rowId={selectedRowId} />}
        </>
    );
}
export default Stream;
