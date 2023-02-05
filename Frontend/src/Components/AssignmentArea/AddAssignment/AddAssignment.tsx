import { useState } from "react";
import "./AddAssignment.css";

function AddAssignment(): JSX.Element {

    const [hide, hideTriger] = useState("block")








    return (
        <div className="AddAssignment">
            <p style={{ display: hide }}>Add Assingment</p>
            <button onClick={() =>hide === "block" ? hideTriger("none") : hideTriger("block")}>Hide</button>
        </div>
    );
}

export default AddAssignment;
