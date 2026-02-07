import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');

    // Redirect to the login page
    const secretPath = process.env.SECRET_ADMIN_PATH || 'admin-$ecret-P@nel';
    return NextResponse.redirect(new URL(`/${secretPath}`, process.env.NEXTAUTH_URL || 'http://localhost:3000'));
}
