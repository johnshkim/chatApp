export interface UserListInterface extends Document {
    readonly _id: string;
    readonly email: string;
    readonly username: string;
    readonly isAvatarImageSet: boolean;
    readonly avatarImage:string;
}