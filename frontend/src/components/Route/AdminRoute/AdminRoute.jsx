import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// userType === 'admin'가 아닐 경우 메인페이지로 이동시키기
const AdminRoute = () => {
  const user = useSelector((state) => state.user);
  if (user.userType !== 'admin') {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default AdminRoute;
