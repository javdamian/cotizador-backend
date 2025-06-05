# Cotizador de Audífonos (Backend)

Cotizador de Audífonos es una API REST que permite gestionar productos de audífonos y calcular la comisión de vendedores sobre cotizaciones. Utiliza Express, TypeScript y MongoDB Atlas.

## Casos de Uso

1. **Obtener productos:** Permite consultar todos los productos o uno específico.
2. **Agregar productos:** Permite añadir nuevos productos a la base de datos.
3. **Calcular comisión:** Calcula la comisión del vendedor según el subtotal de la cotización.

## Interfaces y Modelos

### Modelo de Producto (Mongoose)

```ts
// src/models/Product.ts
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: String,
  sku: String,
  descripcion: String,
  categoria: String,
  precioBase: Number,
  especificaciones: mongoose.Schema.Types.Mixed,
});

export const Product = mongoose.model('Product', productSchema);
```

### TypeScript (para referencia)

```ts
type Producto = {
  _id: string;
  nombre: string;
  sku: string;
  descripcion: string;
  categoria: string;
  precioBase: number;
  especificaciones: any;
};
```

## Endpoints Generados

### GET `/api/products`
**Propósito:** Obtener todos los productos.  
**Respuesta ejemplo:**
```json
[
  {
    "_id": "123",
    "nombre": "Audífono Gamer Pro X",
    "sku": "AGP-X-001",
    "descripcion": "Audífono con sonido envolvente.",
    "categoria": "Gaming",
    "precioBase": 150.99,
    "especificaciones": { "driver": "50mm", "bluetooth": "5.2" }
  }
]
```

### GET `/api/products/:id`
**Propósito:** Obtener un producto por su ID.  
**Respuesta ejemplo:**
```json
{
  "_id": "123",
  "nombre": "Audífono Gamer Pro X",
  "sku": "AGP-X-001",
  "descripcion": "Audífono con sonido envolvente.",
  "categoria": "Gaming",
  "precioBase": 150.99,
  "especificaciones": { "driver": "50mm", "bluetooth": "5.2" }
}
```

### POST `/api/products`
**Propósito:** Añadir un nuevo producto.  
**Cuerpo de la petición:**
```json
{
  "nombre": "Nuevo Audífono",
  "sku": "NA-001",
  "descripcion": "Descripción...",
  "categoria": "In-Ear",
  "precioBase": 99.99,
  "especificaciones": { "color": "Negro" }
}
```
**Respuesta:** Producto creado.

### POST `/api/comision`
**Propósito:** Calcular la comisión del vendedor.  
**Cuerpo de la petición:**
```json
{ "subtotal": 2000 }
```
**Respuesta ejemplo:**
```json
{ "comision": 110, "porcentaje": "5.50" }
```

## Instrucciones de Correr el Proyecto

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/javdamian/cotizador-backend.git
   cd cotizador-backend
   ```

2. **Instala las dependencias:**
   ```sh
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz con tu cadena de conexión de MongoDB:
   ```
   MONGODB_URI=tu_cadena_de_conexion
   ```

4. **Ejecuta el servidor de desarrollo:**
   ```sh
   npm run dev
   ```

   El backend estará disponible en `http://localhost:3001`.

## License

Este proyecto está licenciado bajo la MIT License. Consulta el archivo LICENSE para más detalles.