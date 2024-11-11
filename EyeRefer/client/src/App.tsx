import react from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import AddPatient from './pages/AddPatient';
import DoctorList from './tempPages/DoctorList';
import StaffList from './tempPages/StaffList';
import AddStaff from './tempPages/AddStaff';
import Signup from './pages/Signup'
import Header from './components/Header';
import Verify from './pages/Verify'
import Login from './pages/Login'
import Profile from './tempPages/Profile'
import AddAddress from './pages/AddAddress'

const  App:react.FC = () => {

  const router = createBrowserRouter([
    {
      path:'/',
      children:[
        {
          path:'/',
          element: <Signup />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/verify',
          element: <Verify />
        },
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/patient',
          element: <PatientList />
        },
        {
          path: '/add-patient',
          element: <AddPatient />
        },
        {
          path: '/doctor',
          element: <DoctorList />
        },
        {
          path: '/staff',
          element: <StaffList />
        },
        {
          path: '/add-staff',
          element: <AddStaff />
        },
        {
          path: '/add-address',
          element: <AddAddress />
        },
        {
          path: '/profile',
          element: <Profile />
        }
      ]
    }
  ]
)

  return (
<>
<RouterProvider router={router} />
<ToastContainer newestOnTop={false}
closeOnClick />
</>
  )
}

export default App
