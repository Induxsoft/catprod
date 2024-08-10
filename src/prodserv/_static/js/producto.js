var producto =
{
    urlFormActn:'', urlBack:'', formcomi:[],
    urlMasPrecios:'', exist_mp_app: false,
    currentProducto: '', curr_url:'',
    iclase_selected: 4, ff:[],
    tbl_ensamble:null, arr_ensamble:[],

    init()
    {
        const form_cntnr = document.querySelector('#form');
        this.ff = form_cntnr.elements;

        const check_req_n = document.querySelector('#check_req_ns');
        const check_req_l = document.querySelector('#check_req_lt');
        const ipt_reqsrie = document.querySelector('#ipt_reqserie');
        const ipt_reqlote = document.querySelector('#ipt_reqlote');
        const check_flagu = document.querySelector('#check_flagutil');
        const check_flagl = document.querySelector('#check_flaglimites');
        const ipt_flagutl = document.querySelector('#ipt_flagutilidad');
        const ipt_flaglim = document.querySelector('#ipt_flaglimites');
        const check_viewp = document.querySelector('#check_view_pv');
        const check_compc = document.querySelector('#check_compl_concepto');
        const ipt_visible = document.querySelector('#ipt_visible');
        const ipt_complem = document.querySelector('#ipt_complemento');
        const ipt_unidad = document.querySelector('input[name="unidad"]');
        const ipt_factorb = document.querySelector('input[name="factorb"]');
        const ipt_unidadb = document.querySelector('input[name="unidadb"]');
        const msg_factor = document.querySelector('#mesage_factor');
        const select_clase = document.querySelector('select[name="iclase"]');
        const formacomision = document.querySelector('select[name="formacomision"]');
        const tipocomision = document.querySelector('select[name="tipocomision"]');
        const ipt_utilmin = document.querySelector('input[name="utilmin"]');
        const ipt_costoultimo = document.querySelector('input[name="costoultimo"]');
        const btn_more_prices = document.querySelector('#btn_more_prices');

        if (check_req_n && ipt_reqsrie) check_req_n.addEventListener('change', e => { this.set_ipt_check_value(ipt_reqsrie, check_req_n) });
        if (check_req_l && ipt_reqlote) check_req_l.addEventListener('change', e => { this.set_ipt_check_value(ipt_reqlote, check_req_l) });
        if (check_flagu && ipt_flagutl) check_flagu.addEventListener('change', e => { this.set_ipt_check_value(ipt_flagutl, check_flagu) });
        if (check_flagl && ipt_flaglim) check_flagl.addEventListener('change', e => { this.set_ipt_check_value(ipt_flaglim, check_flagl) });
        if (check_viewp && ipt_visible) check_viewp.addEventListener('change', e => { this.set_ipt_check_value(ipt_visible, check_viewp) });
        if (check_compc && ipt_complem) check_compc.addEventListener('change', e => { this.set_ipt_check_value(ipt_complem, check_compc) });

        if (form_cntnr) form_cntnr.addEventListener('submit', e => { this.create_update_product(e) });
        if (select_clase) select_clase.addEventListener('change', e => this.select_class_changed(select_clase));
        if (formacomision) formacomision.addEventListener('change', e => this.change_comision_field(formacomision));
        if (tipocomision) tipocomision.addEventListener('change', e => this.select_comision_type(tipocomision));
        if (ipt_utilmin && ipt_costoultimo) ipt_utilmin.addEventListener('keyup', e => this.calcule_utilidad(ipt_utilmin, ipt_costoultimo));

        if (ipt_unidad && ipt_factorb && ipt_unidadb && msg_factor)
        {
            ipt_unidad.addEventListener('keyup', e => { this.valide_factor(ipt_unidad,ipt_factorb,ipt_unidadb,msg_factor) });
            ipt_unidad.addEventListener('input', e => { if (select_clase.value=='3') ipt_unidadb.value = ipt_unidad.value });
            ipt_unidadb.addEventListener('keyup', e => { this.valide_factor(ipt_unidad,ipt_factorb,ipt_unidadb,msg_factor) });
            ipt_factorb.addEventListener('change', e => { this.valide_factor(ipt_unidad,ipt_factorb,ipt_unidadb,msg_factor) });
            ipt_factorb.addEventListener('keyup', e => { this.valide_factor(ipt_unidad,ipt_factorb,ipt_unidadb,msg_factor) });
        }

        if (btn_more_prices) btn_more_prices.addEventListener('click', () => this.showMorePrices());

        this.setTableEnsambleEvents();
    },

    setTableEnsambleEvents()
    {
        let table = document.querySelector('#tbl_ensamble');
        let array = (table?.DataArray ?? []);
        const events = table.EdiTable.Const.Events;
        ensamble.table = table;
        ensamble.array = array;
        
        const ik_producto = document.getElementById("ik_producto");
        const btn_agregar = document.getElementById("btn_add_row");
        const btn_remover = document.getElementById("btn_del_row");

        table.setInputKey("codigo",ik_producto);
        table.setInputKey("descripcion",ik_producto);

        btn_add_row.addEventListener("click", () => ik_producto.searchText("",false));
        btn_del_row.addEventListener("click", () => table.DeleteCurrentRow());
        ik_producto.change_event = (data) => ensamble.agregar(data);

        table.Events[events.BeforeUpdateCell] = (e) => ensamble.BeforeUpdateCell(e);
        table.Events[events.ConfirmEdition] = (e) => ensamble.ConfirmEdition(e);
    },

    set_ipt_check_value(inputElement, checkElement)
    {
        let checked = (checkElement.checked ? 1 : 0);
        inputElement.value = checked;

        if (checkElement.id === "check_flaglimites") {
            const div_limites = document.getElementById("div_precios_lim");
            div_limites.classList.toggle("d-none",!checked);
        }
    },
    create_update_product(event)
    {
        event.preventDefault();

        const reqCall = control => 
        {
            let panel = control.closest('div[role="tabpanel"]');
            if (panel) {
                let tab = document.querySelector(`button[id="${panel.getAttribute('aria-labelledby')}"]`);
                if (tab) tab.click();
                control.focus();
            }
        }

        let data = main.getValues('form', true, reqCall);
        if (data==null) return;

        let d = {}
        Object.keys(data).forEach(k => {
            if (k.trim()!='') d[k]=data[k];
        });
        
        InduxsoftCrudlModel.InvokeService(this.urlFormActn, d,
            success => { window.location.href = this.urlBack; },
            failure => { alert('No fue posible guardar el producto.\n'+JSON.stringify(failure)); },
            "POST", false 
        );
    },
    valide_factor(unit1,factor,unit2,msg)
    {
        if (this.iclase_selected == 3) return;

        if (Number(factor.value) < 1) {
            msg.textContent = 'El factor debe ser mayor a 0';
            return;
        }
        if (unit1.value.trim()=='' || unit2.value.trim()=='') {
            msg.textContent = '';
            return;
        }
        if (unit1.value.trim() == unit2.value.trim()) {
            if (factor.value != 1) {
                msg.textContent = 'El factor no es correcto, debe ser 1';
                return;
            }
        }
        else {
            if (factor.value == 1) {
                msg.textContent = 'El factor no es correcto, debe ser diferente de 1';
                return;
            }
        }

        msg.textContent = `1 ${unit2.value} es equivalente a ${factor.value} ${unit1.value}`;
    },
    select_class_changed(selectClass)
    {
        const ipt_unidad = document.querySelector('input[name="unidad"]');
        const ipt_unidadb = document.querySelector('input[name="unidadb"]');

        this.iclase_selected = Number(selectClass.value);
        let disable = false;
        
        if (selectClass.value == '3') {
            const ipt_factorb = document.querySelector('input[name="factorb"]');
            const msg_factor = document.querySelector('#mesage_factor');

            ipt_unidad.value = "SERVICIO";
            ipt_factorb.value = 1;
            ipt_unidadb.value = "SERVICIO";
            msg_factor.textContent = "";
            disable = true;
        }
        else {
            ipt_unidad.value = "PZA";
            ipt_unidadb.value = "PZA";
            disable = false;
        }

        const select_tipo = document.querySelector('select[name="itipo"]');
        const elem_unidad = document.querySelectorAll('.elem-unidad');
        const genrl_check = document.querySelectorAll('.genrl-check');

        select_tipo.value = (disable ? 1 : 2);
        select_tipo.toggleAttribute('disabled', disable);
        elem_unidad.forEach(elem => elem.toggleAttribute('disabled', disable));

        genrl_check.forEach(check => {
            check.checked = false;
            this.set_ipt_check_value(document.querySelector('#ipt_reqserie'), check);
            this.set_ipt_check_value(document.querySelector('#ipt_reqlote'), check);
            check.toggleAttribute('disabled', disable);
        });
    },
    change_comision_field(select)
    {
        const xPrice = (select.value == '2');
        const sinComision = (select.value == '0');

        const ipt_comision = document.querySelector('input[name="comision"]');
        const con_comision = document.querySelector('#comisiones_precio_container');

        if (ipt_comision && con_comision)
        {
            ipt_comision.toggleAttribute('disabled', (xPrice || sinComision));
            con_comision.classList.toggle('d-none', (!xPrice || sinComision));

            ipt_comision.value = 0;
            con_comision.querySelectorAll('input').forEach(input => {
                input.value = 0;
            });
        }
    },
    select_comision_type(select)
    {
        const select_forma = document.querySelector('select[name="formacomision"]');
        let type = select.value;
        let opts = [];

        switch (type)
        {
            case "0":
            { 
                opts = this.formcomi.filter(f => f.id == '0'); break; 
            }
            case "1":
            {
                opts = this.formcomi.filter(f => f.id == '1' || f.id == '2'); break; 
            }
            case "2":
            { 
                opts = this.formcomi.filter(f => f.id == '1' || f.id == '2' || f.id == '3'); break; 
            }
        }

        this.fill_select(select_forma, opts);
        this.change_comision_field(select_forma);
        select_forma.toggleAttribute('disabled', (type=='0'));
    },
    fill_select(select, options)
    {
        let template = ``;
        if (options && options.length > 0)
        {
            options.forEach((opt,i) => {
                template += `<option value="${opt.id}">${opt.const}</option>`;
            });
        }
        select.innerHTML = template;
    },
    calcule_utilidad(ipt_utilidad, ipt_costoultimo)
    {
        let utilidad = Number(ipt_utilidad.value);
        let precio = Number(ipt_costoultimo.value);
        let percent = Math.mul(precio,Math.div(utilidad, 100));

        let ipt_prices = document.querySelectorAll('.precio-sin');
        
        ipt_prices.forEach(ipt =>{
            ipt.value = Math.add(precio, percent);
        });
    },
    showMorePrices()
    {
        if (!this.exist_mp_app){
            alert('Debe instalar el paquete catbas para continuar.');
            return;
        }
        window.location.href = this.urlMasPrecios + this.currentProducto + '/?exit='+this.curr_url;
    },
}

