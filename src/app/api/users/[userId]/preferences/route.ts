import { NextResponse } from 'next/server'
import type { UserPreferences } from '@/lib/types/user-preferences'

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // TODO: Replace with your database query
    // This is a placeholder implementation
    const preferences = await fetch(`${process.env.API_URL}/users/${params.userId}/preferences`)
    const data = await preferences.json()
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user preferences' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body: UserPreferences = await request.json()

    // TODO: Replace with your database update
    // This is a placeholder implementation
    const response = await fetch(`${process.env.API_URL}/users/${params.userId}/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user preferences' },
      { status: 500 }
    )
  }
}
