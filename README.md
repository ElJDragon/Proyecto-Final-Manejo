
# Sistema de Gestión de Cursos UTA

Este sistema permite la **gestión de cursos, carreras, usuarios y eventos** para una universidad, desarrollado como proyecto final.

**Autores**: Josue Guevara, Sebastian Cortez

---

## 🧩 Estructura del Proyecto

```
├── api-rest-laravel/       # Backend Laravel
│   ├── app/Http/Controllers  # Controladores (UserController, CursosController, etc.)
│   ├── app/Models            # Modelos (CURSOS.php, CARRERA.php, etc.)
│   ├── routes/api.php        # Rutas de la API
│   └── .env                  # Configuración del entorno
└── sistemauta/             # Frontend Angular
    └── src/app
        ├── components/       # Vistas (login, cursosadmin, crearcarrera, etc.)
        ├── services/         # Servicios para conectar con la API
        └── models/           # Interfaces TypeScript
```

---

## 🚀 Instalación del Backend (Laravel) con WAMP64

1. **Descarga y configura WAMP64**
   - Asegúrate de tener PHP >= 8.1 y MySQL en funcionamiento.
   - Coloca la carpeta `api-rest-laravel` dentro de `C:\wamp64\www`.

2. **Configura `.env`**
   - Copia `.env.example` a `.env` y configura tus credenciales:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=cursos
     DB_USERNAME=root
     DB_PASSWORD=
     ```

3. **Instala dependencias de Laravel**
   ```bash
   cd C:\wamp64\www\api-rest-laravel
   composer install
   php artisan key:generate
   php artisan migrate --seed
   ```

4. **Inicia el servidor local**
   ```bash
   php artisan serve
   ```

   > El backend estará disponible en: `http://localhost:8000/api/`

---

## 🌐 Instalación del Frontend (Angular)

1. **Instala Angular CLI y dependencias**
   ```bash
   npm install -g @angular/cli
   cd C:\wamp64\www\SISTEMAUTA\sistemauta
   npm install
   ```

2. **Ejecuta el frontend**
   ```bash
   ng serve --open
   ```

   > El frontend estará disponible en: `http://localhost:4200/`

---

## 📦 Principales librerías Angular usadas

- `@angular/core`: núcleo del framework
- `@angular/forms`: formularios reactivos
- `@angular/router`: navegación entre componentes
- `rxjs`: manejo de eventos reactivos
- `bootstrap`: estilo visual
- `sweetalert2`: alertas visuales

---

## 🧪 Componentes destacados

- **LoginComponent**: inicio de sesión
- **CursosAdminComponent**: gestión de cursos
- **CrearcarreraComponent**: formulario para carreras
- **SeguimientoComponent**: control de eventos
- **UsuariosComponent**: administración de usuarios

---

## 🎯 Descripción funcional del sistema

Esta aplicación permite a la Facultad de Ingeniería en Sistemas, Electrónica e Industrial de la Universidad Técnica de Ambato gestionar cursos y eventos académicos. Entre sus funciones clave se encuentran:

- Gestión de **usuarios** con roles (Administrador, Participante).
- Administración de **tipos de eventos**: cursos, congresos, webinars, conferencias, socializaciones.
- Registro y edición de **carreras universitarias**.
- Perfil de usuario editable con datos personales y ubicación.
- Registro de nuevos cursos o eventos académicos con selección de tipo, carrera, organizador y portada.
- Interfaz visual para CRUD completo (crear, leer, actualizar, eliminar).

---

## 🖼️ Vistas del sistema (Frontend)

| Vista | Descripción |
|-------|-------------|
| **/usuarios** | Tabla de usuarios con datos como nombre, correo, rol y opciones de editar/eliminar. |
| **/tiposevento** | Vista con tipos de eventos disponibles en el sistema (congreso, webinar, etc.). |
| **/carreras** | Carreras y facultades disponibles, editable por el admin. |
| **/perfil** | Perfil detallado del usuario, incluyendo dirección y datos personales. |
| **/crearcarrera** | Formulario para registrar nuevas carreras. |
| **/creacurso** | Formulario de creación de cursos con imagen de portada y selección de tipo/carrera. |

---

## 📘 Basado en requisitos académicos

Este proyecto fue desarrollado como parte del **Segundo Parcial de la asignatura "Manejo y Configuración de Software"**, cumpliendo con los siguientes lineamientos:

- Aplicar buenas prácticas de **control de versiones (Git)**.
- Uso de **Jira Service Management** para gestionar **cambios simulados**.
- Flujo colaborativo tipo **GitFlow**.
- Simulación completa de control de cambios (comité, issues, merges).
- Gestión de eventos con CRUD, inscripción, reporte de asistencia y certificados.

---

## 📚 Bibliografía recomendada

- Pressman, R. (2010). *Ingeniería del software* (7ª ed.). McGraw-Hill.
- Sommerville, I. (2017). *Ingeniería de Software* (9ª ed.). Pearson.
- Moreira, M. (2010). *Adapting Configuration Management for Agile Teams*. Wiley.
- Lacy, S. (2014). *Configuration Management*. BCS Learning.

---
