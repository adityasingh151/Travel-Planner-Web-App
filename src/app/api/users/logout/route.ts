import { NextResponse } from "next/server";

export function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });

    // Clear the "token" cookie by setting it with an expired date
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: unknown) {
    // Narrow down the error type
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
      },
      {
        status: 500,
      }
    );
  }
}
