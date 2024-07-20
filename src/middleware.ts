// 1. 모듈 임포트
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
// NextResponse : Next.js 서버에서 응답을 생성하는 데 사용된다.
// NextRequest : Next.js 서버에서 요청 객체를 나타내는 타입이다.
// upDateSession : 세션을 업데이트하는 함수이다.

// 2. middleware() 함수 정의
export async function middleware(request: NextRequest) {
  return await updateSession(request);
  // return await NextResponse.next();
}
// middleware() 함수는 들어오는 요청을 처리하기 위한 비동기 함수이다.
// request는 NextRequest 타입의 객체로, 현재 요청에 대한 정보를 담고 있다.
// 함수 내부에서는 updateSession() 함수를 호출하여 요청 객체를 전달한다.
// updateSession() 함수는 세션을 업데이트하고 그 결과를 반환한다.
// 주석 처리된 NextResponse.next()는 요청 처리를 계속 진행하라는 의미이다.

// 3. config 객체 정의
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
// config 객체는 미들웨어가 적용될 경로를 지정한다.
// matcher 배열은 정규 표현식을 사용하여 특정 경로를 제외하고 모든 경로에 미들웨어를 적용하도록 설정한다.

// 이 코드는 Next.js 애플리케이션에서 미들웨어를 정의하고, 들어오는 요청에 대해 세션을 업데이트하는 로직을 구현한다.
// updateSEssion() 함수는 요청 객체를 받아 세션을 업데이트하고, 그 결과를 반환한다.
// 미들웨어는 특정 경로를 제외한 모든 경로에 대해 적용된다.
