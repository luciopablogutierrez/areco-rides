# Descripción del Stack Tecnológico - Areco Rides

Este documento detalla las tecnologías, librerías y herramientas principales que componen la aplicación Areco Rides.

## Frontend

*   **Framework Principal:** **Next.js** (con React 18). Se utiliza el App Router para una arquitectura moderna, renderizado del lado del servidor (SSR) y generación de sitios estáticos (SSG).
*   **Lenguaje:** **TypeScript**. Aporta tipado estático al código JavaScript, mejorando la robustez, la mantenibilidad y la experiencia de desarrollo.
*   **UI Components:** **ShadCN UI**. Una colección de componentes de UI reutilizables, accesibles y personalizables, construidos sobre Radix UI y Tailwind CSS. Esto permite construir interfaces de alta calidad rápidamente.
*   **Estilos:** **Tailwind CSS**. Un framework de CSS "utility-first" que permite diseñar interfaces complejas directamente en el marcado HTML sin escribir CSS personalizado.
*   **Iconos:** **Lucide React**. Una librería de iconos SVG ligera y bien diseñada.
*   **Gestión de Formularios:** **React Hook Form** para la creación y gestión de formularios, combinado con **Zod** para la validación de esquemas de datos.
*   **Manejo de Fechas:** **date-fns**. Una librería moderna y modular para la manipulación y formateo de fechas en JavaScript.

## Backend y Base de Datos

*   **Plataforma Backend:** **Firebase**. Se utiliza como la principal plataforma de backend-as-a-service (BaaS).
    *   **Autenticación:** Firebase Authentication (planeado para gestionar el registro y login de usuarios).
    *   **Base de Datos:** **Firestore**. Una base de datos NoSQL, escalable y en tiempo real para almacenar la información de usuarios, viajes y reservas.
    *   **Funciones Serverless:** Firebase Cloud Functions (planeado para ejecutar lógica de backend, como actualizar asientos disponibles al crear una reserva).

## Funcionalidades de IA

*   **Orquestación de IA:** **Genkit**. Es el framework utilizado para construir y gestionar flujos de trabajo de inteligencia artificial, conectándose con modelos de IA generativa.
*   **Modelos de IA:** **Google AI (Gemini)**. Se integra a través de Genkit para potenciar las funcionalidades de IA de la aplicación.

## Entorno de Desarrollo y Despliegue

*   **Entorno de Ejecución:** **Node.js**.
*   **Gestor de Paquetes:** **npm**.
*   **Hosting:** **Firebase App Hosting**. La aplicación está configurada para ser desplegada en la plataforma de hosting de Firebase, optimizada para aplicaciones web modernas.
