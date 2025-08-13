import { trips } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, DollarSign, Users, MapPin, Phone, Star } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const trip = trips.find((t) => t.id === params.id);

  if (!trip) {
    notFound();
  }
  
  const tripDate = format(trip.fecha, 'EEEE, d \'de\' MMMM \'de\' yyyy', { locale: es });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card className="overflow-hidden shadow-lg">
                <div className="relative h-64 w-full">
                    <Image
                        src="https://placehold.co/800x400.png"
                        alt={`Ruta de ${trip.origen} a ${trip.destino}`}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="road trip"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                        <h1 className="font-headline text-4xl font-bold text-white">{trip.origen} → {trip.destino}</h1>
                        <p className="text-xl text-white/90">{tripDate}</p>
                    </div>
                </div>
                <CardContent className="p-6 space-y-6">
                    <div>
                        <h2 className="font-headline text-2xl font-semibold mb-4">Detalles del Viaje</h2>
                        <div className="grid grid-cols-2 gap-4 text-base">
                            <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-primary"/><span>Salida a las <strong>{trip.hora} hs</strong></span></div>
                            <div className="flex items-center gap-3"><DollarSign className="h-5 w-5 text-primary"/><span><strong>${trip.precio.toLocaleString('es-AR')}</strong> por asiento</span></div>
                            <div className="flex items-center gap-3"><Users className="h-5 w-5 text-primary"/><span><strong>{trip.asientosDisponibles} de {trip.asientosTotales}</strong> asientos libres</span></div>
                            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary"/><span>Desde <strong>{trip.origen}</strong></span></div>
                        </div>
                    </div>
                    {trip.descripcion && (
                        <div>
                             <h3 className="font-headline text-lg font-semibold mb-2">Descripción</h3>
                             <p className="text-muted-foreground">{trip.descripcion}</p>
                        </div>
                    )}
                     <div>
                        <h3 className="font-headline text-lg font-semibold mb-4">Pasajeros ({trip.pasajeros.length})</h3>
                        {trip.pasajeros.length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            {trip.pasajeros.map(p => (
                                <div key={p.usuarioId} className="flex items-center gap-2">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={p.avatarUrl} alt={p.nombre} data-ai-hint="person portrait" />
                                        <AvatarFallback>{p.nombre.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{p.nombre}</span>
                                </div>
                            ))}
                        </div>
                        ) : (
                            <p className="text-muted-foreground text-sm">Sé el primero en reservar.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Conductor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={trip.conductorAvatarUrl} alt={trip.conductorNombre} data-ai-hint="driver person" />
                            <AvatarFallback>{trip.conductorNombre.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">{trip.conductorNombre}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="h-4 w-4 text-amber-400 fill-amber-400"/>
                                <span>{trip.conductorId === 'user_1' ? '4.8' : '4.9'} de calificación</span>
                            </div>
                        </div>
                    </div>
                    <Separator />
                     <div className="flex justify-around">
                        <Link href={`https://wa.me/${trip.conductorTelefono}`} target="_blank" className="text-center group">
                            <WhatsAppIcon className="h-8 w-8 text-green-500 mx-auto transition-transform group-hover:scale-110"/>
                            <span className="text-xs text-muted-foreground">WhatsApp</span>
                        </Link>
                         <Link href={`tel:${trip.conductorTelefono}`} className="text-center group">
                            <Phone className="h-8 w-8 text-primary mx-auto transition-transform group-hover:scale-110"/>
                            <span className="text-xs text-muted-foreground">Llamar</span>
                        </Link>
                    </div>
                </CardContent>
            </Card>
            <div className="sticky top-24">
                <Card className="text-center shadow-lg bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="font-headline">¿Quieres unirte?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {trip.estado === 'disponible' ? (
                            <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                Reservar 1 asiento por ${trip.precio.toLocaleString('es-AR')}
                            </Button>
                        ) : (
                            <Badge variant="destructive" className="text-lg px-4 py-2">Viaje Completo</Badge>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
