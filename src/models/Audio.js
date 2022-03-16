const { Schema, model, SchemaTypes } = require("mongoose");

const AudioSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    streamsCount: {
      type: Number,
      default: 0,
    },
    genres: {
      type: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("audio", AudioSchema);
