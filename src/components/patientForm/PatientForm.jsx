
import {useState} from 'react';
import axios from 'axios';
import "./patientForm.css";


const PatientForm=()=>{
        const [patientDetails, setPatientDetails] = useState({
            name: '',
            email: '',
            contactNumber: '',
            dob: '',
            branch : '',
            address : ''
           
          });
        
          const handleChange = (e) => {
            const { name, value } = e.target;
            setPatientDetails(prevState => ({
              ...prevState,
              [name]: value
            }));
          };
      
        
          const handleSubmit = async (e) => {
            e.preventDefault();
            try {

              if (!patientDetails.email.endsWith('@gmail.com')) {
                console.error('Email must end with "@gmail.com"');
                alert('Email must end with "@gmail.com"');
                return;
              }


              if (patientDetails.contactNumber.length !== 10) {
                console.error('Contact number must be 10 digits');
                alert('Contact number must be 10 digits');
                return;
              }
           
              const formData={
                "name":patientDetails.name,
                "email":patientDetails.email,
                "contactNo": patientDetails.contactNumber,
                "dob": patientDetails.dob,
                "branch": patientDetails.branch,
                "address": patientDetails.address
               
             
            }

        
              const response = await axios.post('http://localhost:8081/patient/save', formData);
        
              alert('Patient details saved successfully');
              console.log('Patient details saved successfully:', response.data);
             
              setPatientDetails({
                name: '',
                email: '',
                contactNumber: '',
                dob: '',
                branch: '',
                address: ''
              });
            } catch (error) {
              alert('Error occurred while saving patient details:', error);
              console.error('Error occurred while saving patient details:', error);
            }
          };

          
    
   

        
          return (
            <form className="form" onSubmit={handleSubmit}>
              <h1>Patient Details</h1>
              <div className="form-elements">
              <div id="form-name">
                <label htmlFor="name">Name</label>
                <input type="text"  name="name" value={patientDetails.name} onChange={handleChange} required />
              </div>
              <div id="form-email">
                <label htmlFor="email">Email</label>
                <input type="email"  name="email" value={patientDetails.email} onChange={handleChange} required />
              </div>
              <div id="form-contact">
                <label htmlFor="contactNumber">Contact Number</label>
                <input type="text" name="contactNumber" value={patientDetails.contactNumber} onChange={handleChange} required />
              </div>
              <div id="form-dob">
                <label htmlFor="dob">Date of Birth</label>
                <input type="date"name="dob" value={patientDetails.dob} onChange={handleChange} required />
              </div>
              <div id="form-branch">
                <label htmlFor="branch">Branch</label>
                <input type="text"name="branch" value={patientDetails.branch} onChange={handleChange} required />
              </div>
              <div id="form-address">
                <label htmlFor="address">Address</label>
                <textarea type="text" name="address" rows="4" cols="32" value={patientDetails.address} onChange={handleChange} required/>
              </div>
               

              <div className="button">
              <button id="button" type="submit">Save</button>
              </div>
              </div>
            </form>
          );
}
export default PatientForm;