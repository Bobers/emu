import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Skip middleware for API routes and static files to avoid issues
    const path = request.nextUrl.pathname
    
    if (path.startsWith('/api/health') || path.startsWith('/_next') || path.includes('.')) {
      return NextResponse.next()
    }

    let supabaseResponse = NextResponse.next({
      request,
    })

    // Check if required environment variables exist
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables')
      return NextResponse.next() // Allow request to proceed but log error
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // This will refresh session if expired - required for Server Components
    const { data: { user } } = await supabase.auth.getUser()

    // Protected routes
    const protectedPaths = ['/dashboard', '/api/strategies']
    const authPaths = ['/login', '/signup']

    const isProtectedPath = protectedPaths.some(p => path.startsWith(p))
    const isAuthPath = authPaths.some(p => path.startsWith(p))

    if (isProtectedPath && !user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isAuthPath && user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return supabaseResponse
  } catch (error) {
    console.error('Middleware error:', error)
    // Allow request to proceed even if middleware fails
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files and api/health
     */
    '/((?!_next/static|_next/image|favicon.ico|api/health|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}