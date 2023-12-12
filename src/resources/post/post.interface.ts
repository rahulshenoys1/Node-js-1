import { Document } from 'mongoose';

export default interface post extends Document {
  title: string;
  body: string;
}
