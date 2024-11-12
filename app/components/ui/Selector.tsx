import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IconBuildingSkyscraper, IconPlane, IconUmbrella, IconCalendar } from '@tabler/icons-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { bg } from "date-fns/locale";
import { Hotel } from '@/types/hotel';

const hotelDestinations = ['Дубай', 'Анталия', 'Измир', 'Мароко', 'Хургада', 'Шарм ел Шейх'];
const holidayDestinations = ['Малдиви', 'Бали', 'Канкун', 'Саторни', 'Пхукет', 'Хавайи'];
const airports = ['София', 'Варна', 'Пловдив', 'Бургас',];
const nightsOptions = Array.from({length: 11}, (_, i) => i + 4);

interface SelectorProps {
    onSearch: (data: Hotel[]) => void;
  }

export default function Selector({ onSearch }: SelectorProps) {
  const [formData, setFormData] = useState({
    destination: '',
    departureAirport: '',
    checkIn: undefined,
    nights: 1,
    adults: 1,
    children: 0,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  
  const handleSearch = async () => {
    try {
      console.log('Sending search request with data:', formData); // Debug log
  
      const response = await fetch('/api/hotel-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
  
      const data = await response.json();
      console.log('Received hotel data:', data); // Debug log
      onSearch(data);
    } catch (error) {
      console.error('Error searching hotels:', error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Tabs defaultValue="hotels" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hotels" className="flex items-center gap-2">
            <IconBuildingSkyscraper size={20} /> Хотели
          </TabsTrigger>
          <TabsTrigger value="hotel-flight" className="flex items-center gap-2">
            <IconPlane size={20} /> Хотели + Полети
          </TabsTrigger>
          <TabsTrigger value="holiday" className="flex items-center gap-2">
            <IconUmbrella size={20} /> Екскурзии
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col lg:flex-row gap-4">

        <div className="flex flex-col gap-4 mx-auto">
        <TabsContent value="hotels">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div className="relative">
              <Select onValueChange={(value) => handleInputChange('destination', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Избери дестинация" />
                </SelectTrigger>
                <SelectContent className="absolute">
                  {hotelDestinations.map(dest => (
                    <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.checkIn && "text-muted-foreground"
                  )}
                >
                  <IconCalendar className="mr-2 h-4 w-4" />
                  {formData.checkIn ? format(formData.checkIn, "PPP", {locale: bg}) : <span>Избери дата</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.checkIn}
                  onSelect={(date) => handleInputChange('checkIn', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>


              <Select onValueChange={(value) => handleInputChange('nights', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Избери нощувки" />
                </SelectTrigger>
                <SelectContent>
                  {nightsOptions.map(nights => (
                    <SelectItem key={nights} value={nights.toString()}>{nights} нощувки</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Select onValueChange={(value) => handleInputChange('adults', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Възрастни" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 8}, (_, i) => i + 1).map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} възрастни</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleInputChange('children', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Деца" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Без деца</SelectItem>
                    {Array.from({length: 8}, (_, i) => i + 1).map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} деца</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hotel-flight">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">


            <Select onValueChange={(value) => handleInputChange('departureAirport', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Избери летище" />
              </SelectTrigger>
              <SelectContent>
                {airports.map(airport => (
                  <SelectItem key={airport} value={airport}>{airport}</SelectItem>
                ))}
              </SelectContent>
            </Select>


              <Select onValueChange={(value) => handleInputChange('destination', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Избери дестинация" />
                </SelectTrigger>
                <SelectContent>
                  {hotelDestinations.map(dest => (
                    <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                  ))}
                </SelectContent>
              </Select>


            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.checkIn && "text-muted-foreground"
                  )}
                >
                  <IconCalendar className="mr-2 h-4 w-4" />
                  {formData.checkIn ? format(formData.checkIn, "PPP", {locale: bg}) : <span>Избери дата</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.checkIn}
                  onSelect={(date) => handleInputChange('checkIn', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>


              <Select onValueChange={(value) => handleInputChange('nights', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Избери нощувки" />
                </SelectTrigger>
                <SelectContent>
                  {nightsOptions.map(nights => (
                    <SelectItem key={nights} value={nights.toString()}>{nights} нощувки</SelectItem>
                  ))}
                </SelectContent>
              </Select>


              <div className="flex gap-2">
                <Select onValueChange={(value) => handleInputChange('adults', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Възрастни" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: 8}, (_, i) => i + 1).map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} възрастни</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={(value) => handleInputChange('children', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Деца" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Без деца</SelectItem>
                    {Array.from({length: 8}, (_, i) => i + 1).map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} деца</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
          </div>

        </TabsContent>

        <TabsContent value="holiday">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select onValueChange={(value) => handleInputChange('departureAirport', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select airport" />
              </SelectTrigger>
              <SelectContent>
                {airports.map(airport => (
                  <SelectItem key={airport} value={airport}>{airport}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleInputChange('destination', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {holidayDestinations.map(dest => (
                  <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                ))}
              </SelectContent>
            </Select>


            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.checkIn && "text-muted-foreground"
                  )}
                >
                  <IconCalendar className="mr-2 h-4 w-4" />
                  {formData.checkIn ? format(formData.checkIn, "PPP", { locale: bg }) : <span>Избери дата</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.checkIn || undefined}
                  onSelect={(date) => handleInputChange('checkIn', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Input
              type="text"
              value="12 nights (10+2)"
              disabled
              className="bg-muted"
            />

            {/* Same guests inputs as other tabs */}
            {/* ... */}
          </div>
          
        </TabsContent>
        
        </div>

        <Button 
        className="mt-2 mx-4 " 
        onClick={handleSearch}
      >
        Търси
      </Button>
        </div>


      </Tabs>


    </div>
  );
}