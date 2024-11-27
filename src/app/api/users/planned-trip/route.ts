import { NextResponse } from 'next/server';
import connect from '@/dbConfig/dbConfig'; // Adjust path as necessary
import User from '@/models/userModel'; // Adjust path as necessary

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, plannedTrip } = body;
    console.log("Planned Trip: ", plannedTrip)

    // console.log('Planned Trip:', plannedTrip);
    // console.log('Email:', email);

    if (!email || !plannedTrip) {
      return NextResponse.json(
        { error: 'Missing required fields: email or plannedTrip' },
        { status: 400 }
      );
    }

    // Validate plannedTrip structure
    const requiredFields = ['destination', 'startDate', 'endDate'];
    for (const field of requiredFields) {
      if (!plannedTrip[field]) {
        return NextResponse.json(
          { error: `Missing required field in plannedTrip: ${field}` },
          { status: 400 }
        );
      }
    }

    await connect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!Array.isArray(user.plannedTrips)) {
      user.plannedTrips = []; // Initialize if undefined
    }

    // Ensure optional fields have default values if not provided
    const sanitizedTrip = {
      destination: plannedTrip.destination,
      startDate: new Date(plannedTrip.startDate),
      endDate: new Date(plannedTrip.endDate),
      accommodation: plannedTrip.accommodation || 'Not specified',
      activities: plannedTrip.activities || [],
      status: plannedTrip.status || 'upcoming',
      name: plannedTrip.name || 'Anonymous',
      tickets: plannedTrip.tickets || 1,
      phone: plannedTrip.phone || 'Not provided',
      chosenItems: plannedTrip.plannedTrips[0].chosenItems || [],
    };
    
    console.log("Planned Trip4: ", plannedTrip.plannedTrips[0].chosenItems)
    user.plannedTrips.push(sanitizedTrip);
    // console.log("Planned Trip2: ", user.plannedTrips)

    await user.save();

    return NextResponse.json(
      { message: 'Trip added successfully', plannedTrip: sanitizedTrip },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving planned trip:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
