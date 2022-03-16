const { Schema, model } = require("mongoose");

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
    fileUrl: {
      type: String,
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
