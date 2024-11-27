import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
    try {
      const reqBody = await request.json();
      const { email, password } = reqBody;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return NextResponse.json(
          { message: "User doesn't exist, please register first" },
          { status: 400 }
        );
      }
  
      if (!user.isVerified) {
        return NextResponse.json(
          { message: "User is NOT verified, please verify your account first" },
          { status: 400 }
        );
      }
  
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json(
          { message: "Incorrect email or password" },
          { status: 400 }
        );
      }
  
      const tokenData = {
        id: user._id,
        name: user.firstName,
        email: user.email,
        profilePicture: user.profilePicture,
      };
  
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });
  
      const response = NextResponse.json({
        message: "Login Successful",
        id: user._id,
        name: user.firstName,
        email: user.email,
        profilePicture: user.profilePicture,
        success: true,
      });
  
      response.cookies.set("token", token, {
        httpOnly: true,
      });
  
      return response;
    } catch (error: any) {
      console.error("API error:", error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
  