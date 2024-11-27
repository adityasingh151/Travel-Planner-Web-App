import { NextResponse } from 'next/server';
import connect from '@/dbConfig/dbConfig'; // Adjust path as necessary
import User from '@/models/userModel'; // Adjust path as necessary

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Missing required field: email' },
        { status: 400 }
      );
    }

    await connect();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return the user's information, excluding sensitive fields like password
    const { plannedTrips, ...rest } = user.toObject(); // Adjust fields as necessary
    return NextResponse.json(
      { user: { ...rest, plannedTrips } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
