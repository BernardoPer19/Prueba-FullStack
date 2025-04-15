# Sistema de Domicilios por Sector

Aplicación fullstack para registrar zonas con servicio de delivery, consultar sectores activos y validar si un usuario está dentro del rango de cobertura y horario.

⚠️ Aunque Firebase permite acceder directamente desde el frontend, decidí mantener todo el flujo pasando por el backend (GET y POST) para cumplir con la arquitectura fullstack de esta prueba.


---

## 📸 Vista previa del proyecto

_Añade aquí tus screenshots del frontend y funcionalidades_

- 📍 Formulario con autocompletado de direcciones  
  ![Formulario](./screenshots/formulario.png)

- 📊 Tabla con sectores en tiempo real  
  ![Tabla de sectores](./screenshots/tabla.png)

- 🌐 Validación de ubicación del usuario  
  ![Ubicación actual](./screenshots/ubicacion.png)

---

## Stack Tecnológico

### 🖥️ Frontend
- **React** + **TypeScript**
- Tailwind CSS
- React Router DOM
- React Hook Form
- Axios
- Context API
- Vite

### 🧠 Backend
- Node.js + Express.js
- Firebase Firestore
- Zod (validación de datos)
- dotenv
- cors
- morgan

---

## 📁 Estructura del Proyecto

### 🧩 Frontend — *React + TypeScript + ContextAPI + Custom Hooks*

- **Arquitectura**: Modular por Dominio (*Domain-Driven Folder Structure*)
- **Librerías clave**:  
  - React Hook Form *(validación de formularios)*  
  - ContextAPI *(estado global)*  
  - Hooks personalizados
- **Stack adicional**:  
  - Axios *(para peticiones HTTP)*  

Frontend/<br>
├── node_modules/ <br>
├── public/<br>
├── src/<br>
│   ├── api/       #Peticiones HTTP<br>
│   ├── components/                # Componentes reutilizables (en progreso o centralizados)<br>
│   ├── context/                   # Contexto global de sectores<br>
│   ├── error/                     # Manejo de errores<br>
│   ├── hooks/<br>
│   ├── pages/                     #Paginas de la web<br>
│   ├── services/<br>
│   ├── types/<br>
├── app.tsx<br>
├── main.tsx<br>
├── package.json<br>
└── tsconfig.json<br>


---

### 🔧 Backend — *Express + Firebase + Zod*

- **Arquitectura**: MVC + Modular  
- **Base de datos**: Firebase  
- **Validación**: Zod  
- **Librerías adicionales**:  
  - `dotenv` *(variables de entorno)*  
  - `cors`, `express` *(configuración base de servidor)*
 
Backend/<br>
├── node_modules/<br>
├── src/<br>
│   ├── controllers/<br>
│   ├── firebase/<br>
│   ├── routes/<br>
│   └── schema/<br>
├── .env<br>
├── .gitignore<br>
├── firebase.json<br>
├── package.json<br>
└── package-lock.json<br>

---

## 🚀 Funcionalidades principales

### ✅ Backend
- Registro de sectores con:
  - Nombre
  - Dirección geográfica (lat/lng)
  - Horario de atención
- Base de datos en Firebase Firestore
- Arquitectura modular: MVC
- Validación de datos con Zod

### ✅ Frontend
- Formulario para crear sectores
  - Autocompletado de direcciones reales (API Nominatim / Mapbox)
  - Validación con React Hook Form
- Tabla de sectores
  - Visualización en tiempo real
- Validación de ubicación del usuario
  - Muestra si se encuentra dentro de un sector activo (radio 5km)
- Manejo de estado global con ContextAPI
- Diseño responsivo con Tailwind

---

## 📊 Avance de Requisitos Técnicos

| Funcionalidad                                     | Estado     |
|--------------------------------------------------|------------|
| Registrar sectores con horarios y coordenadas    | ✅ Hecho   |
| Guardar sectores en Firebase                     | ✅ Hecho   |
| API RESTful con Express                          | ✅ Hecho   |
| Formulario completo con validación               | ✅ Hecho   |
| Autocompletado de direcciones                    | ✅ Parcial |
| Tabla de sectores en tiempo real                 | ✅ Parcial |
| Validación de ubicación actual del usuario       | ✅ Hecho   |
| Filtro por horario de atención                   | ⛔ Pendiente |
| Diseño visual cuidado                            | ✅ Parcial |
| README claro y completo                          | ✅ (ahora sí) |
| Despliegue público                               | ⛔ Pendiente |

---
## 🛠️ Instalación y uso

### Backend (Express)
```bash
cd backend
npm install
npm run dev
```
```
### Frontned (React + Vite)```
cd frontend
npm install
npm run dev
```
## 🌐 APIs Externas Utilizadas

- **Mapbox Places API**  
  Utilizada para autocompletado de direcciones reales al registrar un sector.  
  👉 [https://docs.mapbox.com/api/search/geocoding/](https://docs.mapbox.com/api/search/geocoding/)

- **Firebase Firestore**  
  Base de datos NoSQL para almacenar los sectores registrados.  
  👉 [https://firebase.google.com/docs/firestore](https://firebase.google.com/docs/firestore)

---

## 🕐 Funcionalidades Pendientes o en Progreso

- [ ] Filtrar sectores por horario de atención actual
- [ ] Actualización en tiempo real con WebSockets o Firebase listeners (parcialmente hecho)
- [ ] Mejorar diseño visual (en progreso)
- [ ] Documentación completa (este README) con capturas y diagramas
- [ ] Despliegue en producción (Vercel + Render o Railway)

---

## 👤 Autor

- **Nombre:** Agustín Bernardo Peredo Rodriguez  
- **Correo:** wawxper08@gmail.com  
- **Teléfono:** +591 64854829  
- **Ubicación:** Cochabamba, Bolivia  
- **LinkedIn:** https://www.linkedin.com/in/bernardo-peredo-50a1552a0/

---



