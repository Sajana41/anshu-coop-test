import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PatientsTable from './PatientsTable';
import CreatePatient from './CreatePatient';
import EditPatient from './EditPatient';
import ViewDetails from './ViewDetails';

function App() {
  
  return (
    <BrowserRouter>
      <div className="app-container"> 
        <Routes>
          <Route path="/" element={<PatientsTable />} />
          <Route path="/patient/create" element={<CreatePatient />} />
          <Route path="/patient/edit/:patientname" element={<EditPatient />} />
          <Route path="/patient/view/:patientname" element={<ViewDetails />} />
          
          
          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;