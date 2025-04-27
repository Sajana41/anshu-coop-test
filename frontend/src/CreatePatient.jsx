import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreatePatient() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [status, setStatus] = useState("");
    const [validation, setValidation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidation(true);

        if (!name || !age || !status) {
            return;
        }

        const patientData = { name, age, status };

        setIsSubmitting(true);

        fetch("http://localhost:5100/patients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patientData)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to save patient");
            }
            alert("Patient data saved successfully");
            navigate("/");
        })
        .catch((err) => {
            console.error(err.message);
            alert("Failed to save patient data");
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <div className="container">
            <h2>Add New Patient</h2> 
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
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    {status.length === 0 && validation && (
                        <span className="error-msg">Please select patient status</span>
                    )}
                </div>

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="btn btn-save"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
                    <Link to="/" className="btn btn-back">Back</Link>
                </div>
            </form>
        </div>
    );
}
