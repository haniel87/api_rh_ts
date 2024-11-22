import express from 'express';
import cors from 'cors';
import morgan from 'morgan';


import articulosRoutes from '../src/routes/articulosRoutes';
import clientesRoutes from '../src/routes/clientesRoutes';
import detallesPedidosRoutes from '../src/routes/detallesPedidosRoutes';
import ingresosDiariosRoutes from '../src/routes/ingresosDiariosRoutes';
import metodosPagoRoutes from '../src/routes/metodosPagoRoutes';
import pedidosRoutes from '../src/routes/pedidosRoutes';
import rangoEnviosRoutes from '../src/routes/rangoEnvioRoutes';
import estadoPedidosRoutes from '../src/routes/estadoPedidoRoutes';

const app = express();

app.use(express.json())
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) =>{
    console.log('Hola mundo');
    res.send("Hola mundo");
})

app.use("/articulos", articulosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/detallePedidos", detallesPedidosRoutes);
app.use("/ingresosDiarios", ingresosDiariosRoutes);
app.use("/metodosPago", metodosPagoRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/rangoEnvios", rangoEnviosRoutes);
app.use("/estadoPedidos", estadoPedidosRoutes);

export default app;  