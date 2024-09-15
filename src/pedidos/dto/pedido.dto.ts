import { IsArray, IsNumber, IsString } from "class-validator";

export class PedidoDTO {
    @IsArray()
    produtos: {id: number}[];
    @IsNumber()
    cliente_id: number;
}