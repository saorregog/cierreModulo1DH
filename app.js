let auto=require('./modulos/autos');

let concesionaria={
    autos: auto,

    buscarAuto: function (patente) {
        let autoPatente=null;
        let autos2=this.autos;
        for (let i=0;i<autos2.length;i++) {
            if (autos2[i].patente===patente) {
                return autoPatente=autos2[i];
            }
        }
        return autoPatente;
    },

    venderAuto: function (patente) {
        let autoVendido=concesionaria.buscarAuto(patente);
        if (autoVendido!==null && autoVendido.vendido===false) {
            autoVendido.vendido=true;
            let autos2=concesionaria.autos;
            let autos3=autos2.filter( function (e) {
                return e.patente!==patente;
            });
            autos3.push(autoVendido);
            concesionaria.autos=autos3;
        } else if (autoVendido!==null && autoVendido.vendido===true) {
            autoVendido='¡El auto ya está vendido!';
        } else {
            autoVendido='¡El auto no existe en el inventario!';
        }
        return autoVendido;
    },

    /* autosParaLaVenta: autos.filter( function (elemento) {
        return (elemento.vendido===false);
    }), */

    autosParaLaVenta: function () {
        let autos2=concesionaria.autos;
        let autosVender=autos2.filter( function (e) {
            return (e.vendido===false);
        });
        if (autosVender.length===0) {
            autosVender='¡No hay autos disponibles para la venta!';
        }
        return autosVender;
    },

    autosNuevos: function () {
        let autosVender=this.autosParaLaVenta();
        let autosN=autosVender.filter( function (e) {
            return e.km<100;
        });
        return autosN;
    },

    listaDeVentas: function () {
        let autos2=this.autos;
        let autosVendidos=autos2.filter( function (e) {
            return e.vendido===true;
        })
        let listaPrecio=autosVendidos.map( function (e) {
            return e.precio;
        });
        return listaPrecio;
    },

    totalDeVentas: function () {
        let listaPrecio=concesionaria.listaDeVentas();
        let totalVentas;
        if (listaPrecio.length===0) {
            totalVentas=0;
        } else {
            totalVentas=listaPrecio.reduce( function (a,e) {
                return a+e;
            })
        };
        return totalVentas;
    },

    puedeComprar: function (auto,persona) {
        let puedeComprar;
        puedeComprar = (auto.precio<=persona.capacidadDePagoTotal) && (((auto.precio)/(auto.cuotas))<=persona.capacidadDePagoEnCuotas);
        return puedeComprar;
    },

    autosQuePuedeComprar: function (persona) {
        let autosVender=this.autosParaLaVenta();
        let resultado=[];
        for (let i=0;i<autosVender.length;i++) {
            if (this.puedeComprar(autosVender[i],persona)===true) {
                resultado.push(autosVender[i]);
            }
        };
        if (resultado.length===0) {
            resultado=null;
        }
        return resultado;
    }
}

console.log(concesionaria.autos);
//console.log();
//console.log(concesionaria.buscarAuto('JJK116'))
//console.log();
//console.log(concesionaria.venderAuto('JJK116'));
//console.log();
//console.log(concesionaria.autosParaLaVenta());
//console.log();
//console.log(concesionaria.autos);
//console.log();
//console.log(concesionaria.autosNuevos());
//console.log();
//console.log(concesionaria.totalDeVentas());
//console.log();
//console.log(concesionaria.autosQuePuedeComprar({nombre: 'Juan',capacidadDePagoEnCuotas: 20000,capacidadDePagoTotal: 100000}));