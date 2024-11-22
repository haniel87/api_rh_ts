import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Pedido } from "./pedidosModel";

@Entity('clientes')
export class Cliente{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 15 })
    telefono: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    direccion?: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(()=>Pedido, pedido => pedido.cliente)
    pedidos: Pedido[];
}