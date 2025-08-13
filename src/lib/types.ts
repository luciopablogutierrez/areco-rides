export interface User {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  calificacion: number;
  viajesComoCondcutor: number;
  viajesComoPasajero: number;
  fechaRegistro: Date;
  avatarUrl?: string;
}

export interface Pasajero {
  usuarioId: string;
  nombre:string;
  telefono: string;
  asientosReservados: number;
  avatarUrl?: string;
}

export interface Viaje {
  id: string;
  conductorId: string;
  conductorNombre: string;
  conductorTelefono: string;
  conductorAvatarUrl?: string;
  origen: "San Antonio de Areco" | "Buenos Aires";
  destino: "Buenos Aires" | "San Antonio de Areco";
  fecha: Date;
  hora: string; // e.g., "14:30"
  asientosTotales: number;
  asientosDisponibles: number;
  precio: number;
  descripcion: string;
  estado: "disponible" | "completo" | "cancelado" | "finalizado";
  pasajeros: Pasajero[];
  fechaCreacion: Date;
}

export interface Reserva {
    id: string;
    viajeId: string;
    pasajeroId: string;
    asientosReservados: number;
    estado: "pendiente" | "confirmada" | "cancelada";
    fechaReserva: Date;
}
