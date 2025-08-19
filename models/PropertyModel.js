import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  }
}, {
  timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

export default Property;