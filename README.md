## Podcaster 🎧

Podcaster es una aplicación SPA (Single Page Application) que permite a los usuarios explorar los podcasts más populares, consultar detalles de cada podcast y escuchar episodios específicos. Este proyecto sigue principios modernos de arquitectura y desarrollo de software, como Clean Architecture y Domain-Driven Design (DDD), así como los principios SOLID ajustados al alcance definido.


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


## Tabla de Contenidos
 
1. <ins>Objetivo del Proyecto</ins>	
2. <ins>Tecnologías Utilizadas</ins>	
3. <ins>Decisiones de Diseño y Arquitectura</ins>	
4. <ins>Beneficios de la Arquitectura</ins>	
5. <ins>Aplicación de los Principios SOLID</ins>	
5. <ins>Cobertura de Tests por Capa</ins>	
5. <ins>Estructura del Proyecto</ins>	
6. <ins>Automatización de estándares y procesos de CI/CD</ins>	
7. <ins>Instalación y Uso</ins>	
8. <ins>Conclusión</ins>	
9. <ins>Próximos Pasos</ins>	

## Objetivo del Proyecto

El objetivo principal de este proyecto es demostrar cómo diseñar e implementar una aplicación modular y escalable para un alcance limitado, aplicando principios que aseguren calidad y mantenimiento a largo plazo.

## Tecnologías Utilizadas

- **Frontend Framework:** React con TypeScript.
- **Gestión de Estado:** Context API.
- **Enrutamiento:** React Router v6 con rutas dinámicas.
- **Estilos:** SASS modular con convención BEM.
- **Pruebas:** Jest y React Testing Library.
- **Construcción del Proyecto:** Vite para un entorno ágil y ligero.

## Decisiones de Diseño
El diseño de esta aplicación se ha estructurado para equilibrar simplicidad, claridad, y escalabilidad, respetando el alcance limitado del proyecto. A continuación, se detallan las decisiones clave y el razonamiento detrás de ellas:


1. **Clean Architecture**:

    **¿Por qué se eligió Clean Architecture?** Clean Architecture permite una clara separación de responsabilidades mediante la organización del código en capas independientes. Este diseño ofrece las siguientes ventajas:
    
    - **Independencia de Cambios:** Cambios en la UI o en la API externa no afectan directamente la lógica de negocio.
    - **Testabilidad:** Cada capa es fácilmente testeable de forma aislada.
    - **Escalabilidad:** La estructura puede crecer para soportar nuevas funcionalidades sin comprometer el diseño existente.
    
    **Implementación en el Proyecto:**
    
    - **Capa de Presentación:** Maneja la interacción con el usuario mediante componentes y hooks que encapsulan lógica específica de la UI.
    - **Capa de Aplicación:** Encapsula la lógica de negocio a través de casos de uso (por ejemplo, GetPopularPodcastsUseCase).
    - **Capa de Dominio:** Define las entidades clave del negocio (Podcast, Episode) de forma pura y reusable.
    - **Capa de Infraestructura:** Contiene los transformadores y servicios que interactúan con la API externa.

2. **Aplicación de Domain-Driven Design (DDD)**
    
    **¿Por qué aplicar DDD en un alcance limitado?** Aunque el proyecto es pequeño, DDD ayuda a establecer un diseño robusto basado en el lenguaje del dominio. Esto facilita que futuras extensiones mantengan consistencia y claridad.
    
    **Principios de DDD aplicados:**
    
    - **Bounded Context:** Todo el código relevante al dominio del podcast está contenido dentro del contexto podcastManagement, lo que delimita las responsabilidades.
    - **Entidades del Dominio:**
    - ```Podcast```: Representa un podcast con propiedades como título, autor, descripción, y una lista de episodios.
    - ```Episode```: Representa un episodio con atributos como título, duración y descripción.
    - **Lenguaje Ubicuo:**
    - Los nombres utilizados (entidades, transformadores, casos de uso) reflejan conceptos del dominio, facilitando la comunicación entre desarrolladores.

3. **Hooks Personalizados para Modularidad**

    **¿Por qué usar hooks personalizados?** Hooks como `usePodcastFilter` y `usePopularPodcasts` encapsulan lógica reutilizable, lo que evita duplicación y mejora la legibilidad del código.
    
    **Ventajas de los Hooks Personalizados:**
    
    - **Reutilización:** Cada hook puede ser utilizado por múltiples componentes.
    - **Encapsulación:** La lógica de negocio y la gestión de estado están separadas de los componentes.

4. **Gestión de Estado con Context API**

    **¿Por qué no Redux u otra librería externa?** El alcance limitado del proyecto no requiere una librería compleja de gestión de estado. Context API es suficiente para manejar, además de cumplir con el criterio de la prueba para demostrar el domnio:
    
    - Estado de carga global (`LoadingContext`).
    - Proveedor de servicios para podcasts (`PodcastServiceContext`).

