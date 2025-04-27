import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditPatient() {
    const { patientname } = useParams();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [status, setStatus] = useState("");
    const [validation, setValidation] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5100/patients/${patientname}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch patient data');
                }
                return res.json();
            })
            .then((data) => {
                setName(data.name || "");
                setAge(data.age || "");
                setStatus(data.status || "");
                setError(null);
            })
            .catch((err) => {
                console.error(err.message);
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [patientname]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidation(true);

        if (!name || !age || !status) {
            return;
        }

        const patientData = { name, age, status };

        fetch(`http://localhost:5100/patients/${patientname}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patientData)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to update patient');
            }
            alert("Patient data updated successfully");
            navigate("/");
        })
        .catch((err) => {
            console.error(err.message);
            alert("Failed to update patient data");
        });
    };

    if (isLoading) {
        return <div className="container">Loading patient data...</div>;
    }

    if (error) {
        return (
            <div className="container">
                <p>Error: {error}</p>
                <Link to="/" className="btn btn-back">Back to List</Link>
            </div>
        );
    }

    return (
        <div className="container">
            <h2>Update Patient Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => setValidation(true)}
                    />
                    {name.length === 0 && validation && (
                        <span className="error-msg">Please enter patient name</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        required
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        onBlur={() => setValidation(true)}
                        min="0"
                    />
                    {age.length === 0 && validation && (
                        <span className="error-msg">Please enter patient age</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        required
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        onBlur={() => setValidation(true)}
                    >
                        <option value="">Select status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    {status.length === 0 && validation && (
                        <span className="error-msg">Please select patient status</span>
                    )}
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-save">
                        Update
                    </button>
                    <Link to="/" className="btn btn-back">Back</Link>
                </div>
            </form>
        </div>
    );
}
