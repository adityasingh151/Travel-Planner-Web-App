import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { destinationCity, checkInDate, checkOutDate, guests } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_SERP_API_KEY;
    const serpDomain = process.env.NEXT_PUBLIC_SERP_DOMAIN;

    const url = `${serpDomain}?engine=google_hotels&q=${destinationCity}&check_in_date=${checkInDate}&check_out_date=${checkOutDate}&adults=${guests}&currency=INR&gl=us&hl=en&api_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching hotels data:", error);
    return NextResponse.json({ error: "Error fetching hotels data" }, { status: 500 });
  }
}
