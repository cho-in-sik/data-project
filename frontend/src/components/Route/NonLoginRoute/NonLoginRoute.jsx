import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// user.id !== ''이면 로그인, 회원가입 페이지 접근 제한하기
const NonLoginRoute = () => {
  const user = useSelector((state) => state.user);
  if (user.id !== '') {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

export default NonLoginRoute;
