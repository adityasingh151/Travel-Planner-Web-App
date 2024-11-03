import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import airportsData from '../../../../airportsData.json';

interface Airport {
  name: string;
  region_name: string;
  municipality: string;
  iata_code: string; // Ensure this property exists in your JSON
  score: number; // Added score property
}

// Utility function to check if a string contains a keyword
const matchesKeyword = (airportValue: string, searchTerm: string) => {
  const normalizedAirportValue = airportValue.toLowerCase();
  const normalizedSearchTerm = searchTerm.toLowerCase();
  return normalizedAirportValue.includes(normalizedSearchTerm) || 
         normalizedSearchTerm.includes(normalizedAirportValue);
};

// Function to find the best matching airport
const findBestMatchingAirport = (airports: Airport[], searchTerm: string): Airport | null => {
    const matchingAirports: Airport[] = [];
    const terms = searchTerm.split(/[, ]+/); // Split by comma or space
    const firstTerm = terms[0].toLowerCase(); // Get the first term and normalize it
  
    airports.forEach((airport) => {
      let totalScore = 0;
  
      // Score based on matches with name, region_name, or municipality
      // Exact match for name
      if (airport.name.toLowerCase() === firstTerm) {
        totalScore += 10; // Higher score for exact name match
      }
  
      if (matchesKeyword(airport.region_name, firstTerm)) totalScore += 1;
      if (matchesKeyword(airport.municipality, firstTerm)) totalScore += 1;
  
      // If there's a match, add the airport to the matching list
      if (totalScore > 0) {
        matchingAirports.push({
          ...airport,
          score: totalScore + airport.score // Include existing score
        });
      }
    });
  
    // If there are matching airports, return the one with the highest score
    if (matchingAirports.length > 0) {
      return matchingAirports.reduce((prev, current) => 
        (prev.score > current.score) ? prev : current
      );
    }
  
    return null; // Return null if no matches are found
  };
  

export async function POST(req: NextRequest) {
  try {
    const { origin, destination, departureDate, arrivalDate } = await req.json();

    console.log("Input parameters:", origin, destination, departureDate, arrivalDate);

    // Find the best matching airports for origin and destination
    const originAirport = findBestMatchingAirport(airportsData, origin);
    const destinationAirport = findBestMatchingAirport(airportsData, destination);

    // Check if airports were found
    if (!originAirport || !destinationAirport) {
      return NextResponse.json({ error: "Invalid origin or destination" }, { status: 400 });
    }

    const departureId = originAirport.iata_code;
    const arrivalId = destinationAirport.iata_code;
    console.log("Departure ID:", departureId, "Arrival ID:", arrivalId);

    // Call the flight search API
    const apiKey = process.env.NEXT_PUBLIC_SERP_API_KEY;
    const url = `${process.env.NEXT_PUBLIC_SERP_DOMAIN}?engine=google_flights&departure_id=${departureId}&arrival_id=${arrivalId}&outbound_date=${departureDate}&return_date=${arrivalDate}&currency=INR&hl=en&gl=in&type=1&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log("Best flights response:", data);

    if (!data.best_flights) {
      return NextResponse.json({ error: "No flights found" }, { status: 404 });
    }

    const flights = data.best_flights.map((flight: any) => ({
        airline: flight.flights[0].airline,
        flightNumber: flight.flights[0].flight_number,
        departureAirport: flight.flights[0].departure_airport.name,
        departureTime: flight.flights[0].departure_airport.time,
        arrivalAirport: flight.flights[0].arrival_airport.name,
        arrivalTime: flight.flights[0].arrival_airport.time,
        duration: flight.flights[0].duration,
        price: flight.price || 'N/A',
        roundType: flight.type, // Added roundType
        airlineLogo: flight.airline_logo, // Added airlineLogo
      }));
      

    return NextResponse.json({ results: flights }, { status: 200 });
  } catch (error) {
    console.error("Error fetching flights data:", error);
    return NextResponse.json({ error: "Error fetching flights data" }, { status: 500 });
  }
}
