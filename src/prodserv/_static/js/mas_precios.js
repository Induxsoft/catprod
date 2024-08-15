var mas_precios = 
{
    init()
    {
        const ultCosto = document.querySelector('input[name="costoultimo"]');

        const util1 = document.querySelector('input[name="util1"]');
        const util2 = document.querySelector('input[name="util2"]');
        const util3 = document.querySelector('input[name="util3"]');
        const util4 = document.querySelector('input[name="util4"]');
        const util5 = document.querySelector('input[name="util5"]');
        const util106 = document.querySelector('input[name="util106"]');
        const util107 = document.querySelector('input[name="util107"]');
        const util108 = document.querySelector('input[name="util108"]');
        const util109 = document.querySelector('input[name="util109"]');
        const util110 = document.querySelector('input[name="util110"]');
        const util111 = document.querySelector('input[name="util111"]');
        const util112 = document.querySelector('input[name="util112"]');
        const util113 = document.querySelector('input[name="util113"]');
        const util114 = document.querySelector('input[name="util114"]');
        const util115 = document.querySelector('input[name="util115"]');
        const util116 = document.querySelector('input[name="util116"]');
        const util117 = document.querySelector('input[name="util117"]');
        const util118 = document.querySelector('input[name="util118"]');
        const util119 = document.querySelector('input[name="util119"]');
        const util120 = document.querySelector('input[name="util120"]');

        if (util1.value == "") util1.value = "0.00000000"
        if (util2.value == "") util2.value = "0.00000000"
        if (util3.value == "") util3.value = "0.00000000"
        if (util4.value == "") util4.value = "0.00000000"
        if (util5.value == "") util5.value = "0.00000000"
        if (util106.value == "") util106.value = "0.00000000"
        if (util107.value == "") util107.value = "0.00000000"
        if (util108.value == "") util108.value = "0.00000000"
        if (util109.value == "") util109.value = "0.00000000"
        if (util110.value == "") util110.value = "0.00000000"
        if (util111.value == "") util111.value = "0.00000000"
        if (util112.value == "") util112.value = "0.00000000"
        if (util113.value == "") util113.value = "0.00000000"
        if (util114.value == "") util114.value = "0.00000000"
        if (util115.value == "") util115.value = "0.00000000"
        if (util116.value == "") util116.value = "0.00000000"
        if (util117.value == "") util117.value = "0.00000000"
        if (util118.value == "") util118.value = "0.00000000"
        if (util119.value == "") util119.value = "0.00000000"
        if (util120.value == "") util120.value = "0.00000000"

        const desc2 = document.querySelector('input[name="desc2"]');
        const desc3 = document.querySelector('input[name="desc3"]');
        const desc4 = document.querySelector('input[name="desc4"]');
        const desc5 = document.querySelector('input[name="desc5"]');

        if (desc2.value == "") desc2.value = "0.00000000"
        if (desc3.value == "") desc3.value = "0.00000000"
        if (desc4.value == "") desc4.value = "0.00000000"
        if (desc5.value == "") desc5.value = "0.00000000"

        const precio1 = document.querySelector('input[name="precio1"]');
        const precio2 = document.querySelector('input[name="precio2"]');
        const precio3 = document.querySelector('input[name="precio3"]');
        const precio4 = document.querySelector('input[name="precio4"]');
        const precio5 = document.querySelector('input[name="precio5"]');
        const precio106 = document.querySelector('input[name="precio106"]');
        const precio107 = document.querySelector('input[name="precio107"]');
        const precio108 = document.querySelector('input[name="precio108"]');
        const precio109 = document.querySelector('input[name="precio109"]');
        const precio110 = document.querySelector('input[name="precio110"]');
        const precio111 = document.querySelector('input[name="precio111"]');
        const precio112 = document.querySelector('input[name="precio112"]');
        const precio113 = document.querySelector('input[name="precio113"]');
        const precio114 = document.querySelector('input[name="precio114"]');
        const precio115 = document.querySelector('input[name="precio115"]');
        const precio116 = document.querySelector('input[name="precio116"]');
        const precio117 = document.querySelector('input[name="precio117"]');
        const precio118 = document.querySelector('input[name="precio118"]');
        const precio119 = document.querySelector('input[name="precio119"]');
        const precio120 = document.querySelector('input[name="precio120"]');

        if (precio106.value == "") precio106.value = "0.00000000"
        if (precio107.value == "") precio107.value = "0.00000000"
        if (precio108.value == "") precio108.value = "0.00000000"
        if (precio109.value == "") precio109.value = "0.00000000"
        if (precio110.value == "") precio110.value = "0.00000000"
        if (precio111.value == "") precio111.value = "0.00000000"
        if (precio112.value == "") precio112.value = "0.00000000"
        if (precio113.value == "") precio113.value = "0.00000000"
        if (precio114.value == "") precio114.value = "0.00000000"
        if (precio115.value == "") precio115.value = "0.00000000"
        if (precio116.value == "") precio116.value = "0.00000000"
        if (precio117.value == "") precio117.value = "0.00000000"
        if (precio118.value == "") precio118.value = "0.00000000"
        if (precio119.value == "") precio119.value = "0.00000000"
        if (precio120.value == "") precio120.value = "0.00000000"

        if (util1 && ultCosto) util1.addEventListener('keyup', e => this.calcular_valor_utilidad(util1,ultCosto,"precio1"));
        if (util2 && ultCosto) util2.addEventListener('keyup', e => this.calcular_valor_utilidad(util2,ultCosto,"precio2"));
        if (util3 && ultCosto) util3.addEventListener('keyup', e => this.calcular_valor_utilidad(util3,ultCosto,"precio3"));
        if (util4 && ultCosto) util4.addEventListener('keyup', e => this.calcular_valor_utilidad(util4,ultCosto,"precio4"));
        if (util5 && ultCosto) util5.addEventListener('keyup', e => this.calcular_valor_utilidad(util5,ultCosto,"precio5"));
        if (util106 && ultCosto) util106.addEventListener('keyup', e => this.calcular_valor_utilidad(util106,ultCosto,"precio106"));
        if (util107 && ultCosto) util107.addEventListener('keyup', e => this.calcular_valor_utilidad(util107,ultCosto,"precio107"));
        if (util108 && ultCosto) util108.addEventListener('keyup', e => this.calcular_valor_utilidad(util108,ultCosto,"precio108"));
        if (util109 && ultCosto) util109.addEventListener('keyup', e => this.calcular_valor_utilidad(util109,ultCosto,"precio109"));
        if (util110 && ultCosto) util110.addEventListener('keyup', e => this.calcular_valor_utilidad(util110,ultCosto,"precio110"));
        if (util111 && ultCosto) util111.addEventListener('keyup', e => this.calcular_valor_utilidad(util111,ultCosto,"precio111"));
        if (util112 && ultCosto) util112.addEventListener('keyup', e => this.calcular_valor_utilidad(util112,ultCosto,"precio112"));
        if (util113 && ultCosto) util113.addEventListener('keyup', e => this.calcular_valor_utilidad(util113,ultCosto,"precio113"));
        if (util114 && ultCosto) util114.addEventListener('keyup', e => this.calcular_valor_utilidad(util114,ultCosto,"precio114"));
        if (util115 && ultCosto) util115.addEventListener('keyup', e => this.calcular_valor_utilidad(util115,ultCosto,"precio115"));
        if (util116 && ultCosto) util116.addEventListener('keyup', e => this.calcular_valor_utilidad(util116,ultCosto,"precio116"));
        if (util117 && ultCosto) util117.addEventListener('keyup', e => this.calcular_valor_utilidad(util117,ultCosto,"precio117"));
        if (util118 && ultCosto) util118.addEventListener('keyup', e => this.calcular_valor_utilidad(util118,ultCosto,"precio118"));
        if (util119 && ultCosto) util119.addEventListener('keyup', e => this.calcular_valor_utilidad(util119,ultCosto,"precio119"));
        if (util120 && ultCosto) util120.addEventListener('keyup', e => this.calcular_valor_utilidad(util120,ultCosto,"precio120"));

        if (desc2 && precio2) desc2.addEventListener('keyup', e => this.calcular_descuento(precio2,desc2));
        if (desc3 && precio3) desc3.addEventListener('keyup', e => this.calcular_descuento(precio3,desc3));
        if (desc4 && precio4) desc4.addEventListener('keyup', e => this.calcular_descuento(precio4,desc4));
        if (desc5 && precio5) desc5.addEventListener('keyup', e => this.calcular_descuento(precio5,desc5));

        if (precio1 && ultCosto) precio1.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio1,ultCosto,"util1"));
        if (precio2 && ultCosto) precio2.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio2,ultCosto,"util2"));
        if (precio3 && ultCosto) precio3.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio3,ultCosto,"util3"));
        if (precio4 && ultCosto) precio4.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio4,ultCosto,"util4"));
        if (precio5 && ultCosto) precio5.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio5,ultCosto,"util5"));
        if (precio106 && ultCosto) precio106.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio106,ultCosto,"util106"));
        if (precio107 && ultCosto) precio107.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio107,ultCosto,"util107"));
        if (precio108 && ultCosto) precio108.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio108,ultCosto,"util108"));
        if (precio109 && ultCosto) precio109.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio109,ultCosto,"util109"));
        if (precio110 && ultCosto) precio110.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio110,ultCosto,"util110"));
        if (precio111 && ultCosto) precio111.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio111,ultCosto,"util111"));
        if (precio112 && ultCosto) precio112.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio112,ultCosto,"util112"));
        if (precio113 && ultCosto) precio113.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio113,ultCosto,"util113"));
        if (precio114 && ultCosto) precio114.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio114,ultCosto,"util114"));
        if (precio115 && ultCosto) precio115.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio115,ultCosto,"util115"));
        if (precio116 && ultCosto) precio116.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio116,ultCosto,"util116"));
        if (precio117 && ultCosto) precio117.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio117,ultCosto,"util117"));
        if (precio118 && ultCosto) precio118.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio118,ultCosto,"util118"));
        if (precio119 && ultCosto) precio119.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio119,ultCosto,"util119"));
        if (precio120 && ultCosto) precio120.addEventListener('keyup', e => this.calcular_porcentaje_utilidad(precio120,ultCosto,"util120"));
    },

    calcular_valor_utilidad(util,ultCosto,field)
    {
        let utilidad = Number(util.value);
        let ultimoCosto = Number(ultCosto.value);
        let percent = Math.mul(Math.div(utilidad,100), ultimoCosto); //(utilidad/100) * ultimoCosto;
        let precio = document.querySelector(`input[name="${field}"]`);

        precio.value = Math.RoundTo(Math.add(ultimoCosto,percent),8); //ultimoCosto + percent;
    },

    calcular_porcentaje_utilidad(precio,ultCosto,field)
    {
        let ultimoCosto = Number(ultCosto.value);
        let percent = Math.div(Math.mul(100,Math.sub(Number(precio.value),ultimoCosto)),ultimoCosto); //(100*(precio.value-ultimoCosto))/ultimoCosto;
        let utilidad = document.querySelector(`input[name="${field}"]`);
        
        utilidad.value = Math.RoundTo(percent,8);
    },

    calcular_descuento(precio,desc)
    {
        const descuento = Number(desc.value);
        const precioInicial = Number(precio.value);

        if (descuento > 0) {
            let percent = Math.mul(Math.div(descuento,100),precioInicial); //(descuento / 100) * precioInicial;
            precio.value = Math.RoundTo(Math.sub(precioInicial,percent),8); //precioInicial - percent;
        } else {
            precio.value = precioInicial;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mas_precios.init()
});