# Sistema de Domicilios por Sector

Aplicación fullstack para registrar zonas con servicio de delivery, consultar sectores activos y validar si un usuario está dentro del rango de cobertura y horario.

⚠️ Aunque Firebase permite acceder directamente desde el frontend, decidí mantener todo el flujo pasando por el backend (GET y POST) para cumplir con la arquitectura fullstack de esta prueba.

## Tecnologías usadas

**Frontend:**
- React + Vite
- Tailwind CSS
- React Hook Form + Geolib + Axios

**Backend:**
- Node.js + Express
- Firebase Firestore
- ECMAScript Modules (ESM)

---

## Funcionalidades

- Registro de sectores con dirección, latitud, longitud y horario
- Visualización en tabla de todos los sectores registrados
- Validación por geolocalización y horario del usuario
- Estilos simples y limpios con Tailwind
- Código modular y organizado

---

## Cómo usar

### Backend
1. Instalar dependencias:
```bash
cd backend
npm install
