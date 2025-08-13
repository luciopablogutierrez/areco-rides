"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon, Clock, DollarSign, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"

const formSchema = z.object({
  origen: z.string().min(1, "El origen es obligatorio."),
  destino: z.string().min(1, "El destino es obligatorio."),
  fecha: z.date({
    required_error: "La fecha del viaje es obligatoria.",
  }),
  hora: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:MM)."),
  asientos: z.coerce.number().min(1, "Debe haber al menos 1 asiento.").max(8, "No puedes ofrecer más de 8 asientos."),
  precio: z.coerce.number().min(0, "El precio no puede ser negativo."),
  descripcion: z.string().max(200, "La descripción no puede superar los 200 caracteres.").optional(),
})

export default function CreateTripPage() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            origen: "",
            destino: "",
            hora: "",
            asientos: 1,
            precio: 0,
            descripcion: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        toast({
          title: "¡Viaje Creado!",
          description: "Tu viaje ha sido publicado exitosamente.",
        })
        form.reset();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Publicar un nuevo viaje</CardTitle>
                    <CardDescription>Completa los detalles de tu viaje para que los pasajeros puedan encontrarte.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="origen"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Origen</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><MapPin className="inline-block mr-2 h-4 w-4 text-muted-foreground"/> <SelectValue placeholder="Selecciona un punto de partida" /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="San Antonio de Areco">San Antonio de Areco</SelectItem>
                                                    <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="destino"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Destino</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger><MapPin className="inline-block mr-2 h-4 w-4 text-muted-foreground"/> <SelectValue placeholder="Selecciona un destino" /></SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                                                    <SelectItem value="San Antonio de Areco">San Antonio de Areco</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="fecha"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Fecha del viaje</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                    >
                                                    {field.value ? (
                                                        format(field.value, "PPP", { locale: es })
                                                    ) : (
                                                        <span>Elige una fecha</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date(new Date().setHours(0, 0, 0, 0))
                                                    }
                                                    initialFocus
                                                    locale={es}
                                                />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="hora"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Hora de salida</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input placeholder="HH:MM" {...field} className="pl-9" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                             <div className="grid md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="asientos"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Asientos disponibles</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input type="number" placeholder="Ej: 3" {...field} className="pl-9" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="precio"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Precio por asiento</FormLabel>
                                        <FormControl>
                                             <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input type="number" placeholder="Ej: 2500" {...field} className="pl-9" />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="descripcion"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Descripción (Opcional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Agrega información útil: punto de encuentro, tipo de equipaje, si eres pet friendly, etc."
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" size="lg">Publicar Viaje</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
