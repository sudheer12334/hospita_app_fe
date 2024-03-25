import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './patients.css';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
  // State to hold the list of patients
  const [patients, setPatients] = useState([]);
  // State to hold the patient data being edited
  const [editedPatient, setEditedPatient] = useState(null);
  const { isAuthenticated} = useAuth();
  const [patientName, setPatientName] = useState('');
  const nav=useNavigate();


  useEffect(() => {
    // Function to fetch patients list
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://hospital-app-hb46.onrender.com/patient/all');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    // Call the fetchPatients function
    fetchPatients();
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts
  
  // Function to handle deleting a patient
  const deletePatient = async (patientId) => {
    try {
      await axios.delete(`http://hospital-app-hb46.onrender.com/patient/delete/${patientId}`);
      // After deletion, fetch the updated list of patients
      const response = await axios.get('http://hospital-app-hb46.onrender.com/patient/all');
      setPatients(response.data);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  // Function to handle editing a patient
  const editPatient = (patient) => {
    setEditedPatient(patient);
  };

  // Function to handle saving edited patient data
 // Function to handle saving edited patient data
const saveEditedPatient = async () => {
  try {
    // Validate form fields
    if (!editedPatient.name || 
        !editedPatient.email || 
        !editedPatient.contactNo || 
        !editedPatient.dob || 
        !editedPatient.branch || 
        !editedPatient.address) {
      // Display error message or prevent submission
      console.error('All fields are required');
      alert('All fields are required');
      return;
    }

    // Validate contact number length
    if (editedPatient.contactNo.length !== 10) {
      console.error('Contact number must be 10 digits');
      alert('Contact number must be 10 digits');
      return;
    }

    // Validate email format
    if (!editedPatient.email.endsWith('@gmail.com')) {
      console.error('Email must end with "@gmail.com"');
      alert('Email must end with "@gmail.com"');
      return;
    }

    // Submit form if all fields are valid
    const formData = {
      "name": editedPatient.name,
      "email": editedPatient.email,
      "contactNo": editedPatient.contactNo,
      "dob": editedPatient.dob,
      "branch": editedPatient.branch,
      "address": editedPatient.address
    };

    await axios.put(`http://hospital-app-hb46.onrender.com/patient/update/${editedPatient.patientId}`, formData);
    // After updating, fetch the updated list of patients
    const response = await axios.get('http://hospital-app-hb46.onrender.com/patient/all');
    setPatients(response.data);
    setEditedPatient(null); // Reset editedPatient state after saving
  } catch (error) {
    console.error('Error updating patient:', error);
  }
};

  
  const handleSearch = async () => {
    try {
      let response;
      if (!isNaN(patientName)) {
        // If patientName is a number, fetch by contact number
        response = await axios.get(`http://hospital-app-hb46.onrender.com/patient/contact/${patientName}`);
      } else {
        // If patientName is a string, fetch by patient name
        response = await axios.get(`http://hospital-app-hb46.onrender.com/patient/${patientName}`);
      }
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };
  

  const handleChange = (e) => {
    setPatientName(e.target.value);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      nav('/');
    }
  }, [isAuthenticated, nav]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPatient(prevPatient => ({
      ...prevPatient,
      [name]: value
    }));
  };

  return (
    <div className='patient-container'>
      {editedPatient ? (
        <div className="edit-form">
          <h1>Edit Patient</h1>
          <div className='field-container'>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={editedPatient.name} onChange={handleInputChange} required/>
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" value={editedPatient.email} onChange={handleInputChange} required/>
            </div>
            <div className="field">
              <label htmlFor="contactNo">Contact Number</label>
              <input type="text" id="contactNo" name="contactNo" value={editedPatient.contactNo} onChange={handleInputChange} required/>
            </div>
            
            <div className="field">
              <label htmlFor="dob">Date of Birth</label>
              <input type="text" id="dob" name="dob" value={editedPatient.dob} onChange={handleInputChange} required/>
            </div>
            <div className="field">
              <label htmlFor="branch">Branch</label>
              <input type="text" id="branch" name="branch" value={editedPatient.branch} onChange={handleInputChange} required/>
            </div>
            <div className="field">
              <label htmlFor="address">Address</label>
              <textarea id="address" name="address" value={editedPatient.address} onChange={handleInputChange} required/>
            </div>
          </div>
          <div className='buttons'>
            <button className='cancel-button' onClick={() => setEditedPatient(null)}>Cancel</button>
            <button className="save-button" onClick={saveEditedPatient}>Save</button>
          </div>
        </div>
      ) : (
        <>
          <div  className="title-line">
            <h1 id='title'>Patients List</h1>
            <input type="text" placeholder="Search Patient Name or Contact Number" value={patientName} onChange={handleChange}/>
              <FontAwesomeIcon id="icon"  onClick={handleSearch} icon={faSearch} />
           
          </div>
          <ul className='list'>
            {patients.map(patient => (
              <li className='list-item' key={patient.patientId}>
                <hr></hr>
                <div><b>Name:</b> {patient.name}</div>
                <div><b>Email:</b> {patient.email}</div>
                <div><b>Contact Number:</b> {patient.contactNo}</div>
                <div><b>Date of Birth:</b> {patient.dob}</div>
                <div><b>Branch:</b> {patient.branch}</div>
                <div><b>Address:</b> {patient.address}</div>
                <button className="edit-button" onClick={() => editPatient(patient)}>Edit</button>
                <button className="del-button" onClick={() => deletePatient(patient.patientId)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Patients;
