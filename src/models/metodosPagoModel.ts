import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Pedido } from "./pedidosModel";

@Entity('metodos_pago')
export class MetodoPago{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    tipo: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(()=> Pedido, pedido => pedido.metodo_pago)
    pedidos: Pedido[];
}