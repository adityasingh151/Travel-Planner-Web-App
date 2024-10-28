import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

// Establish a connection to the database
connect();

export async function POST(request: NextRequest) {
  try {
      // Parse the request body to extract the email
      const reqBody = await request.json();
      console.log("google-signin",reqBody)
    const { email } = reqBody;

    // Check if a user with the provided email exists in the database
    const user = await User.findOne({ email });

    // If the user does not exist, return a 404 response with an appropriate message
    if (!user) {
      return NextResponse.json(
        { message: "User doesn't exist, please register first", status:400 },
        // { status: 404 }
      );
    }

    // If the user exists, return a success response with the user details
    return NextResponse.json(
      {
        message: "User exists",
        exists: true,
        id: user._id,
        name: user.firstName,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle any errors that occur during the process
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
