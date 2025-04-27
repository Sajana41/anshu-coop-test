import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewDetails() {
    const { patientname } = useParams();
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5100/patients/${patientname}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Patient not found');
                }
                return res.json();
            })
            .then((data) => {
                setPatientData(data);
                setError(null);
            })
            .catch((err) => {
                console.error(err.message);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [patientname]);

    return (
        <div className="container">
            <h1>Patient Details</h1>

            {loading && <p>Loading patient data...</p>}

            {error && (
                <div className="error">
                    <p>Error: {error}</p>
                    <Link to="/" className="btn">Back to List</Link>
                </div>
            )}

            {patientData && !loading && !error && (
                <div className="details">
                    <p><strong>Name: </strong>{patientData.name}</p>
                    <p><strong>Age: </strong>{patientData.age}</p>
                    <p><strong>Status: </strong>
                        <span className={`status ${patientData.status.toLowerCase()}`}>
                            {patientData.status}
                        </span>
                    </p>
                </div>
            )}

            {!loading && !error && (
                <Link to="/" className="btn btn-back">Back</Link>
            )}
        </div>
    );
}
