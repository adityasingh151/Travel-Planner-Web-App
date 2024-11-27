import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import airportsData from '../../../../airportsData.json';

interface Airport {
  name: string;
  region_name: string;
  municipality: string;
  iata_code: string;
  score: number;
}

interface Flight {
  flights: Array<{
    airline: string;
    flight_number: string;
    departure_airport: {
      name: string;
      time: string;
    };
    arrival_airport: {
      name: string;
      time: string;
    };
    duration: string;
  }>;
  price?: string;
  type: string;
  airline_logo?: string;
}

const matchesKeyword = (airportValue: string, searchTerm: string) => {
  const normalizedAirportValue = airportValue.toLowerCase();
  const normalizedSearchTerm = searchTerm.toLowerCase();
  return (
    normalizedAirportValue.includes(normalizedSearchTerm) ||
    normalizedSearchTerm.includes(normalizedAirportValue)
  );
};

const findBestMatchingAirport = (airports: Airport[], searchTerm: string): Airport | null => {
  const matchingAirports: Airport[] = [];
  const terms = searchTerm.split(/[, ]+/);
  const firstTerm = terms[0].toLowerCase();

  airports.forEach((airport) => {
    let totalScore = 0;

    if (airport.name.toLowerCase() === firstTerm) {
      totalScore += 10;
    }

    if (matchesKeyword(airport.region_name, firstTerm)) totalScore += 1;
    if (matchesKeyword(airport.municipality, firstTerm)) totalScore += 1;

    if (totalScore > 0) {
      matchingAirports.push({
        ...airport,
        score: totalScore + airport.score,
      });
    }
  });

  if (matchingAirports.length > 0) {
    return matchingAirports.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );
  }

  return null;
};

export async function POST(req: NextRequest) {
  try {
    const { origin, destination, departureDate, arrivalDate } = await req.json();

    console.log('Input parameters:', origin, destination, departureDate, arrivalDate);

    const originAirport = findBestMatchingAirport(airportsData, origin);
    const destinationAirport = findBestMatchingAirport(airportsData, destination);

    if (!originAirport || !destinationAirport) {
      return NextResponse.json({ error: 'Invalid origin or destination' }, { status: 400 });
    }

    const departureId = originAirport.iata_code;
    const arrivalId = destinationAirport.iata_code;
    console.log('Departure ID:', departureId, 'Arrival ID:', arrivalId);

    const apiKey = process.env.NEXT_PUBLIC_SERP_API_KEY;
    const url = `${process.env.NEXT_PUBLIC_SERP_DOMAIN}?engine=google_flights&departure_id=${departureId}&arrival_id=${arrivalId}&outbound_date=${departureDate}&return_date=${arrivalDate}&currency=INR&hl=en&gl=in&type=1&key=${apiKey}`;

    const response = await fetch(url);
    const data: { best_flights?: Flight[] } = await response.json();
    console.log('Best flights response:', data);

    if (!data.best_flights) {
      return NextResponse.json({ error: 'No flights found' }, { status: 404 });
    }

    const flights = data.best_flights.map((flight: Flight) => ({
      airline: flight.flights[0].airline,
      flightNumber: flight.flights[0].flight_number,
      departureAirport: flight.flights[0].departure_airport.name,
      departureTime: flight.flights[0].departure_airport.time,
      arrivalAirport: flight.flights[0].arrival_airport.name,
      arrivalTime: flight.flights[0].arrival_airport.time,
      duration: flight.flights[0].duration,
      price: flight.price || 'N/A',
      roundType: flight.type,
      airlineLogo: flight.airline_logo,
    }));

    return NextResponse.json({ results: flights }, { status: 200 });
  } catch (error) {
    console.error('Error fetching flights data:', error);
    return NextResponse.json({ error: 'Error fetching flights data' }, { status: 500 });
  }
}
