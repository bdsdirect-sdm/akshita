import react from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PatientList from './components/PatientList';
import AddPatient from './pages/AddPatient';
import DoctorList from './tempPages/DoctorList';
import StaffList from './tempPages/StaffList';
import AddStaff from './tempPages/AddStaff';
import Signup from './pages/Signup'
import Verify from './pages/Verify'
import Login from './pages/Login'
import Profile from './tempPages/Profile'
import AddAddress from './pages/AddAddress'
import AddAppointment from './pages/AddAppointment';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import Chat from './tempPages/Chat';

const  App:react.FC = () => {

  const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout/>,
      children:[
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
        },
        {
          path: '/add-appointment',
          element: <AddAppointment />
        },
        {
          path: '/chat',
          element: <Chat />
        },
      ]
    },
    {
      path:'/',
      element: <Signup />
    },
    {
      path:'/signup',
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
