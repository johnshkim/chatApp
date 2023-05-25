import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";

@Schema({ timestamps: true, collection: 'message' })
export class Message {

    @Prop({
        type: { text: { type: String, required: true } },
        required: true,
      })

      @Prop({})
      message: {
        text: string;
      };
      
      @Prop({})
      user: [string];

      @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
      sender: User
    
    
}
export const UserSchema = SchemaFactory.createForClass(User);