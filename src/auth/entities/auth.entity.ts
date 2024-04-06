import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const transform = (doc: any, ret: any) => {
  ret.uid = ret._id;
  delete ret.__v;
  delete ret._id;
  delete ret.id;
  return ret;
};

@Schema({
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform,
  },
  toObject: {
    virtuals: true,
    transform,
  },
})
export class Auth extends Document {
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: Date,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
