import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cliente } from "./clientesModel";
import { MetodoPago } from "./metodosPagoModel";
import { EstadoPedido } from "./estadoPedidoModel";

@Entity("pedidos")
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean" })
  envio_domicilio: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio_total: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  anticipo: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  monto_por_cobrar: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.id)
  public cliente: Cliente;

  @ManyToOne(() => MetodoPago, (metodoPago) => metodoPago.id)
  public metodo_pago: MetodoPago;
  
  @ManyToOne(() => EstadoPedido, (estadPedido) => estadPedido.id)
  public estado_pedido: EstadoPedido;
}