5. **Caché Local**
    
    **¿Por qué implementar caché?** El uso de caché mejora el rendimiento y reduce la cantidad de solicitudes API, especialmente cuando se trabaja con datos que cambian poco frecuentemente (como los 100 podcasts más populares).
    
    **Estrategia:**
    
    - Utilizar `localStorage` para almacenar respuestas API durante 24 horas.
    - Implementar la lógica de validación de caché en `CacheManager`.

6. **Vite como Herramienta de Construcción**
    
    **¿Por qué usar Vite?** Vite se seleccionó por:
    
    - **Rendimiento:** Ofrece tiempos de arranque rápidos en modo desarrollo.
    - **Soporte moderno:** Es compatible con TypeScript, SASS, y React.
    
    **Configuración del Proyecto:**
    
    - **Modo development:** Assets no minimizados para facilitar el debugging.
    - **Modo production:** Assets concatenados y minimizados para un mejor rendimiento.

7. **SASS y BEM para Estilos**
    
    **¿Por qué no utilizar una librería de componentes?** El propósito del proyecto incluye demostrar habilidades en diseño desde cero, utilizando SASS y convención BEM para:
    
    - **Modularidad:** Estilos específicos para cada componente.
    - **Escalabilidad:** Fácil adición de nuevos estilos o temas.
    
    **Implementación:**
    
    - Variables globales en `_vars.scss` para mantener consistencia.
    - Componentes como `PodcastCard` tienen su archivo SCSS específico.

## Beneficios de la Arquitectura

1. **Escalabilidad:**
    - Cada capa es independiente, lo que facilita la adición de nuevas funcionalidades sin romper el diseño existente.
    
2. **Mantenibilidad:**
    - El código está organizado de manera que cada capa tiene una responsabilidad única, reduciendo la complejidad.

3. **Testabilidad:**
    - Las capas de dominio y aplicación son altamente testeables debido a su independencia de frameworks.

4. **Adaptabilidad:**
    - Si se cambia la API externa, solo se necesita modificar la infraestructura, sin afectar el dominio o la aplicación.

## Aplicación de los Principios SOLID

En este proyecto, los principios **SOLID** han sido utilizados para garantizar un diseño limpio, mantenible y extensible. A continuación, se explica cómo se implementa cada principio en la arquitectura:

1. **Principio de Responsabilidad Única (SRP)**
    
    - *Definición:* Cada módulo o clase debe tener una única razón para cambiar.
    
    **Implementación en el proyecto:**
    
    - **Casos de Uso:** Cada caso de uso (`GetPopularPodcastsUseCase`, `GetPodcastDetailsUseCase`) tiene una única responsabilidad: manejar una operación específica relacionada con el dominio.
    
    - **Entidades:**
        
        - Podcast y Episode están diseñadas únicamente para representar conceptos del negocio, sin lógica adicional.
    
    - **Transformadores:** Cada transformador (`PodcastTransformer`, `PodcastDetailsTransformer`) está enfocado en convertir datos de la API al modelo de dominio.

2. **Principio Abierto/Cerrado (OCP)**
    
    **Definición:** Las clases deben estar abiertas para extensión, pero cerradas para modificación.
    **Implementación en el proyecto:**
    - Los casos de uso dependen de la interfaz `IPodcastService`. Esto permite reemplazar `PodcastServiceImpl` con una nueva implementación sin modificar los casos de uso.
    - Los transformadores son reutilizables y pueden extenderse para manejar nuevos tipos de datos.

3. **Principio de Sustitución de Liskov (LSP)**
    
    **Definición:** Las clases derivadas deben ser sustituibles por sus clases base.
    
    **Implementación en el proyecto:**
    
    - `PodcastServiceImpl` implementa `IPodcastService`, lo que asegura que puede ser intercambiado por cualquier otra clase que implemente esta interfaz, sin alterar el funcionamiento de los casos de uso.

4. **Principio de Segregación de Interfaces (ISP)**
    *Definición:* Ningún módulo debe depender de métodos que no utiliza.
    
    **Implementación en el proyecto:**
    
    - La interfaz `IPodcastService` define métodos específicos y relevantes (`getPopularPodcasts`, `getPodcastDetails`). No hay métodos innecesarios o genéricos que puedan romper el principio ISP.

5. **Principio de Inversión de Dependencias (DIP)**
    **Definición:** Los módulos de alto nivel no deben depender de módulos de bajo nivel, sino de abstracciones.
    
    **Implementación en el proyecto:**
    
    - Los casos de uso dependen de la abstracción `IPodcastService`, no de la implementación concreta `PodcastServiceImpl`.
    
    - Esto permite modificar la infraestructura sin afectar las capas superiores.

## Cobertura de Tests por Capa

