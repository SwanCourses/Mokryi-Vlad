import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: 'String', required: true },
  code: { type: 'String', required: true },
  description: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  photos: [],
  sizes: [],
  colors: {},
  category: {type: 'String'}
});

export default mongoose.model('Product', productSchema);
