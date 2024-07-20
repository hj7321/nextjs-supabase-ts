// 1. 모듈 임포트
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
// createServerClient : @supabase/ssr 모듈에서 가져온 함수로, 서버 환경에서 supabase 클라이언트를 생성하는 데 사용된다.
// NextResponse : Next.js 서버에서 응답을 생성하는 데 사용된다.
// NextRequest : Next.js 서버에서 요청 객체를 나타내는 타입이다.

// 2. updateSession() 함수 정의
export async function updateSession(request: NextRequest) {
  // (2-1) updateSession() 함수 시작
  console.log("updateSession 실행");
  let supabaseResponse = NextResponse.next({
    request,
  });
  // NextResponse.next({ request })를 사용하여 초기 응답 객체 supabaseResponse를 생성한다.

  // (2-2) supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  // createServerClient()를 사용하여 supabase 클라이언트를 생성한다.
  // cookies 객체를 통해 쿠키를 처리하는 방법을 정의한다.
  // - getAll() : 모든 쿠키를 가져온다.
  // - setAll(cookiesToSet) : 쿠키를 설정한다. 쿠키를 설정한 후 supabaseResponse를 업데이트한다.

  // createServerClient와 supabase.auth.getUser() 사이에 로직을 작성하면 안 된다.
  // 간단한 실수로 인해 사용자가 무작위로 로그아웃되는 문제를 디버깅하기가 매우 어려워질 수 있다.

  // (2-3) 사용자 정보 가져오기
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // supabase.auth.getUser()를 호출하여 사용자 정보를 가져온다.

  // (2-4) 조건에 따른 리디렉션
  if (!user && !request.nextUrl.pathname.startsWith("/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (user && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(request.nextUrl.origin);
  }
  // 사용자가 없고 요청 URL이 "/login"이 아니면 "/login"으로 리디렉션한다.
  // - request.nextUrl은 요청의 URL을 나타내는 URL 객체이다.
  // - clone() 메서드를 사용하여 URL 객체의 복사본을 만든다.
  // - 이렇게 하면 원본 URL 객체를 수정하지 않고도 새로운 URL 객체를 조작할 수 있다.
  // - 복사된 URL 객체의 pathname 속성을 "/login"으로 변경한다.
  // - 이는 URL 경로를 "/login" 페이지로 설정하는 것이다.
  // 사용자가 있고 요청 URL이 "/login"이면 홈 페이지로 리디렉션한다.
  // - request.nextUrl.origin은 요청의 URL의 출처(origin)를 나타낸다.
  // - 출처는 프로토콜(http 또는 https), 도메인(example.com), 포트(:3000)를 포함한다.
  // - 예를 들어, 요청 URL이 "https://example.com/some/path"인 경우, request.nextUrl.origin은 "https://example.com이 된다."

  // 반드시 supabaseResponse 객체를 그대로 반환해야 한다.
  // NextResponse.next()를 사용하여 새 응답 객체를 생성하는 경우, 다음을 따라야 한다.
  // 1. 다음과 같이 요청을 전달한다.
  //    const myNewResponse = NextResponse.next({request})
  // 2. 다음과 같이 쿠키를 복사한다.
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. 필요에 맞게 myNewResponse 객체를 변경하되, 쿠키를 변경하면 안 된다.
  // 4. 마지막으로, myNewResponse를 반환한다.
  // 이렇게 하지 않으면, 브라우저와 서버가 동기화되지 않고 사용자의 세션이 조기에 종료될 수 있다.

  // 3. 응답 반환
  return supabaseResponse;
  // supabaseResponse를 반환한다.
  // 주석에서 설명한대로 이 객체를 그대로 반환해야 한다.
}

// 이 코드는 Next.js 애플리케이션에서 사용자 세션을 업데이트하고, 특정 조건에 따라 리디렉션을 처리하는 미들웨어 함수이다.
// createServerClient()를 사용하여 supabase 클라이언트를 생성하고, 요청에서 쿠키를 읽고 설정한다.
// 사용자 정보를 가져와 로그인 상태에 따라 적절한 페이지로 리디렉션한다.
// 최종적으로 업데이트된 supabaseResponse 객체를 반환한다.
