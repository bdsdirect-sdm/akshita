import {Route, Routes} from 'react-router-dom'
import { useState } from 'react';
import AuthRoutes from './routes/authRoutes';

interface route{
  path: string;
  element: JSX.Element;
  layout:React.FC<{ children: React.ReactNode }>;
  component:React.FC;
}

function App() {

  const [initialRoutes, setInitialRoutes] = useState<Array<any>>(AuthRoutes)

  return (
    <div>
      <Routes>
          {initialRoutes.map((route: route, index:number) => {
              const { layout: Layout, component: Component } = route;
              return (
                  <Route
                      key={index}
                      path={route.path}
                      element={
                          <Layout>
                              <Component />
                          </Layout>
                      }
                  />
              );
          })}
          {/* Add a not found route */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  )
} 

export default App
