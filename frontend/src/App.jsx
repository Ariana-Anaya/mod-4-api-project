import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import Spots from './components/Spots/spots';
import LoadSpot from './components/Spots/LoadSpot';
import CreateSpot from './components/Spots/CreateSpot';
import ManageSpots from './components/Spots/ManageSpots';
import UpdateSpot from './components/Spots/UpdateSpot';
function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <> <h1></h1>
                <Spots/>
                </>
        )
      },
      {
        path: '/spots',
        element: <Spots/>
      },
      {
        path: '/spots/:spotId',
        element: <LoadSpot/>
      },
      {
        path: '/spots/new',
        element: <CreateSpot/>
      },
      {
        path:'/spots/current',
        element:<ManageSpots/>
      },
      {
        path:'/spots/:spotId/edit',
        element:<UpdateSpot/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;