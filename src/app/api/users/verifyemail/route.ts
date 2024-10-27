import connect from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextResponse, NextRequest } from 'next/server'

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        // console.log(token)

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt:new Date().getTime()}})

        if(!user) {
            return NextResponse.json({message:"Invalid token"},{status:400})
        }

        console.log(user)

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({message:"Email verified successfully", email:user.email},{status:200})

    } catch (error:any) {
     return NextResponse.json({message: error.message},{status:500})   
    }
}