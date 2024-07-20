// 1. 모듈 임포트
import { Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";
// Database : TypeScript 타입 정의를 가져온다. 이 타입은 supabase 데이터베이스 스키마를 정의한다.
// createBrowserClient : @supabase/ssr 모듈에서 가져온 함수이다. 이 함수는 브라우저 환경에서 supabase 클라이언트를 생성하는 데 사용된다.

// 2. createClient() 함수 정의
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
// createClient() 함수는 supabase 클라이언트를 생성하여 반환한다.
// 이 함수는 createBrowserClient를 호출하면서 두 개의 환경 변수를 인자로 전달한다.
// <Database>는 제네릭 타입 파라미터로, createBrowserClient가 반환하는 클라이언트가 Database 타입을 준수함을 명시한다.

// 이 코드는 supabase 클라이언트를 생성하는 함수로, Next.js 애플리케이션에서 supabase 서비스를 사용할 수 있게 해준다.
// 환경 변수에 저장된 supabase 프로젝트의 URL과 익명 키를 사용하여 클라이언트를 설정한다.
// 제네릭 타입 파라미터를 통해 supabase 클라이언트가 Database 타입을 준수하도록 하여 타입 안전성을 강화한다.
// createClient 함수는 이를 통해 설정된 클라이언트를 반환하여, 애플리케이션의 다른 부분에서 supabase와 상호작용할 수 있도록 한다.
