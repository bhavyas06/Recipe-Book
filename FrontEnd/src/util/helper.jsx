import { Navigate, useOutletContext } from 'react-router-dom';

export const PrivateRoute = ({ element: Component }) => {
  const { isLoggedIn } = useOutletContext();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Component />;
};
