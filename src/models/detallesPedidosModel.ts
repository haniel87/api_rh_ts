import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Pedido } from "./pedidosModel";
import { Articulo } from "./articulosModel";

@Entity('detalles_pedido')
export class DetallePedido{
    
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({ type: 'int' })
    cantidad: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_venta: number;
    
    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @ManyToOne(() => Pedido, (pedido) => pedido.id)
    pedido_id : Pedido

    @ManyToOne(()=> Articulo, (articulo) => articulo.id)
    articulo_id : Articulo
}