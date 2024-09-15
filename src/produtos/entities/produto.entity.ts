export class Produto {
    id: number;
    nome: string;
    descricao: string;
    path_imagem?: string;
    pedido_id?: number;
    categoria_id?: number;
    sub_categoria_id?: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}