import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const productSchema = new mongoose.Schema({
  nombre: String,
  sku: String,
  descripcion: String,
  categoria: String,
  precioBase: Number,
  especificaciones: mongoose.Schema.Types.Mixed,
});

const Product = mongoose.model('Product', productSchema);

mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.error('Error de conexión:', err));

// GET /api/products: obtener todos los productos
app.get('/api/products', async (req: Request, res: Response) => {
  const productos = await Product.find();
  res.json(productos);
});

// GET /api/products/:id: obtener producto por ID (MongoDB _id)
app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch {
    res.status(400).json({ error: 'ID inválido' });
  }
});

// POST /api/products: añadir nuevo producto
app.post('/api/products', async (req: Request, res: Response) => {
  try {
    const nuevoProducto = new Product(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear producto', details: err });
  }
});

app.post('/api/comision', (req: Request, res: Response) => {
  const { subtotal } = req.body;
  // Ejemplo de función lineal: comisión base 5% + 0.5% por cada $100 de subtotal
  const porcentaje = 0.05 + 0.005 * Math.floor(subtotal / 100);
  const comision = subtotal * porcentaje;
  res.json({ comision, porcentaje: (porcentaje * 100).toFixed(2) });
});

app.listen(3001, () => {
  console.log('Servidor backend escuchando en http://localhost:3001');
});