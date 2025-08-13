# Documentación del Sistema: Areco Rides

## Descripción del Proyecto

Areco Rides es una aplicación web diseñada para reemplazar el sistema actual de coordinación de viajes compartidos entre San Antonio de Areco y Buenos Aires, basado en WhatsApp. El objetivo es proporcionar una plataforma organizada y funcional para la gestión de viajes, usuarios y comunicación, mejorando la eficiencia y la experiencia de los usuarios.

## Funcionalidades Principales

El sistema está diseñado para cubrir las siguientes áreas funcionales:

### 1. Gestión de Viajes

-   **Crear viaje**: Permite a los conductores ofrecer viajes completando un formulario con detalles como origen, destino, fecha, hora, asientos disponibles, y precio.
-   **Buscar viajes**: Facilita a los pasajeros encontrar viajes disponibles mediante filtros por origen, destino y fecha.
-   **Ver detalles**: Muestra información completa sobre un viaje específico, incluyendo detalles del conductor y la descripción del viaje.
-   **Gestionar asientos**: Controla la disponibilidad de asientos en tiempo real a medida que se realizan reservas.

### 2. Sistema de Usuarios

-   **Registro/Login**: Permite a los usuarios autenticarse en el sistema utilizando email y/o número de teléfono.
-   **Perfil de usuario**: Cada usuario tiene un perfil donde se almacena información personal como nombre, teléfono, calificación (futuro), historial de viajes.
-   **Roles**: El sistema contempla dos roles principales: Conductor y Pasajero, aunque un usuario puede asumir ambos roles.

### 3. Comunicación

-   **Chat interno**: (Pendiente) Implementación de un sistema de mensajería dentro de la aplicación para facilitar la comunicación entre conductor y pasajeros.
-   **Notificaciones**: (Pendiente) Sistema para enviar notificaciones sobre confirmaciones, cambios, y recordatorios de viajes y reservas.
-   **Contacto directo**: Permite el contacto directo entre conductor y pasajeros fuera de la plataforma, potencialmente a través de enlaces a WhatsApp o llamadas.

## Estructura de Datos (Firestore)

La estructura de datos en Firestore sigue el modelo propuesto en el prompt:

### Colección: `usuarios`

Almacena la información de cada usuario registrado.

```javascript
{
  id: "user_id", // UID de Firebase Auth
  nombre: "string",
  email: "string", // Puede ser opcional si se registra solo con teléfono
  telefono: "string", // Requiere verificación
  calificacion: "number", // (Pendiente: Sistema de calificación)
  viajesComoCondcutor: "number", // Contador (Pendiente: Actualización automática)
  viajesComoPasajero: "number", // Contador (Pendiente: Actualización automática)
  fechaRegistro: "timestamp"
}
```

### Colección: `viajes`

Almacena la información de cada viaje ofrecido.

```javascript
{
  id: "viaje_id", // ID generado por Firestore
  conductorId: "user_id", // Referencia al usuario conductor
  conductorNombre: "string",
  conductorTelefono: "string",
  origen: "San Antonio de Areco" | "Buenos Aires",
  destino: "Buenos Aires" | "San Antonio de Areco",
  fecha: "date",
  hora: "time",
  asientosTotales: "number",
  asientosDisponibles: "number",
  precio: "number",
  descripcion: "string",
  estado: "disponible" | "completo" | "cancelado" | "finalizado", // (Pendiente: Lógica de actualización de estado)
  pasajeros: [ // (Pendiente: Implementación completa para registrar pasajeros asociados a un viaje)
    {
      usuarioId: "user_id",
      nombre: "string",
      telefono: "string",
      asientosReservados: "number"
    }
  ],
  fechaCreacion: "timestamp"
}
```
**Nota:** La estructura `pasajeros` dentro de la colección `viajes` está definida en el prompt pero aún no está completamente implementada en la lógica de reservas. La colección `reservas` gestiona las solicitudes de reserva.

### Colección: `reservas`

Almacena las solicitudes de reserva realizadas por los pasajeros.

```javascript
{
  id: "reserva_id", // ID generado por Firestore
  viajeId: "viaje_id", // Referencia al viaje
  pasajeroId: "user_id", // Referencia al usuario pasajero
  asientosReservados: "number",
  estado: "pendiente" | "confirmada" | "cancelada", // (Pendiente: Lógica de confirmación/cancelación por el conductor)
  fechaReserva: "timestamp"
}
```

