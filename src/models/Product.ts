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