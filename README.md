# Areco Rides

¡Hola gente! 🚗💨

Les quería comentar una idea que vengo dando vueltas: ¿qué les parece si empezamos a usar una web para organizar los viajes? Fui creando una página que se llama Areco Rides , bien práctica para publicar, buscar y coordinar viajes entre San Antonio de Areco y Buenos Aires.

La idea no es complicar nada, sino todo lo contrario: tener todo más ordenado, evitar el caos de los mensajes perdidos y que cada uno pueda ver rápido qué viajes hay, cuántos lugares quedan, precios, etc.

¿Qué opinan? Si les copa, podemos probarla sin compromiso y ver cómo funciona. Cuenten qué les parece y si tienen otras ideas, ¡también son bienvenidas!

Abrazo grande 🤗 , GUT

## Descripción del Proyecto

Areco Rides es una aplicación web diseñada para reemplazar el sistema actual de coordinación de viajes compartidos entre San Antonio de Areco y Buenos Aires, basado en WhatsApp. El objetivo es proporcionar una plataforma organizada y funcional para la gestión de viajes, usuarios y comunicación, mejorando la eficiencia y la experiencia de los usuarios.

## Funcionalidades Principales

### 1. Gestión de Viajes
-   **Crear viaje**: Permite a los conductores ofrecer viajes completando un formulario con detalles como origen, destino, fecha, hora, asientos disponibles, y precio.
-   **Buscar viajes**: Facilita a los pasajeros encontrar viajes disponibles mediante filtros por origen, destino y fecha.
-   **Ver detalles**: Muestra información completa sobre un viaje específico, incluyendo detalles del conductor y la descripción del viaje.
-   **Gestionar asientos**: Controla la disponibilidad de asientos en tiempo real a medida que se realizan reservas.

### 2. Sistema de Usuarios
-   **Autenticación**: Registro e inicio de sesión de usuarios.
-   **Perfiles de usuario**: Información básica del usuario.

## Páginas

1.  **Dashboard (`src/app/page.tsx`)**: La vista principal que probablemente listará los viajes disponibles.
2.  **Crear Viaje (`src/app/create-trip/page.tsx`)**: Página con el formulario para que los conductores creen nuevos viajes.
3.  **Perfil (`src/app/profile/page.tsx`)**: Página para gestionar la información del perfil del usuario.
4.  **Detalles de Viaje (`src/app/trips/[id]/page.tsx`)**: Vista detallada de un viaje específico.
5.  **Auth (`src/app/auth/page.tsx`)**: Página para el registro e inicio de sesión de usuarios.


# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Pushing to GitHub

1. **Create a new GitHub repository:** Go to GitHub and create a new empty repository. Do NOT initialize it with a README, license, or .gitignore
