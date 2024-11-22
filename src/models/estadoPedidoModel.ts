import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Pedido } from "./pedidosModel";

@Entity('estado_pedido')
export class EstadoPedido{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    estado: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(()=> Pedido, pedido => pedido.metodo_pago)
    pedidos: Pedido[];
}