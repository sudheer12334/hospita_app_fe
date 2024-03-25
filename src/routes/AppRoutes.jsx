import {BrowserRouter as Router,
    Routes,
    Route,
    Link    
} from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import LandingPage from '../components/landingPage/LandingPage';

import PatientForm from '../components/patientForm/PatientForm';
import { AuthProvider } from '../components/context/AuthContext';
import Patients from '../components/patients/Patients';

const AppRoutes=()=>{
   

    return(
      <>
         <AuthProvider>
        <Router>  
          <Header/>
          
            <Routes>
                <Route path='/' element={<LandingPage/>}></Route>
                <Route path='/form' element={<PatientForm/>}></Route>
                <Route path='/patients' element={<Patients/>}></Route>
            </Routes>
        </Router>
        <Footer/>
        </AuthProvider>
      </>
    )
  }
  export default AppRoutes;