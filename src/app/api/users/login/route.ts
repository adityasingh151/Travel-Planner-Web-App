import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({message:"User doesn't exist, please register first"}, {status:400})
        }
        console.log("User exists!")

        const validPassword = await bcryptjs.compare(password, user.password)
        console.log(validPassword)
        if(!validPassword) {
            return NextResponse.json({message:"Incorrect credentials"},{ status:400})
        }

        const tokenData = {
            id: user._id,
            email:user.email,
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:'1d'})

        const response = NextResponse.json({
            message: "Login Successful",
            success: true
        })

        response.cookies.set("token",token, { //only backend can change the token, not frontend(normal user)
            httpOnly:true
        })

        return response

    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
}