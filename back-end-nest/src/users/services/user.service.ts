import { SendGridService } from "@anchan828/nest-sendgrid/dist/sendgrid.service";
import { HttpException, HttpService, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserRegisterDto } from "../dtos/user-register.dto";
import { UserInterface } from "../interfaces/user.interface";
import { UserListInterface } from "../interfaces/userList.interface";
import { User } from "../schemas/user.schema";

@Injectable()
export class UserService {

    url: string;
    user: any;

    constructor(
        @InjectModel(User.name, ) private readonly model: Model<UserInterface>,
        private readonly sendGrid: SendGridService
        //private httpService: HttpService
    ) { }

    async list(): Promise<UserListInterface[]> {
        return await this.model
            .find({})
    }

    async findOneByUsername(username: string): Promise<UserInterface> {
        return await this.model
            .findOne({ username });
    }

    async getByEmail(email: string): Promise<UserInterface> {
        return await this.model
            .findOne({ email });
    }

    async save(dto: UserRegisterDto): Promise<UserInterface> {
        const data = await new this.model(dto);
        const verify = await this.sendGrid.send({
            to: dto.email,
            from: process.env.FROM_EMAIL,
            subject: "Hi, success registation!",
            text: `Hello ${dto.username}! You user created with success!`,
            html: "<strong>Hello ${dto.username}! You user created with success!</strong>",
          });
        //this.url = `https://reqres.in/api/register`;
        //const response = await this.httpService
        //    .post(this.url)
        //    .toPromise()
        //    .catch((err) => {
        //        throw new HttpException(err.response.data, err.response.status);
        //    });
//
        ////return response.data;
        console.log(verify);
        return data.save();
    }

    async uploadFile(file: Express.Multer.File) {
        return {
            file: file.buffer.toString(),
          };
    }

    async updatePassword(_id: string, password: string): Promise<UserInterface> {
        return await this.model.findOneAndUpdate({ _id }, {
            $set: {
                password
            }
        });
    }

    async delete(_id: string): Promise<UserInterface> {
        return await this.model.findByIdAndDelete(_id);
    }

    async update(_id: string, name: string): Promise<UserInterface> {
        return await this.model.findOneAndUpdate(
            { _id },
            {
                $set: {
                    name,
                },
            },
        );
    }
}