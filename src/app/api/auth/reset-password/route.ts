import { NextResponse } from 'next/server'
import { storeResetPassword } from '@/lib/password-store'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@spemumbai.org'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, newPassword, action } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if email is the admin email
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      return NextResponse.json(
        { error: 'Email not found in system' },
        { status: 404 }
      )
    }

    if (action === 'verify') {
      // Email verification step
      return NextResponse.json({
        success: true,
        message: 'Email verified. Please enter your new password.',
      })
    }

    if (action === 'reset') {
      // Password reset step
      if (!newPassword || typeof newPassword !== 'string') {
        return NextResponse.json(
          { error: 'New password is required' },
          { status: 400 }
        )
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters' },
          { status: 400 }
        )
      }

      // Store the new password
      storeResetPassword(email, newPassword)

      // Log the reset (in production, log to database)
      console.log(`[Password Reset] Email: ${email} at ${new Date().toISOString()}`)

      return NextResponse.json({
        success: true,
        message: 'Password reset successfully! You can now login with your new password. Redirecting to login...',
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'An error occurred during password reset' },
      { status: 500 }
    )
  }
}
