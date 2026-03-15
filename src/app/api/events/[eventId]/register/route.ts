import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/events/[eventId]/registrations - Get registrations for an event (admin only)
export async function GET(request: Request, { params }: { params: { eventId: string } }) {
  try {
    const { eventId } = params

    const registrations = await prisma.eventRegistration.findMany({
      where: { eventId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(registrations)
  } catch (error) {
    console.error('Get registrations error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    )
  }
}

// POST /api/events/[eventId]/register - Register for an event
export async function POST(request: Request, { params }: { params: { eventId: string } }) {
  try {
    const { eventId } = params
    const body = await request.json()
    const { name, email, phone, company, message } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Check if registration is enabled
    if (!event.registrationEnabled) {
      return NextResponse.json(
        { error: 'Registration is not enabled for this event' },
        { status: 400 }
      )
    }

    // Check if already registered with this email
    const existingRegistration = await prisma.eventRegistration.findFirst({
      where: { eventId, email },
    })

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'You are already registered for this event' },
        { status: 400 }
      )
    }

    // Create registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        company: company ? company.trim() : null,
        message: message ? message.trim() : null,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! You should receive a confirmation email shortly.',
        registration,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Event registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register for event' },
      { status: 500 }
    )
  }
}
