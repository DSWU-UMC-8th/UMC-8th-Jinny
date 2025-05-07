import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole: string;
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  //const role = "USER"; // USER인 경우 admin 페이지에 접근 불가
  const role = "ADMIN"; // ADMIN의 경우 admin  페이지에 접근 가능

  if (role === allowedRole) {
    return <>{children}</>;
  } else {
    return <h1>🚫admin페이지에 접근할 수 없습니다.</h1>;
  }
};

export default ProtectedRoute;
