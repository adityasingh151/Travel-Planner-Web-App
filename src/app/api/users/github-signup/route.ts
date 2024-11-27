import User from '@/models/userModel';
import connect from '@/dbConfig/dbConfig';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string;
    isVerified: boolean;
}

// Connect to the database outside the handler to reuse the connection

export async function POST(req: Request) {
    try {
        await connect();
        const body = await req.json(); // Parse the incoming JSON body
        console.log(body);

        const { firstName, lastName, email, password, profilePicture, isVerified }: UserData = body;

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
        }

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            profilePicture,
            isVerified,
        });

        // Save the user to MongoDB
        await newUser.save();

        return new Response(JSON.stringify({ message: 'User registered successfully via GitHub' }), { status: 201 });
    } catch (error) {
        console.error('Error registering user via GitHub:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}
