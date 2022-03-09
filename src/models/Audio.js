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
    },
    genres: {
      type: [
        {
          type: String,
        },
      ],
    },
    title: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("audio", AudioSchema);