## Reglas de Seguridad (Firestore Rules)

Las reglas de seguridad de Firestore están configuradas para controlar el acceso a los datos según el modelo propuesto:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios pueden leer y escribir su propio perfil
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Viajes son públicos para lectura (usuarios autenticados)
    // Creación permitida solo para el conductor del viaje
    // Actualización permitida para el conductor o pasajeros del viaje (Pendiente: Ajuste para pasajeros)
    match /viajes/{viajeId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.auth.uid == resource.data.conductorId;
      allow update: if request.auth != null && 
        (request.auth.uid == resource.data.conductorId /* || 
         request.auth.uid in resource.data.pasajeros[].usuarioId */); // La lógica para pasajeros en update necesita refinarse con la colección 'reservas'
    }
    
    // Reservas pueden ser leídas y escritas por cualquier usuario autenticado
    match /reservas/{reservaId} {
      allow read, write: if request.auth != null;
    }
  }
}
```
**Nota:** Las reglas para actualizar viajes por parte de los pasajeros basadas en la estructura `pasajeros` dentro de `viajes` pueden requerir ajuste una vez que la lógica de reserva y la colección `reservas` estén completamente integradas con la actualización del documento de viaje.

## Funciones Cloud (Principales)

Las siguientes funciones cloud son cruciales para la lógica de negocio del sistema, aunque su implementación completa aún está pendiente:

### 1. `onReservaCreate`

-   **Propósito:** Actualizar los asientos disponibles del viaje correspondiente cuando se crea una nueva reserva.
-   **Acciones:**
    -   Disminuir el contador `asientosDisponibles` en el documento del viaje asociado.
    -   (Pendiente) Enviar una notificación al conductor sobre la nueva reserva.
    -   (Pendiente) Implementar lógica para verificar si hay suficientes asientos antes de "confirmar" una reserva (el estado inicial es "pendiente").

### 2. `onReservaUpdate`

-   **Propósito:** Manejar cambios en el estado de una reserva (ej. confirmada, cancelada).
-   **Acciones:**
    -   (Pendiente) Si la reserva es cancelada, aumentar el contador `asientosDisponibles` en el documento del viaje.
    -   (Pendiente) Actualizar el estado del viaje si, por ejemplo, todos los asientos se reservan (`estado: "completo"`).
    -   (Pendiente) Notificar los cambios de estado a los involucrados (conductor y pasajero).

### 3. `sendNotification`

-   **Propósito:** Sistema genérico para enviar notificaciones a los usuarios.
-   **Acciones:**
    -   (Pendiente) Integración con servicios de notificaciones push (ej. Firebase Cloud Messaging).
    -   (Pendiente) Posible integración con servicios de mensajería externos para notificaciones (aunque el prompt menciona enlaces a WhatsApp).

## Interfaz de Usuario (Componentes Principales)

La interfaz de usuario se estructura en torno a las siguientes páginas y componentes reutilizables:

### Páginas

1.  **Dashboard (`src/app/page.tsx`)**: La vista principal que probablemente listará los viajes disponibles.
2.  **Crear Viaje (`src/app/create-trip/page.tsx`)**: Página con el formulario para que los conductores creen nuevos viajes.
3.  **Mis Viajes**: (Pendiente) Página para que los usuarios vean su historial de viajes como conductor y pasajero.
4.  **Perfil (`src/app/profile/page.tsx`)**: Página para gestionar la información del perfil del usuario.
5.  **Detalles de Viaje (`src/app/trips/[id]/page.tsx`)**: Vista detallada de un viaje específico, incluyendo información del conductor, pasajeros (futuro), y la opción de reservar.
6.  **Auth (`src/app/auth/page.tsx`)**: Página para el registro e inicio de sesión de usuarios.

### Componentes Reutilizables

El codebase incluye una serie de componentes de UI que probablemente se utilizarán para construir la interfaz:

-   `src/components/trip-card.tsx`: (Probablemente) Un componente para mostrar de forma resumida la información de un viaje en listas (ej. Dashboard).
-   `src/components/layout/header.tsx`: El encabezado de la aplicación.
-   `src/components/ui/*`: Una colección extensa de componentes de interfaz de usuario genéricos (botones, inputs, modales, etc.) que servirán como bloques de construcción para las páginas.
-   `src/components/icons.tsx`: Componentes para íconos.
-   `src/components/ui/sidebar.tsx`: (Si se implementa una barra lateral de navegación).
-   `src/components/ui/chat.tsx`: (Pendiente) Componente para el chat interno.
-   `src/components/ui/rating.tsx`: (Pendiente) Componente para el sistema de calificación.
-   `src/components/FiltersBusqueda`: (Pendiente) Componente para los filtros en la búsqueda de viajes.
-   `src/components/FormularioViaje`: (Probablemente) Componente para el formulario de creación/edición de viajes, posiblemente reutilizando componentes de `src/components/ui/`.
-   `src/components/CalificacionComponent`: (Pendiente) Componente para mostrar y gestionar calificaciones.

## Características Técnicas

-   **Autenticación:** Utiliza Firebase Authentication. El código base incluye una página de autenticación (`src/app/auth/page.tsx`). La implementación actual probablemente cubre email/password. La verificación de teléfono y la integración con Google son futuras mejoras.
-   **Almacenamiento:** Se basa en Firestore para la base de datos en tiempo real, como se describe en la estructura de datos. El uso de Firebase Storage para fotos de perfil es una funcionalidad pendiente.
-   **Hosting y Deploy:** El proyecto está configurado para ser desplegado en Firebase Hosting, como indica el archivo `apphosting.yaml`. La configuración de dominio personalizado y PWA son pasos futuros.
-   **Integraciones Externas:**
    -   API de Google Maps: (Pendiente) Para mostrar rutas o facilitar la selección de origen/destino.
    -   WhatsApp Business API: (Pendiente) La integración directa con la API es compleja; los enlaces directos a WhatsApp son una alternativa más factible inicialmente, y el prompt menciona "Enlaces a WhatsApp y llamadas".
    -   Sistema de pagos: (Futuro: MercadoPago).

## Flujo de Trabajo Básico (Implementado / Pendiente)

1.  **Conductor crea viaje**: Se implementará mediante el formulario en `src/app/create-trip/page.tsx` que interactuará con Firestore. (Parcialmente implementado: Estructura de página presente).
2.  **Pasajero busca viaje**: Se implementará en el Dashboard (`src/app/page.tsx`) utilizando filtros. (Parcialmente implementado: Estructura de página presente, filtros pendientes).
3.  **Pasajero reserva**: Se gestionará a través de la colección `reservas`. (Pendiente: Lógica de interfaz de usuario y Cloud Functions).
4.  **Comunicación**: (Pendiente: Implementación de chat interno).
5.  **Confirmación**: (Pendiente: Lógica por parte del conductor para aceptar/rechazar reservas, probablemente gestionada por Cloud Functions).
6.  **Viaje realizado**: (Pendiente: Lógica para actualizar estados de viaje y (futuro) sistema de calificaciones).

## Configuración Inicial

El proyecto está configurado para utilizar Firebase. La configuración inicial implica:

-   Configurar el proyecto en la consola de Firebase.
-   Obtener la configuración de Firebase y añadirla al proyecto (el prompt incluye un placeholder `firebaseConfig`).
-   Configurar las reglas de seguridad de Firestore.
-   (Futuro) Configurar y desplegar Cloud Functions.
-   La región recomendada para Cloud Functions en Argentina es `southamerica-east1` (São Paulo).

## Próximas Funcionalidades (Roadmap)

Basado en el prompt, las siguientes funcionalidades están planificadas para futuras iteraciones:

1.  Sistema de calificaciones bidireccional (conductor <> pasajero).
2.  Integración con pagos digitales (ej. MercadoPago) para gestionar el pago de los viajes.
3.  Historial detallado de viajes por usuario.
4.  Notificaciones push móviles utilizando Firebase Cloud Messaging.
5.  Sistema de reporte y moderación para gestionar comportamientos inapropiados.
6.  API para integración con otros servicios (si es necesario).
7.  Implementación completa del chat interno.
8.  Lógica de confirmación/cancelación de reservas por el conductor.
9.  Actualización automática de contadores de viajes en el perfil de usuario.
10. Lógica de actualización del estado del viaje (completo, cancelado, finalizado).
11. Verificación de teléfono en la autenticación.
12. Integración con Google Maps para rutas y selección de puntos.
13. Configuración de PWA para instalación en dispositivos móviles.
14. Uso de Firebase Storage para fotos de perfil.

Este documento proporciona una visión general del sistema Areco Rides, detallando su estado actual basado en el código base y el plan de desarrollo futuro según el prompt inicial.