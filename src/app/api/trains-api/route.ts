import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface Stop {
  name: string;
  stop_id: string;
  time: string;
}

interface TrainTrip {
  travelMode: string;
  title: string;
  duration: number;
  formattedDuration: string;
  startStop: Stop;
  endStop: Stop;
  stops: Stop[];
}

// Utility function to transform API data to TrainTrip format
const parseTrainTrip = (trip: any): TrainTrip => ({
  travelMode: trip.travel_mode,
  title: trip.title,
  duration: trip.duration,
  formattedDuration: trip.formatted_duration,
  startStop: {
    name: trip.start_stop.name,
    stop_id: trip.start_stop.stop_id,
    time: trip.start_stop.time,
  },
  endStop: {
    name: trip.end_stop.name,
    stop_id: trip.end_stop.stop_id,
    time: trip.end_stop.time,
  },
  stops: trip.stops.map((stop: any) => ({
    name: stop.name,
    stop_id: stop.stop_id,
    time: stop.time,
  })),
});

export async function POST(req: NextRequest) {
  try {
    const { origin, destination } = await req.json();

    console.log("Input parameters:", origin, destination);

    // Prepare API call URL
    const apiKey = process.env.NEXT_PUBLIC_SERP_API_KEY;
    const url = `${process.env.NEXT_PUBLIC_SERP_DOMAIN}?engine=google_maps_directions&start_addr=${encodeURIComponent(origin)}&end_addr=${encodeURIComponent(destination)}&travel_mode=3&api_key=${apiKey}`;

    // Call the SerpAPI
    const response = await fetch(url);
    const data = await response.json();
    console.log("Train search response:", data);

    // Check if directions are available
    if (!data.directions || data.directions.length === 0) {
      return NextResponse.json({ error: "No train routes found" }, { status: 404 });
    }

    // Extract the train trips information from the response
    const trainTrips = data;

    return NextResponse.json({ results: trainTrips }, { status: 200 });
  } catch (error) {
    console.error("Error fetching train data:", error);
    return NextResponse.json({ error: "Error fetching train data" }, { status: 500 });
  }
}