**Capa de Dominio**
1. Entidades (`episode.test.ts`, `podcast.test.ts`)
- Cobertura: Se enfocan en validar el comportamiento encapsulado en las entidades, como métodos de creación, validación de atributos, y lógica de negocio simple.
**Fortalezas:**
- Garantizan que los objetos de dominio estén correctamente definidos y validen sus reglas internas.
- Alineado con el principio de encapsulación.

**Capa de Aplicación**
1. Casos de Uso (`GetPodcastDetailsUseCase.test.ts`, `GetPopularPodcastsUseCase.test.ts`)
**Cobertura:** Prueban la lógica orquestadora que conecta las entidades del dominio con la infraestructura.
**Fortalezas:**
- Validan que los datos de entrada y salida sean correctos y coherentes con las necesidades del negocio.
- Cubren escenarios principales (happy path) y algunos alternativos.

**Capa de Presentación**
1. Componentes (`Filter.test.tsx`, `Header.test.tsx`, `PodcastCard.test.tsx`)

- **Cobertura:** Verifican el renderizado y la interacción de los componentes de UI, como eventos y cambios de estado.
**Fortalezas:**
- Cobertura de casos principales de interacción.
- Uso de pruebas específicas para props y comportamiento del usuario.

2. Hooks (`usePodcastDetails.test.ts`, `usePodcastFilter.test.ts`, `usePopularPodcasts.test.ts`)

- **Cobertura:** Prueban la lógica contenida en hooks personalizados, incluyendo la gestión de estado y la comunicación con la capa de datos.
**Fortalezas:**
- Separan la lógica de negocio del renderizado, lo que facilita pruebas unitarias.

3. Páginas (`EpisodeDetailPage.test.tsx`, `PodcastDetailPage.test.tsx`, `PopularPodcastsPage.test.tsx`)

- **Cobertura:** Verifican el renderizado e interacción de las páginas completas, asegurando la cohesión entre componentes y hooks.
**Fortalezas:**
- Validan flujos completos de usuario, cubriendo la navegación y el consumo de datos.

## Estructura del Proyecto

```
📁 podcaster/
├── 📄 README.md
├── 📄 package.json
├── 📄 tsconfig.json
├── 📁 src/
│   ├── 📁 podcastManagement/
│   │   ├── 📁 application/
│   │   │   ├── 📁 interfaces/
│   │   │   │   └── 📄 IPodcastService.ts
│   │   │   ├── 📁 use-cases/
│   │   │   │   ├── 📄 GetPopularPodcastsUseCase.ts
│   │   │   │   └── 📄 GetPodcastDetailsUseCase.ts
│   │   ├── 📁 domain/
│   │   │   ├── 📁 entities/
│   │   │   │   ├── 📄 podcast.ts
│   │   │   │   └── 📄 episode.ts
│   │   ├── 📁 infrastructure/
│   │   │   ├── 📁 context/
│   │   │   │   └── 📄 PodcastServiceContext.tsx
│   │   │   ├── 📁 repositories/
│   │   │   │   └── 📄 PodcastServiceImpl.ts
│   │   │   ├── 📁 services/
│   │   │   │   └── 📄 CacheManager.ts
│   │   │   ├── 📁 transformers/
│   │   │   │   ├── 📄 podcastTransformer.ts
│   │   │   │   └── 📄 podcastDetailsTransformer.ts
│   │   │   ├── 📁 types/
│   │   │   │   └── 📄 apiResponses.ts
│   │   ├── 📁 presentation/
│   │   │   ├── 📁 components/
│   │   │   │   ├── 📄 PodcastCard.tsx
│   │   │   │   ├── 📄 Filter.tsx
│   │   │   ├── 📁 hooks/
│   │   │   │   ├── 📄 usePodcastFilter.ts
│   │   │   │   ├── 📄 usePodcastDetails.ts
│   │   │   │   ├── 📄 usePopularPodcasts.ts
│   │   │   ├── 📁 pages/
│   │   │   │   ├── 📄 PopularPodcastsPage.tsx
│   │   │   │   ├── 📄 PodcastDetailPage.tsx
│   │   │   │   └── 📄 EpisodeDetailPage.tsx
│   │   │   ├── 📁 context/
│   │   │   │   ├── 📄 NavigationContext.tsx
│   │   │   │   ├── 📄 PodcastProvider.tsx
│   ├── 📁 shared/
│   │   ├── 📁 components/
│   │   │   └── 📄 LoadingIndicator.tsx
│   │   ├── 📁 context/
│   │   │   └── 📄 LoadingContext.tsx
│   │   ├── 📁 styles/
│   │   │   ├── 📄 _vars.scss
│   │   │   ├── 📄 card.scss
│   │   │   ├── 📄 filter.scss
│   │   │   ├── 📄 header.scss
│   │   │   ├── 📄 global.scss
│   │   │   └── 📄 popularPodcastsPage.scss
├── 📁 __tests__/
│   ├── 📁 application/
│   │   ├── 📁 use-cases/
│   │   │   ├── 📄 GetPodcastDetailsUseCase.test.ts
│   │   │   └── 📄 GetPopularPodcastsUseCase.test.ts
│   ├── 📁 domain/
│   │   ├── 📁 entities/
│   │   │   ├── 📄 podcast.test.ts
│   │   │   └── 📄 episode.test.ts
│   ├── 📁 infrastructure/
│   │   ├── 📁 transformers/
│   │   │   ├── 📄 podcastTransformer.test.ts
│   │   │   └── 📄 podcastDetailsTransformer.test.ts
│   ├── 📁 presentation/
│   │   ├── 📁 components/
│   │   │   ├── 📄 PodcastCard.test.tsx
│   │   │   ├── 📄 Filter.test.tsx
│   │   ├── 📁 hooks/
│   │   │   ├── 📄 usePodcastFilter.test.ts
│   │   │   ├── 📄 usePodcastDetails.test.ts
│   │   │   └── 📄 usePopularPodcasts.test.ts
│   │   ├── 📁 pages/
│   │   │   ├── 📄 PopularPodcastsPage.test.tsx
│   │   │   ├── 📄 PodcastDetailPage.test.tsx
│   │   │   └── 📄 EpisodeDetailPage.test.tsx

```

