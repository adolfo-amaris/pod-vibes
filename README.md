## Podcaster 🎧

Podcaster es una aplicación desarrollada en React que permite a los usuarios explorar podcasts populares, consultar detalles de cada podcast, y visualizar episodios específicos de una manera interactiva y responsiva. El objetivo de este proyecto es demostrar la capacidad de crear una SPA (Single Page Application) modular, escalable, y optimizada, utilizando buenas prácticas de desarrollo.


## Tabla de Contenidos

- Tecnologías Utilizadas
- Arquitectura y Diseño
- Características Principales
- Decisiones de Diseño
- Estructura del Proyecto
- Patrones y Principios Aplicados
- Optimización
- Pruebas Unitarias
- Instalación y Uso
- Próximos Pasos


## Tecnologías y Herramientas Utilizadas
- Frontend Framework: React con TypeScript.
- Gestión de Estado: Context API para manejar el estado global.
- Enrutador: React Router v6 para navegación dinámica sin recargar la página.

### Estilos:
- SASS como preprocesador CSS.
- Convención BEM para una estructura semántica y mantenible.
- Construcción del Proyecto: Vite para un desarrollo rápido y ligero.

### Pruebas unitarias:
- Jest y React Testing Library para pruebas unitarias y de integración.
- Mocking de localStorage y servicios API.
- Manejo de Caché: localStorage para optimizar la carga de datos y mejorar el rendimiento.
- Fetching de Datos: Axios para consumir la API de iTunes RSS.


## **Arquitectura y Diseño**

El proyecto sigue una estructura basada en separación de responsabilidades y modularidad, asegurando escalabilidad y mantenimiento.

Single Page Application (SPA):

Todos los cambios en la interfaz se realizan sin recargar la página.
Se gestionan rutas dinámicas para los detalles de podcasts y episodios.
Componentes desacoplados:

Cada componente es reutilizable y encapsula su propia lógica y estilos.
Capas de abstracción:

Servicios (services/) para manejar las peticiones API.
Contextos (context/) para el manejo de estados globales como indicadores de carga.
SASS Modular:

Uso de variables, mixins, y @use para garantizar estilos consistentes y evitar conflictos.


## Características Principales

Exploración de podcasts populares:
- Listado de los 100 podcasts más populares con su imagen, título y autor.
Diseño responsivo.

### Detalle del podcast:

- Muestra información del podcast seleccionado.
- Listado de episodios con su título y duración.

### Detalle del episodio:

- Visualización completa del episodio seleccionado.
- Manejo de errores en caso de datos faltantes.

### Indicador global de carga:

- Una bola azul en el header que muestra el estado de las peticiones.

### Optimización de rendimiento:

- Implementación de caché para evitar múltiples peticiones a la misma API.


## Decisiones de Diseño

### SPA y React Router:

- Permitir una experiencia de usuario fluida sin recargar la página.
- Uso de rutas dinámicas (/:podcastId y /:podcastId/:episodeId) para detalles de podcasts y episodios.

### Context API:

- Creación de un estado global (LoadingContext) para manejar el estado de carga de manera eficiente.

### Estilos modulares con SASS:

- Uso de variables globales (_vars.scss) para colores, espaciados y tipografía.
- Uso de mixins para estilos repetitivos. REVISAR

### Gestión de datos:

- Uso de servicios centralizados para interactuar con APIs externas.
- Caché de respuestas para optimizar el rendimiento.

### Vite como elección de construcción:

- Se eligió Vite sobre otras herramientas como Create React App debido a su velocidad y modernidad.
- Configuración personalizada para soportar SASS sin complicaciones y optimizar el entorno de desarrollo.


## Estructura del Proyecto

```
src/
├── __test__
├── assets/                 # Imágenes y otros recursos estáticos
├── components/             # Componentes reutilizables
│   ├── Card/               # Componente para mostrar podcasts
│   ├── Header/             # Header con indicador de carga
│   └── LoadingIndicator/   # Indicador de carga global
├── context/                # Manejo de estados globales
│   └── LoadingContext.tsx  # Estado global para el indicador de carga
├── pages/                  # Páginas principales
│   ├── HomePage.tsx        # Página principal con listado de podcasts
│   ├── PodcastDetailPage.tsx # Detalle de un podcast y sus episodios
│   └── EpisodeDetailPage.tsx # Detalle de un episodio
├── services/               # Servicios para la interacción con APIs
│   └── podcastService.ts   # Servicio para obtener datos de podcasts
├── styles/                 # Estilos globales y variables
│   ├── _vars.scss          # Variables globales de estilos
│   ├── global.scss         # Estilos globales
│   └── header.scss         # Estilos específicos del Header
└── index.tsx               # Punto de entrada de la aplicación
```

## Patrones y Principios Aplicados
- SOLID: La lógica de negocio está separada en servicios y contextos.
- BEM (Block Element Modifier): Utilizado en los nombres de clases CSS para mantener consistencia.
- KISS y DRY: Código simple, reutilizable y modular.

## Estrategia de Pruebas

### HomePage:
- Verifica que el listado de podcasts se renderiza correctamente.
- Simula búsqueda y valida el filtrado de resultados.
- Prueba el manejo de caché para cargar datos locales.

### Header:
- Valida la visibilidad del indicador de carga durante peticiones.

### PodcastDetailPage:
- Comprueba que los detalles del podcast y episodios se muestran correctamente.

### EpisodeDetailPage:
- Prueba la carga de información específica del episodio y reproducción.

## Próximos Pasos
- Integrar paginación para mejorar la experiencia en el listado de podcasts.
- Implementación de lazy-loading para cargar datos y optimizar el tiempo de carga inicial


### **Requisitos previos**

1. Asegúrate de tener instalado:
   - **Node.js** (versión 16 o superior)
   - **Yarn** como gestor de paquetes

## Instalación y Uso

### 1. Clona el repositorio:

- git clone https://github.com/adolfo-amaris/podcaster
- cd podcaster

### 2. Instala las dependencias:

- yarn install

### 3. Inicia la aplicación en modo desarrollo:

- yarn start

### 4. Construcción para producción:

- yarn build


## Conclusión
Este proyecto demuestra cómo construir una SPA moderna utilizando tecnologías actuales como React, Vite, y SASS, aplicando patrones y principios sólidos para garantizar escalabilidad y mantenibilidad. ¡Gracias por revisar Podcaster! 🎉
