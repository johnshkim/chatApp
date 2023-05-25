import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpException, HttpStatus, Logger, NotFoundException, Param, Post, Put, Req, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";
import { UserInterface } from "../interfaces/user.interface";
import { UserRegisterDto } from "../dtos/user-register.dto";
import { ResponseDto } from "../dtos/response.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('user')
@Controller('user')
export class UserController {

    private readonly logger = new Logger(UserController.name);

    constructor(
        private readonly userService: UserService,
    ) { }

    @Get('list')
    @HttpCode(200)
    async list() {
        try {
            const result = await this.userService.list();
            return new ResponseDto(true, result, null);
        } catch (error) {
            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Get('id/:id')
    @HttpCode(200)
    async getById(@Param('id') id: string) {

        try {

            const result = await this.getUserById(id);
            return new ResponseDto(true, result, null);

        } catch (error) {
            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }


    @Post('registerUser')
    @HttpCode(201)
    async register(
        @Body() dto: UserRegisterDto
    ) {
        try {

            const user = await this.userService.save(dto);

            return new ResponseDto(
                true,
                {
                    _id: user._id,
                    email: user.email
                },
                null
            );

        } catch (error) {

            this.logger.error(error.message);

            throw new HttpException(
                new ResponseDto(
                    false,
                    null,
                    [error.message]), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async upload(
        @UploadedFile() file: Express.Multer.File,
    ) {

        try {

            if (!file)
                throw new BadRequestException('invalid file');

            //const bucket = this._configService.get<string>(EnviromentVariablesEnum.S3_BUCKET_DOCUMENTS);

            const response = await this.userService.uploadFile(file);

            return new ResponseDto(
                true,
                response,
                null
            );

        } catch (error) {

            throw new HttpException(
                new ResponseDto(false, null, [error.message]),
                HttpStatus.BAD_REQUEST,
            );
        }
    }
    
    @Delete('id/:id')
    @HttpCode(200)
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth()
    async deletar(
        @Param('id') _id: string,
    ) {

        try {

            const result = await this.userService.delete(_id);

            return new ResponseDto(
                true,
                {
                    _id: result._id,
                    email: result.email,
                },
                null,
            );

        } catch (error) {
            throw new HttpException(
                new ResponseDto(
                    false,
                    null,
                    [error.message]), HttpStatus.BAD_REQUEST);
        }
    }

    private async getUserById(_id: string): Promise<UserInterface> {
        const usuario = await this.userService.getById(_id);

        if (!usuario)
            throw new NotFoundException('Erro ao obter o usuario!');

        return usuario;
    }

    private async getUserByEmail(email: string): Promise<UserInterface> {
        const usuario = await this.userService.getByEmail(email);

        if (!usuario)
            throw new NotFoundException('Erro ao obter o usuario!');

        return usuario;
    }
}