# Global Shapers Hub Oruro - Plataforma Web

Plataforma web pública para Global Shapers Community – Hub Oruro. Una aplicación moderna desarrollada con Vue 3, TypeScript, TailwindCSS y Supabase.

## 🚀 Características

- **Página de Inicio**: Hero dinámico, iniciativas destacadas, eventos próximos y oportunidades
- **Sobre el Hub**: Información institucional, misión, visión y valores
- **Iniciativas**: Catálogo de proyectos con filtros y búsqueda
- **Eventos**: Calendario de actividades con información detallada
- **Oportunidades**: Convocatorias, voluntariados y becas para jóvenes
- **Formularios Interactivos**: Participación y propuestas de ideas
- **Diseño Responsive**: Optimizado para móviles, tablets y desktop

## 🛠️ Stack Tecnológico

- Vue 3 + TypeScript + Vite
- TailwindCSS
- Vue Router 4
- Supabase (PostgreSQL)
- Heroicons

## ⚙️ Instalación

1. **Instalar dependencias**
```bash
npm install
```

2. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
copy .env.example .env

# Editar .env con tus credenciales de Supabase
```

3. **Configurar la base de datos**
- Crear proyecto en Supabase
- Ejecutar `.kiro/database-migration.sql`

4. **Iniciar servidor**
```bash
npm run dev
```

## 📝 Scripts

```bash
npm run dev          # Desarrollo
npm run build        # Producción
npm run type-check   # Verificar tipos
```

## 📁 Estructura

```
src/
├── components/     # Componentes reutilizables
├── composables/    # Lógica compartida
├── views/          # Páginas
├── router/         # Rutas
├── types/          # TypeScript types
└── lib/            # Configuraciones
```

## 📄 Documentación

- **Especificación completa**: `.kiro/global-shapers-platform.spec.md`
- **Estado de implementación**: `.kiro/IMPLEMENTATION_STATUS.md`
- **Base de datos**: `.kiro/database-migration.sql`

## 🤝 Contacto

**Global Shapers Hub Oruro**
- Email: info@shapersoruro.org

---

Desarrollado con ❤️ para la comunidad de Oruro
