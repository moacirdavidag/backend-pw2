import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProdutoDTO {
    @IsString()
    @IsNotEmpty({
        message: "Campo obrigatório"
    })
    nome: string;
    @IsString()
    @IsNotEmpty({
        message: "Campo obrigatório"
    })
    descricao: string;
    @IsNumber()
    preco: number;
    @IsString()
    @IsOptional()
    path_imagem?: string;
    @IsArray()
    @IsOptional()
    ingredientes: {id: number}[];
    @IsNumber()
    categoria_id: number;
    @IsNumber()
    @IsOptional()
    sub_categoria_id?: number;
}