var ensamble =
{
    table:null, array:[], _obj:{},

    filterData(){ return (this.table?.DataArray??[]).filter(row => { return Object.keys(row??{}).length >= (this.table?.Columns??[]).length }) },

    agregar(data)
    {
        if (!data) return;

        let index = this.table.CurrentRowIndex();
        let ensambles = this.filterData();
        let available_row = (ensambles.length > 0) ? ensambles.length : 0;
        
        let datarow =
        {
            sys_pk:0,
            sys_recver:0,
            elemento: data.sys_pk,
            codigo: data.codigo,
            descripcion: data.descripcion,
            unidad: data.unidad,
            cantidad: 1,
            costoultimo: data.costoultimo,
            importe: data.costoultimo,
            representacion: 100
        }

        if (this.array.length === ensambles.length) this.table.AddRow();
        
        this.array[available_row] = datarow;
        // this.table.UpdateRow(available_row);
        this.calculateAmounts();
    },

    BeforeUpdateCell(e)
    {
        let field = e.coldef.field;
        let index = e.sender.RowIndexOfTd(e.td);
        // Crear backup de la fila en edición
        this._obj = JSON.parse(JSON.stringify(this.array[index]??{}));
    },

    async ConfirmEdition(e)
    {
        let field = e.coldef.field;
        let index = e.sender.RowIndexOfTd(e.td);
        let dprod = this.array[index] ?? {};

        if (Object.keys(dprod).length < this.table.Columns.length) return;

        const isValid = await this.validateFields(e);
        if (isValid) this.calculateAmounts();
    },

    validateFields(e)
    {
        return new Promise(resolve => {
            if (e.coldef.field !== "cantidad") {
                resolve(false);
                return
            }

            let index = e.sender.RowIndexOfTd(e.td);
            let dprod = this.array[index];
            let isValid = true;
            let cantidad = Number(e.text);
        
            if (cantidad < 0) {
                alert("La cantidad ingresada no puede ser menor que 0");
                cantidad = Number(this._obj.cantidad);
                isValid = false;
            }

            dprod["cantidad"] = cantidad;
            e.text = cantidad;

            this.table.UpdateRow(index);
            resolve(isValid);
        });
    },

    calculateAmounts()
    {
        console.log("Calculando...");

        let t_cantidad = this.array.reduce((total,obj) => Math.add(total,Number(obj.cantidad??0)), 0);
        let c_materiales = 0;
        this.array.forEach((prod,index) => {
            if (prod.elemento != undefined) {
                prod['representacion'] = Math.mul(Math.div(Number(prod.cantidad??0),t_cantidad),100);
                prod['importe'] = Math.mul(Number(prod.cantidad??0),Number(prod.costoultimo??0));
                c_materiales = Math.add(c_materiales,Number(prod.importe));
                this.table.UpdateRow(index);
            }
        });
        
        producto.ff["cdirecto"].value = Math.RoundTo(c_materiales,8);
        producto.ff["_ensamble"].value = JSON.stringify(this.filterData());
    },
}

document.addEventListener('DOMContentLoaded', () => {
    producto.init();
});