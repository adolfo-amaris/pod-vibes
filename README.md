## Podcaster 🎧

Podcaster es una aplicación desarrollada en React que permite a los usuarios explorar podcasts populares, consultar detalles de cada podcast, y visualizar episodios específicos de una manera interactiva y responsiva. El objetivo de este proyecto es demostrar la capacidad de crear una SPA (Single Page Application) modular, escalable, y optimizada, utilizando buenas prácticas de desarrollo.

--- 

## Tabla de Contenidos

- Tecnologías Utilizadas
- Características Principales
- Estructura del Proyecto
- Patrones y Principios Aplicados
- Pruebas Unitarias
- Cambios Recientes
- Instalación y Uso
- Conclusión
- Próximos Pasos

## Tecnologías Utilizadas
- **Frontend Framework:** React con TypeScript.
- **Gestión de Estado:** Context API (LoadingContext, PodcastServiceContext).
- **Enrutamiento:** React Router v6 con rutas dinámicas.
- **Estilos:** SASS modular con convención BEM.
- **Construcción del Proyecto:** Vite para un entorno ágil y ligero.

### Estilos:
- SASS como preprocesador CSS.
- Convención BEM para una estructura semántica y mantenible.
- Construcción del Proyecto: Vite para un desarrollo rápido y ligero.

### Pruebas unitarias:
- Jest y React Testing Library para pruebas unitarias y de integración.
- Mocking de localStorage y servicios API.
- Manejo de Caché: localStorage para optimizar la carga de datos y mejorar el rendimiento.
- Fetching de Datos: Axios para consumir la API de iTunes RSS.


## Características Principales
1. **Exploración de Podcasts Populares:**
   - Listado de los 100 podcasts más populares con su imagen, título y autor.
   - Filtro de búsqueda en tiempo real.

2. **Detalle del Podcast:**
   - Visualización de información detallada del podcast seleccionado.
   - Listado de episodios con título, fecha y duración.
   - Carga dinámica de episodios a través de rutas `/podcast/:podcastId`.

3. **Detalle del Episodio:**
   - Visualización completa del episodio seleccionado.
   - Reproducción de audio con un diseño minimalista.
   - Rutas específicas `/podcast/:podcastId/episode/:episodeId`.

4. **Indicador Global de Carga:**
   - Gestión centralizada del estado de carga con un indicador visual.

5. **Optimización de Rendimiento:**
   - Caché de datos en `localStorage` para evitar solicitudes repetitivas.
   - Uso de custom hooks para filtrar y manejar datos eficientemente.

---


## Estructura del Proyecto

```
├── assets/
├── features/
    ├── podcasts/
        ├── components/
            ├── Filter.tsx
            ├── PodcastCard.tsx
        ├── hooks/
            ├── usePodcastDetails.ts
            ├── usePodcastFilter.ts
        ├── pages/
            ├── EpisodeDetailPage/
                ├── EpisodeDetailPage.tsx
            ├── HomePage/
                ├── HomePage.tsx
            ├── PodcastDetailPage/
                ├── PodcastDetailPage.tsx
        ├── services/
            ├── podcastService.ts
        ├── styles/
            ├── card.scss
            ├── episodeDetailPage.scss
            ├── filter.scss
            ├── homePage.scss
            ├── podcastDetailPage.scss
        ├── types/
            ├── podcast.ts
├── shared/
    ├── components/
        ├── Header.tsx
        ├── LoadingIndicator.tsx
    ├── context/
        ├── LoadingContext.tsx
        ├── NavigationContext.tsx
        ├── PodcastServiceContext.tsx
    ├── hooks/
        ├── useHomeNavigation.ts
    ├── styles/
        ├── global.scss
        ├── header.scss
        ├── loadingIndicator.scss
        ├── _vars.scss
    ├── utils/
├── __tests__/
    ├── Header.test.tsx
    ├── HomePage.test.tsx
├── App.css
├── App.test.tsx
├── App.tsx
├── index.css
├── index.tsx
├── logo.svg
├── react-app-env.d.ts
├── reportWebVitals.ts
├── setupTests.ts

```

---

## Patrones y Principios Aplicados
1. **SOLID:**
   - Separación de lógica en servicios (`podcastService`) y contextos.
2. **KISS y DRY:**
   - Código simple, limpio y reutilizable.
3. **BEM:**
   - Convención en nombres de clases CSS para claridad y consistencia.

---

## Pruebas Unitarias
- **HomePage:**
  - Verifica el renderizado correcto del listado de podcasts.
  - Simula búsqueda y valida filtrado.
- **Header:**
  - Valida la visibilidad del indicador de carga durante peticiones.
- **PodcastDetailPage:**
  - Comprueba la carga dinámica de podcasts y episodios.
- **EpisodeDetailPage:**
  - Valida la visualización y reproducción de episodios.

---



## Cambios Recientes
- **Implementación de Rutas Dinámicas:**
  - Se agregaron rutas específicas para podcasts y episodios.
- **Contextos Globales:**
  - `LoadingContext` para manejo del estado de carga.
  - `PodcastServiceContext` para gestionar datos de podcasts y episodios.
- **Refactorización de Custom Hooks:**
  - `usePodcastFilter` optimizado para evitar ciclos infinitos de renderizado.
- **Pruebas Actualizadas:**
  - Tests adaptados para trabajar con contextos y rutas dinámicas.


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

## Próximos Pasos
- Implementación de lazy-loading para cargar datos y optimizar el tiempo de carga inicial
- Uso de SSR con Next.js
