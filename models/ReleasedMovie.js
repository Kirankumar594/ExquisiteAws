const mongoose = require('mongoose');

const releasedMovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    isNewFlag: { type: Boolean, default: false },
    video: { type: String, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        if (ret.isNewFlag !== undefined) {
          ret.isNew = ret.isNewFlag;
          delete ret.isNewFlag;
        }
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        if (ret.isNewFlag !== undefined) {
          ret.isNew = ret.isNewFlag;
          delete ret.isNewFlag;
        }
        return ret;
      },
    },
  }
);

releasedMovieSchema.pre('init', function (data) {
  if (data && Object.prototype.hasOwnProperty.call(data, 'isNew') && data.isNewFlag === undefined) {
    data.isNewFlag = data.isNew;
    delete data.isNew;
  }
});

module.exports = mongoose.model('ReleasedMovie', releasedMovieSchema);

