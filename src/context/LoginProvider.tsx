"use client";

// 1. import 구문
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

// 2. LoginContextType 타입 정의
type LoginContextType = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
};
// Context가 제공할 데이터 구조를 정의한다.
// isLogin은 현재 로그인 상태를 나타내는 boolean 값이며,
// login과 logout은 각각 로그인 및 로그아웃을 처리하는 함수이다.

// 3. LoginContext 생성
const LoginContext = createContext<LoginContextType>({
  isLogin: false,
  login: () => {},
  logout: () => {},
});
// createContext를 사용하여 LoginContext를 생성한다.
// 초기값으로 isLogin을 false로 설정하고, login과 logout은 빈 함수로 초기화한다.

// 4. useLoginContext 훅 정의
export const useLoginContext = () => useContext(LoginContext);
// useLoginContext는 LoginContext를 사용하는 커스텀 훅이다.
// 이를 통해 컴포넌트에서 LoginContext의 값을 쉽게 접근할 수 있다.

// 5. LoginProvider 컴포넌트 정의
export default function LoginProvider({ children }: PropsWithChildren) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const login = useCallback(() => setIsLogin(true), []);
  const logout = useCallback(() => setIsLogin(false), []);

  return (
    <LoginContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}
// LoginProvider는 Context 제공자 컴포넌트이다.
// (1) useState를 사용하여 isLogin 상태 변수를 선언하고 초기값을 false로 설정한다.
// (2) login 함수는 setIsLogin을 호출하여 isLogin을 true로 변경한다.
// useCallback을 사용하여 함수가 재생성되는 것을 방지한다.
// (3) logout 함수는 setIsLogin을 호출하여 isLogin을 false로 변경한다.
// useCallback을 사용하여 함수가 재생성되는 것을 방지한다.
// (4) LoginContext.Provider를 사용하여 하위 컴포넌트들에게 isLogin, login, logout 값을 제공한다.
// children은 이 컴포넌트가 감싸는 모든 하위 컴포넌트들을 나타낸다.

// 이 코드는 로그인 상태를 전역적으로 관리하고, 어떤 컴포넌트에서도 이 상태를 쉽게 접근하고 수정할 수 있게 한다.
// Context와 Provider 패턴을 사용하여 React 애플리케이션 내에서 상태 관리를 보다 간편하게 한다.
