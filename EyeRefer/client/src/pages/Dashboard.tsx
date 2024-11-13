import ODDashboard from './ODDashboard'
import MDDashboard from './MDDashboard'

const Dashboard = () => {
  return (
    <>
            {
                        (localStorage.getItem("doctype") === '2' ) ?
                            <ODDashboard/> : <MDDashboard/>
                    }
        </>
  )
}

export default Dashboard