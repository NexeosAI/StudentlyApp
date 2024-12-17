import { NextResponse } from "next/server"
import { z } from "zod"

import { signJwtAccessToken } from "@/lib/jwt"

const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

// Dev credentials
const DEV_USER = {
  id: "dev-1",
  email: "dave@studently.uk",
  password: "studently",
  name: "Dave",
  role: "ADMIN"
}

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = userSchema.parse(json)

    // Check for dev login
    if (body.email === DEV_USER.email && body.password === DEV_USER.password) {
      const { password: _, ...userWithoutPass } = DEV_USER
      const accessToken = signJwtAccessToken(userWithoutPass)

      return NextResponse.json(
        {
          success: true,
          user: userWithoutPass,
          accessToken,
        },
        { status: 200 }
      )
    }

    // If not dev login, return unauthorized
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
