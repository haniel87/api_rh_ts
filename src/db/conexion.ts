import { DataSource } from "typeorm";
import { Cliente } from "../models/clientesModel";
import { Articulo } from "../models/articulosModel";
import { MetodoPago } from "../models/metodosPagoModel";
import { Pedido } from "../models/pedidosModel";
import { DetallePedido } from "../models/detallesPedidosModel";
import { IngresoDiario } from "../models/ingresosDiariosModel";
import { RangoEnvio as RangoEnvio } from "../models/rangoEnviosModel";
import { EstadoPedido } from "../models/estadoPedidoModel";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "regaloshabana",
    password: "123456",
    database: "tienda_articulos_personalizados",
    logging: true,
    entities: [
        Cliente,
        Articulo,
        MetodoPago,
        Pedido,
        DetallePedido,
        RangoEnvio,
        IngresoDiario,
        EstadoPedido
    ],
    synchronize: false
})