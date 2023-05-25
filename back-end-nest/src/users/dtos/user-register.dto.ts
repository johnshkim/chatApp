import { ApiProperty } from "@nestjs/swagger";

export abstract class UserRegisterDto {

    @ApiProperty({ type: String })
    email: string;

    @ApiProperty({ type: String })
    password: string;
    
    @ApiProperty({ type: String })
    username: string;

    @ApiProperty({ type: Boolean })
    isAvatarImageSet: boolean;

    @ApiProperty({ type: String })
    avatarImage:string;

}