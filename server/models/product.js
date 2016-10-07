import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: 'String', required: true },
  code: { type: 'String', required: true },
  description: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  price: { type: 'Number', required: true },
  sizes: [],
  colors: {},
  group: {type: 'String'},
  category: {type: 'String'},
});

export default mongoose.model('Product', productSchema);
