import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    // Retrieve the token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token provided", success: false }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);

    if (!decoded || typeof decoded !== 'object' || !decoded.email) {
      return NextResponse.json({ message: "Invalid token", success: false }, { status: 401 });
    }

    // Find the user in the database using the email from the token
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    // Return the firstName to the client
    return NextResponse.json({
      success: true,
      firstName: user.firstName, // Send only the firstName to the client
    });

  } catch (error: any) {
    return NextResponse.json({ message: error.message, success: false }, { status: 500 });
  }
}
