import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  try {
    // Create test account
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Send test email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'Test Email Configuration',
      text: 'If you receive this email, your email configuration is working correctly!',
      html: '<p>If you receive this email, your email configuration is working correctly!</p>',
    })

    return NextResponse.json(
      { 
        success: true,
        message: 'Test email sent successfully',
        emailUser: process.env.EMAIL_USER?.slice(0, 3) + '...' // Only show first 3 chars for security
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send test email',
      },
      { status: 500 }
    )
  }
} 