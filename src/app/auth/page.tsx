import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Link from "next/link"

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Ingresar</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <Card>
            <CardHeader>
                <CardTitle className="font-headline">Bienvenido de vuelta</CardTitle>
                <CardDescription>
                Ingresa tus datos para acceder a tu cuenta.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input id="email-login" type="email" placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password-login">Contraseña</Label>
                <Input id="password-login" type="password" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Ingresar</Button>
            </CardFooter>
            </Card>
        </TabsContent>
        <TabsContent value="register">
            <Card>
            <CardHeader>
                <CardTitle className="font-headline">Crear una cuenta</CardTitle>
                <CardDescription>
                Completa tus datos para unirte a Areco Rides.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" placeholder="Tu nombre y apellido" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" type="tel" placeholder="1122334455" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email-register">Email</Label>
                    <Input id="email-register" type="email" placeholder="tu@email.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password-register">Contraseña</Label>
                    <Input id="password-register" type="password" />
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button className="w-full">Registrarse</Button>
                <p className="text-xs text-muted-foreground text-center">Al registrarte, aceptas nuestros <Link href="#" className="underline">Términos y Condiciones</Link>.</p>
            </CardFooter>
            </Card>
        </TabsContent>
        </Tabs>
    </div>
  )
}
