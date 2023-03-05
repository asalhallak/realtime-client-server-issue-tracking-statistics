import { Schema } from 'mongoose';

export const StoriesSchema = new Schema(
  {
    doneAt: { type: Date },
    status: {
      type: String,
      enum: ['Open', 'Done'],
      default: 'Open',
      required: true,
    },
    tasks: [
      {
        estimate: { type: Number, required: true },
        status: {
          type: String,
          enum: ['Open', 'Done'],
          default: 'Open',
          required: true,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);
