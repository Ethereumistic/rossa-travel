import Amadeus from 'amadeus';
import { NextResponse } from 'next/server';

// Initialize the Amadeus client
const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { destination } = body;

    // Convert destination to IATA city code
    const cityCode = getCityCode(destination);
    
    if (!cityCode) {
      return NextResponse.json(
        { error: 'Invalid destination' },
        { status: 400 }
      );
    }

    console.log('Searching for hotels in city:', cityCode);

    // Simplified request with minimal parameters
    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode,
      radius: 15,
      radiusUnit: 'KM',
      hotelSource: 'ALL'
    });

    if (!response.data || response.data.length === 0) {
      return NextResponse.json(
        { 
          error: 'No hotels found', 
          details: 'No hotels found in the specified city' 
        },
        { status: 404 }
      );
    }
    console.log('Raw hotel data:', response.data[0]);
    // Transform the response to include only necessary data
    const hotels = response.data.map(hotel => ({
        id: hotel.hotelId,
        name: hotel.name,
        location: {
          latitude: hotel.geoCode.latitude,
          longitude: hotel.geoCode.longitude
        },
        country: hotel.address.countryCode,
        distance: hotel.distance,

      }));

    console.log('Transformed hotels:', hotels); // Debug log
    return NextResponse.json(hotels);

  } catch (error: unknown) {
    console.error('Error fetching hotels:', error);
    
    // Handle Amadeus specific errors
    if (error && typeof error === 'object' && 'response' in error) {
      const amadeusError = error as { 
        response: { 
          body: string,
          statusCode: number 
        } 
      };
      
      try {
        const errorBody = JSON.parse(amadeusError.response.body);
        return NextResponse.json(
          { 
            error: 'Amadeus API Error',
            details: errorBody.errors?.[0]?.detail || errorBody.errors?.[0]?.title || 'Unknown error',
            code: errorBody.errors?.[0]?.code
          },
          { status: amadeusError.response.statusCode }
        );
      } catch {
        return NextResponse.json(
          { 
            error: 'Failed to fetch hotels',
            details: 'Internal server error'
          },
          { status: 500 }
        );
      }
    }

    const errorMessage = error instanceof Error 
      ? error.message
      : 'An unknown error occurred';

    return NextResponse.json(
      { 
        error: 'Failed to fetch hotels', 
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}

function getCityCode(cityName: string): string {
  const cityMap: Record<string, string> = {
    'Дубай': 'DXB',
    'Анталия': 'AYT',
    'Измир': 'ADB',
    'Мароко': 'CMN', // Casablanca
    'Хургада': 'HRG',
    'Шарм ел Шейх': 'SSH',
    'Малдиви': 'MLE',
    'Бали': 'DPS',
    'Канкун': 'CUN',
    'Саторни': 'JTR', // Santorini
    'Пхукет': 'HKT',
    'Хавайи': 'HNL', // Honolulu
  };
  return cityMap[cityName] || '';
}