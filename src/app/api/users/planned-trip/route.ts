import { NextResponse } from 'next/server';
import connect from '@/dbConfig/dbConfig'; // Adjust path as necessary
import User from '@/models/userModel';; // Adjust path as necessary

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, plannedTrip } = body;
    console.log(email)

    if (!email || !plannedTrip) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!user.plannedTrips) {
      user.plannedTrips = []; // Initialize if undefined
    }
    user.plannedTrips.push(plannedTrip);

    await user.save();

    return NextResponse.json({ message: 'Trip added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving planned trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
