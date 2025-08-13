import { users, trips } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Star, Car, User as UserIcon, Edit } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TripCard } from '@/components/trip-card';
import Link from 'next/link';

export default function ProfilePage() {
  const user = users[0]; // Mock user data
  const driverTrips = trips.filter(t => t.conductorId === user.id);
  const passengerTrips = trips.filter(t => t.pasajeros.some(p => p.usuarioId === user.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <Card className="shadow-lg">
            <CardHeader className="items-center text-center relative">
              <Link href="/auth" className='absolute top-4 right-4'>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatarUrl} alt={user.nombre} data-ai-hint="person"/>
                <AvatarFallback className="text-3xl">{user.nombre.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-2xl">{user.nombre}</CardTitle>
              <CardDescription>Miembro desde {user.fechaRegistro.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{user.telefono}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3"><Star className="h-5 w-5 text-amber-400" /> <span>Calificación</span></div>
                    <span className="font-bold">{user.calificacion}/5</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3"><Car className="h-5 w-5 text-primary" /> <span>Viajes como conductor</span></div>
                    <span className="font-bold">{user.viajesComoCondcutor}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3"><UserIcon className="h-5 w-5 text-accent" /> <span>Viajes como pasajero</span></div>
                    <span className="font-bold">{user.viajesComoPasajero}</span>
                </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
            <h2 className="font-headline text-3xl font-bold mb-4" id="my-trips">Mis Viajes</h2>
            <Tabs defaultValue="driver" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="driver">Como Conductor</TabsTrigger>
                    <TabsTrigger value="passenger">Como Pasajero</TabsTrigger>
                </TabsList>
                <TabsContent value="driver" className="mt-6">
                    {driverTrips.length > 0 ? (
                        <div className="space-y-6">
                            {driverTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">No has publicado ningún viaje.</p>
                    )}
                </TabsContent>
                <TabsContent value="passenger" className="mt-6">
                     {passengerTrips.length > 0 ? (
                        <div className="space-y-6">
                            {passengerTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">No has participado en ningún viaje.</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}
