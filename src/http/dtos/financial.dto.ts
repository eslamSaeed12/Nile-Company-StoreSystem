import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, Validate } from "class-validator";
import { Exist } from "../../database/validators/Exist";



export class _PAID_A_DEPT_ {

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseFloat(value))
    paid!: number;

    @IsNotEmpty()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @Validate(Exist, [{ entity: 'order' }])
    orderId!: number;
}