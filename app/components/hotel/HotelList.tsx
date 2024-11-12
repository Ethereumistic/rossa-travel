import { Hotel } from '@/types/hotel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HotelListProps {
  hotels: Hotel[];
}

export default function HotelList({ hotels }: HotelListProps) {
  if (!hotels.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No hotels found. Try different search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {hotels.map((hotel) => (
        <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{hotel.name}</CardTitle>

          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Country: {hotel.country}
              </p>
              {hotel.distance && (
                <p className="text-sm text-gray-500">
                  Distance from center: {hotel.distance.value} {hotel.distance.unit}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Location: {hotel.location.latitude}, {hotel.location.longitude}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}