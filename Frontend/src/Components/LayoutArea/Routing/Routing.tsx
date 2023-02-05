import { Route, Routes } from "react-router-dom";
import AddAssignment from "../../AssignmentArea/AddAssignment/AddAssignment";
import AssignmentsList from "../../AssignmentArea/AssignmentsList/AssignmentsList";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path='/' element={<AssignmentsList />}></Route>
            <Route path='/AddAssingment' element={<AddAssignment />}></Route>
        </Routes>
    );
}

export default Routing;
