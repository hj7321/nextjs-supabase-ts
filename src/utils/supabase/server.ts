// 1. 모듈 임포트
import { Database } from "@/types/supabase";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
// Database : TypeScript 타입 정의를 가져온다. 이 타입은 supabase 데이터베이스 스키마를 정의한다.
// createServerClient : @supabase/ssr 모듈에서 가져온 함수로, 서버 환경에서 supabase 클라이언트를 생성하는 데 사용된다.
// CookieOptions : 쿠키 설정에 대한 타입 정의이다.
// cookies : Next.js에서 제공하는 유틸리티 함수로, 서버 사이드에서 쿠키를 다루는 데 사용된다.

// 2. createClient() 함수 정의
export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 서버 컴포넌트에서 setAll() 메서드가 호출되었다.
            // 미들웨어가 사용자 세션을 새로 고치는 경우 무시할 수 있다.
          }
        },
      },
    }
  );
}
// cookieStore를 cookies() 함수를 호출하여 생성한다. cookieStore는 서버 사이드에서 쿠키를 다루는 객체이다.
// 제네릭 타입 파라미터를 사용하여 createServerClient 함수가 반환하는 클라이언트의 타입을 Database로 지정한다.
// createServerClient 호출 시 cookies 옵션을 포함한다. 이 옵션은 쿠키를 읽고 설정하는 방법을 정의한다.
// - getAll() : 모든 쿠키를 가져오는 메서드로, cookieStore.getAll()을 호출한다.
// - setAll() : 쿠키를 설정하는 메서드로, 인자로 받은 cookiesToSet 배열을 순회하며 각각의 쿠키를 설정한다. 만약 서버 컴포넌트에서 이 메서드가 호출될 경우 예외가 발생할 수 있으므로, 이를 무시하는 try-catch 블록이 포함되어 있다.

// 이 코드는 서버 환경에서 사용할 수 있는 supabase 클라이언트를 생성하는 함수로, Next.js 애플리케이션에서 supabase 서비스를 사용할 수 있게 해준다.
// 환경 변수에 저장된 supabase 프로젝트의 URL과 익명 키를 사용하여 클라이언트를 설정한다.
// 쿠키를 관리하기 위해 cookies 유틸리티를 사용하며, createServerClient의 cookies 옵션을 통해 쿠키를 읽고 설정하는 방법을 정의한다.
// 제네릭 타입 파라미터를 통해 supabase 클라이언트가 Database 타입을 준수하도록 하여 타입 안전성을 강화한다.
// createClient() 함수는 이를 통해 설정된 클라이언트를 반환하여, 애플리케이션의 다른 부분에서 supabase와 상호작용할 수 있도록 한다.
