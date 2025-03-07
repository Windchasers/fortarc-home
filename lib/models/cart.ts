import { ObjectId } from 'mongodb';

export interface CartItem {
  productId: ObjectId;
  quantity: number;
  specs: {
    [key: string]: string;
  };
}

export interface Cart {
  _id?: ObjectId;
  userId: ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}