import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true, collection: 'user' })
export class User {

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true})
    password: string;

    @Prop({required: true, unique: true})
    username: string;

    @Prop({required: true, default: false })
    isAvatarImageSet: boolean;

    @Prop({required: true, default:'' })
    avatarImage:string
    
}
export const UserSchema = SchemaFactory.createForClass(User);