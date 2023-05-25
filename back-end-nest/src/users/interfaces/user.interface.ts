export interface UserInterface extends Document {
    readonly _id: string;
    readonly email: string;
    readonly password: string;
    readonly username: string;
    readonly isAvatarImageSet: boolean;
    readonly avatarImage:string;
  
}