## Automatización de estándares y procesos de CI/CD

En este proyecto, se han configurado herramientas clave para garantizar la calidad del código y adherirse a las mejores prácticas de desarrollo mediante el uso de **Husky** y **GitHub Actions**.

**Husky: Enforce Standards Locally**
Husky se ha configurado para interceptar el proceso de commit y validar que los mensajes de commit sigan una nomenclatura definida, en este caso, Commitlint. Esto asegura que cada cambio esté documentado de manera clara y consistente en el historial de Git.

- **Hook configurado:** `commit-msg`
- Este hook utiliza `npx commitlint` para verificar el mensaje de cada commit.
- Si el mensaje no cumple con las reglas definidas, el commit se rechaza, fomentando un historial limpio y estructurado.

**GitHub Actions: CI/CD Optimizado**
Se han implementado dos workflows clave dentro del directorio .github/workflows para mantener un proceso de desarrollo robusto:

1. **Lint Code** (`lint.yml`)

- Ejecuta automáticamente comprobaciones de calidad de código al realizar un push o un pull request hacia la rama principal (main).
- Incluye los siguientes pasos:
   - Configuración del entorno con la versión requerida de Node.js.
   - Instalación de dependencias mediante yarn.
   - Ejecución de herramientas de análisis estático como ESLint y validación de estilos con Prettier.

Este flujo garantiza que el código cumpla con los estándares establecidos antes de ser fusionado.

2. **Tag on Version Change** (`tag-on-version-change.yml`)

- Automatiza la creación de etiquetas (tags) en Git cada vez que se detecta un cambio en la versión del archivo package.json.
- Pasos clave:
    - Extrae la versión actual de package.json.
    - Verifica si la etiqueta correspondiente ya existe. Si no, crea y publica una nueva etiqueta en el repositorio.
    - Este flujo asegura un control riguroso de versiones y facilita el seguimiento de lanzamientos.

**Beneficios**
- **Consistencia:** Todos los desarrolladores trabajan bajo los mismos estándares, mejorando la calidad del código.
- **Automatización:** Menos errores humanos al delegar tareas repetitivas al pipeline de CI/CD.
- **Rastreo de Cambios:** Mensajes de commit claros y etiquetas precisas simplifican el análisis de cambios y la generación de versiones.

Estas configuraciones no solo garantizan la calidad técnica del proyecto, sino que también alinean el flujo de trabajo con prácticas modernas de DevOps, proporcionando un marco sólido para el desarrollo escalable y colaborativo.



## Instalación y Uso

### **Requisitos previos**

1. Asegúrate de tener instalado:
   - **Node.js** (versión 16 o superior)
   - **Yarn** como gestor de paquetes

### 1. Clona el repositorio:

- ```git clone https://github.com/adolfo-amaris/podcaster```
- ```cd podcaster```

### 2. Instala las dependencias:

- ```yarn install```

### 3. Inicia la aplicación en modo desarrollo:

- ```yarn start```

### 4. Construcción para producción:

- ```yarn build```


## Conclusión

Este proyecto demuestra cómo construir una SPA moderna utilizando tecnologías actuales como React, Vite, y SASS, aplicando patrones y principios sólidos para garantizar escalabilidad y mantenibilidad. ¡Gracias por revisar Podcaster! 🎉

## Próximos Pasos

- Implementación de lazy-loading para cargar datos y optimizar el tiempo de carga inicial
- Uso de SSR con Next.js
