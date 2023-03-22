import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// user.id가 확인되지 않으면 서비스 페이지 라우팅 제한하기.
const LoginRoute = () => {
  const user = useSelector((state) => state.user);
  if (user.id === '') {
    // alert('로그인 후 이용 가능한 서비스입니다.');
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default LoginRoute;
