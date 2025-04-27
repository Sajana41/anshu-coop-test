import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PatientsTable() {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    const DisplayDetails = (id) => {
        navigate("/patient/view/" + id);
    };

    const EditDetails = (id) => {
        navigate("/patient/edit/" + id);
    };

    const RemoveDetails = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            fetch(`http://localhost:5100/patients/${id}`, {
                method: 'DELETE',
            })
                .then((res) => {
                    alert("Deleted successfully");
                    window.location.reload();
                })
                .catch((err) => console.error(err.message));
        }
    };

    useEffect(() => {
        fetch('http://localhost:5100/patients')
            .then((res) => res.json())
            .then((data) => setPatients(data))
            .catch((err) => console.error(err.message));
    }, []);

    return (
        <div className="container">
            <h2>Patients Records</h2>
            <div className="table-container">
                <Link to="/patient/create" className="btn btn-add">Add new Patient</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients && patients.map((item, index) => (
                            <tr key={item._id || item.name + index}>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button onClick={() => DisplayDetails(item._id || item.name)} className="btn btn-info">View</button>
                                    <button onClick={() => EditDetails(item._id || item.name)} className="btn">Update</button>
                                    <button onClick={() => RemoveDetails(item._id || item.name)} className="btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
