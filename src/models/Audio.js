const { Schema, model } = require("mongoose");

const AudioSchema = new Schema(
  {
    author: {
      type: String,
    },
    title: {
      type: String,
    },
    fileUrl: {
      type: String,
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
