import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // Protected routes
    const protectedRoutes = ['/submit', '/admin']
    const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))

    if (isProtectedRoute && !session) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/login'
        redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
    }

    // Admin routes
    const adminRoutes = ['/admin']
    const isAdminRoute = adminRoutes.some(route => req.nextUrl.pathname.startsWith(route))

    if (isAdminRoute) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session?.user.id)
            .single()

        if (profile?.role !== 'admin') {
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = '/'
            return NextResponse.redirect(redirectUrl)
        }
    }

    return res
}

export const config = {
    matcher: ['/submit/:path*', '/admin/:path*'],
} 