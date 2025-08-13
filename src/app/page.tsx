'use client';

import { useState } from 'react';
import { TripCard } from '@/components/trip-card';
import { trips as allTrips } from '@/lib/data';
import type { Viaje } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';

export default function Home() {
  const [trips, setTrips] = useState<Viaje[]>(allTrips);
  const [origin, setOrigin] = useState<string>('all');
  const [destination, setDestination] = useState<string>('all');
  const [date, setDate] = useState<Date | undefined>();

  const handleSearch = () => {
    let filteredTrips = allTrips;

    if (origin !== 'all') {
      filteredTrips = filteredTrips.filter((trip) => trip.origen === origin);
    }

    if (destination !== 'all') {
      filteredTrips = filteredTrips.filter((trip) => trip.destino === destination);
    }
    
    if (date) {
        filteredTrips = filteredTrips.filter(
          (trip) => format(trip.fecha, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        );
    }

    setTrips(filteredTrips);
  };

  const handleReset = () => {
    setOrigin('all');
    setDestination('all');
    setDate(undefined);
    setTrips(allTrips);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground mb-2">
          Encontrá tu próximo viaje
        </h1>
        <p className="text-muted-foreground text-lg">
          Viajes compartidos entre San Antonio de Areco y Buenos Aires.
        </p>
      </div>

      <Card className="mb-8 shadow-lg bg-card/80 backdrop-blur-sm">
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Origen</label>
              <Select value={origin} onValueChange={setOrigin}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar origen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los orígenes</SelectItem>
                  <SelectItem value="San Antonio de Areco">San Antonio de Areco</SelectItem>
                  <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Destino</label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar destino" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los destinos</SelectItem>
                  <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                  <SelectItem value="San Antonio de Areco">San Antonio de Areco</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Fecha</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2">
                <Button onClick={handleSearch} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Buscar
                </Button>
                 <Button onClick={handleReset} variant="secondary" className="w-full">
                    Limpiar
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {trips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No se encontraron viajes con esos criterios.</p>
        </div>
      )}
    </div>
  );
}
