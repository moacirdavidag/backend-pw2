import { IsNotEmpty, IsString } from "class-validator";

export class CategoriaDTO {
    @IsString()
    @IsNotEmpty({
        message: "Campo obrigatório"
    })
    nome: string;
}