import './App.css';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';

import CustomAuthContext from './authContext';
import CustomProductContext from './productContext';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {index: true, element: <Home />},
        { path: 'signin',
          element: <Signin />,
        },
        {
          path: 'signup',
          element: <Signup />
        },
      ]
    }
  ])
  return (
    <CustomAuthContext>
      <CustomProductContext>
        <RouterProvider router={browserRouter}/>
      </CustomProductContext>
    </CustomAuthContext>
  );
}

export default App;
