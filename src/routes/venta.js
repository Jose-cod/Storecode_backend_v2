const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

//Insertar una venta
router.post('/storecode/venta',(req,res)=>{
    const {idUsuario,idPaginaPago,claveTransaccion,paypalDatos,correo,totalVendido, direccionEntrega}= req.body;
    const query= `CALL psInsVentav3(${idUsuario},${idPaginaPago},'${claveTransaccion}','${paypalDatos}','${correo}',${totalVendido},'${direccionEntrega}')`

    mysqlConnection.query(query, (err,rows,fields)=>{
        if(!err){
            res.json(rows[0][0]);
        }else{
            console.log(err);
            res.json({
                Mensaje: 'Error en la petición'
           });
        }
    });
});
//Insertar una venta- fin

//Insertar carritoventa
router.post('/storecode/carritoventa',(req,res)=>{
    const {idProductoCarrito,FolioVenta}= req.body;
    const query= `CALL psInsProductoCarritoVenta(${idProductoCarrito},${FolioVenta})`

    mysqlConnection.query(query, (err,rows,fields)=>{
        if(!err){
            res.json(rows[0][0]);
        }else{
            console.log(err);
            res.json({
                Mensaje: 'Error en la petición'
           });
        }
    });
});
//Insertar carritoventa- fin

//obtener el registro de la venta a través del id del usuario
router.get('/storecode/myshopping/:id',(req,res)=>{

    const {id} = req.params;
    mysqlConnection.query(`CALL psMosVentaByUserv2(${id})`,(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
            console.log(rows[0]);

        }else{
            console.log(err);
        }
    });

})


//obtener los items o articulos de la venta
router.get('/storecode/purchaseditem/:FolioVenta',(req,res)=>{

    const {FolioVenta} = req.params;
    mysqlConnection.query(`CALL psMosItemsByFolioVenta(${FolioVenta})`,(err,rows,fields)=>{
        if(!err){
            res.json(rows[0]);
            console.log(rows[0]);

        }else{
            console.log(err);
        }
    });

})




module.exports=router;