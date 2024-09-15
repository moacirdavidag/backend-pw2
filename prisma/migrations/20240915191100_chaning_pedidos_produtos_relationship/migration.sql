/*
  Warnings:

  - You are about to drop the column `pedido_id` on the `produtos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `produtos` DROP FOREIGN KEY `produtos_pedido_id_fkey`;

-- AlterTable
ALTER TABLE `produtos` DROP COLUMN `pedido_id`;

-- CreateTable
CREATE TABLE `_PedidosToProduto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PedidosToProduto_AB_unique`(`A`, `B`),
    INDEX `_PedidosToProduto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PedidosToProduto` ADD CONSTRAINT `_PedidosToProduto_A_fkey` FOREIGN KEY (`A`) REFERENCES `pedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PedidosToProduto` ADD CONSTRAINT `_PedidosToProduto_B_fkey` FOREIGN KEY (`B`) REFERENCES `produtos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
