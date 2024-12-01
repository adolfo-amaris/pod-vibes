
# Automatización de Etiquetado con GitHub Actions

## 1. Descripción

Este proyecto utiliza un workflow automatizado para crear etiquetas (tags) basadas en la versión definida en el archivo `package.json`. Cada vez que se actualiza la versión en `package.json` y se realiza un push a la rama principal (`main`), el workflow:

1. Lee la nueva versión del archivo `package.json`.
2. Verifica si el tag ya existe en el repositorio.
3. Si el tag no existe, lo crea y lo sube automáticamente.

## 2. Requisitos Previos

Para que el workflow funcione correctamente, se deben cumplir los siguientes requisitos:

1. **Permisos del Workflow:**
   - Habilitar permisos de lectura y escritura para GitHub Actions:
     - Ir a **Settings** > **Actions** > **General**.
     - En la sección **Workflow permissions**, seleccionar **Read and write permissions**.
     - Guardar los cambios.

2. **Archivo de Configuración:**
   - Asegúrate de tener el archivo `.github/workflows/tag-on-version-change.yml` en tu repositorio.

## 3. Cómo Funciona el Workflow

1. **Acciones Disparadoras:**
   - El workflow se ejecuta en cada push a la rama `main`.

2. **Pasos del Workflow:**
   - **Checkout del código:** Se recuperan todos los archivos del repositorio, incluidos los tags existentes.
   - **Configuración de Node.js:** Se establece un entorno con Node.js para leer el `package.json`.
   - **Obtención de la versión:** Se extrae la versión actual del `package.json`.
   - **Verificación de tags:** Se verifica si el tag correspondiente ya existe.
   - **Creación del tag:** Si el tag no existe, se crea y se sube al repositorio remoto.

## 4. Ejemplo de Uso

**Paso 1:** Incrementar la versión en `package.json`.
```json
{
  "version": "x.x.x"
}
```

**Paso 2:** Confirmar y subir los cambios.
```bash
git add package.json
git commit -m "chore: bump version to x.x.x"
git push origin main
```

**Resultado:** El workflow creará automáticamente el tag `vx.x.x` y lo subirá a GitHub.

## 5. Detalles Técnicos

**Archivo YAML del Workflow:**
```yaml
name: Tag on Version Change

on:
  push:
    branches:
      - main

jobs:
  tag_version:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-tags: true
          fetch-depth: 0

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Get version from package.json
        id: get_version
        run: |
          VERSION=$(node -p "require('./package.json').version")
          echo "VERSION=$VERSION"
          echo "VERSION=$VERSION" >> $GITHUB_ENV

      - name: Create and push tag
        env:
          VERSION: ${{ env.VERSION }}
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          if git rev-parse "v${{ env.VERSION }}" >/dev/null 2>&1; then
            echo "Tag v${{ env.VERSION }} already exists"
          else
            echo "Creating and pushing tag v${{ env.VERSION }}"
            git tag -a "v${{ env.VERSION }}" -m "Release version ${{ env.VERSION }} as per package.json"
            git push origin "v${{ env.VERSION }}"
          fi
```

## 6. Notas Finales

- **Naming Convention:** Este workflow utiliza el formato de versionado semántico: `vMAJOR.MINOR.PATCH`.
- **Modificaciones Futuros:** Si necesitas realizar cambios en el workflow, recuerda probarlo en una rama antes de aplicarlo en `main`.
