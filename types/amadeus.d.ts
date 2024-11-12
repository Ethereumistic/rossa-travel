declare module 'amadeus' {
    interface Media {
        url: string; // Assuming the media object has a 'url' property
    }

    interface HotelLocation {
        chainCode: string;
        iataCode: string;
        dupeId: number;
        name: string;
        hotelId: string;
        geoCode: {
            latitude: number;
            longitude: number;
        };
        address: {
            countryCode: string;
        };
        distance?: {
            value: number;
            unit: string;
        };
    }

    interface AmadeusResponse {
        data: HotelLocation[];
        meta?: {
            count: number;
            links: {
                self: string;
            };
        };
    }

    export default class Amadeus {
        constructor(options: {
            clientId: string | undefined;
            clientSecret: string | undefined;
        });

        referenceData: {
            locations: {
                hotels: {
                    byCity: {
                        get(params: {
                            cityCode: string;
                            radius?: number;
                            radiusUnit?: 'KM' | 'MILE';
                            amenities?: string[];
                            ratings?: string[];
                            hotelSource?: 'BEDBANK' | 'DIRECTCHAIN' | 'ALL';
                        }): Promise<AmadeusResponse>;
                    };
                };
            };
        };
    }
}