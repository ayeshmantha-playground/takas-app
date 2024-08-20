import {IsNotEmpty, Matches, MinLength} from "class-validator";

export class UserTo {
    @IsNotEmpty()
    email!: string;
    @IsNotEmpty()
    @MinLength(2)
    name!: string;
    @IsNotEmpty()
    @Matches(/^0\d{2}-\d{7}$/)
    contact!: string;

}