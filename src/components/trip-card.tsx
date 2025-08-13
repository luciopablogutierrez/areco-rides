import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { Viaje } from '@/lib/types';
import { ArrowRight, Calendar, Clock, Users, DollarSign, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from './ui/badge';

interface TripCardProps {
  trip: Viaje;
}

export function TripCard({ trip }: TripCardProps) {
  const tripDate = format(trip.fecha, 'PPP', { locale: es });
  const agetaViajeStatusVariant = () => {
    switch (trip.estado) {
      case 'disponible':
        return 'default';
      case 'completo':
        return 'destructive';
      case 'cancelado':
        return 'outline';
      case 'finalizado':
        return 'secondary';
      default:
        return 'default';
    }
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-4 bg-muted/50">
        <CardTitle className="flex items-center justify-between font-headline text-xl">
          <div className="flex items-center gap-2 truncate">
            <MapPin className="h-5 w-5 text-accent shrink-0"/>
            <span className="truncate">{trip.origen}</span>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mx-2" />
          <div className="flex items-center gap-2 truncate">
            <span className="truncate">{trip.destino}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-foreground">
            <Calendar className="h-5 w-5 text-primary" />
            <span className="font-medium">{tripDate}</span>
          </div>
          <div className="flex items-center gap-3 text-foreground">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-medium">{trip.hora} hs</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 text-foreground">
              <Users className="h-5 w-5 text-primary" />
              <span>
                <span className="font-bold text-lg">{trip.asientosDisponibles}</span>
                <span className="text-muted-foreground">/{trip.asientosTotales} asientos</span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="font-bold text-lg">${trip.precio.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Badge variant={agetaViajeStatusVariant()}>{trip.estado}</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={trip.conductorAvatarUrl} alt={trip.conductorNombre} data-ai-hint="person" />
            <AvatarFallback>{trip.conductorNombre.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{trip.conductorNombre}</p>
            <p className="text-xs text-muted-foreground">Conductor</p>
          </div>
        </div>
        <Button asChild>
          <Link href={`/trips/${trip.id}`}>Ver Viaje</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
