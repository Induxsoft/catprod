var producto =
{
    urlFormActn:'', urlBack:'', formcomi:[],
    urlMasPrecios:'', exist_mp_app: false,
    currentProducto: '', curr_url:'',

    init()
    {
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
        const ipt_unidadb = document.querySelector('input[name="unidadB"]');
        const msg_factor = document.querySelector('#mesage_factor');
        const form_cntnr = document.querySelector('#form');
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
            ipt_unidadb.addEventListener('keyup', e => { this.valide_factor(ipt_unidad,ipt_factorb,ipt_unidadb,msg_factor) });
            ipt_factorb.addEventListener('change', e => { this.valide_factor(ipt_unidad,ipt_factorb,ipt_unidadb,msg_factor) });
            ipt_factorb.addEventListener('keyup', e => { this.valide_factor(ipt_unidad,ipt_factorb,ipt_unidadb,msg_factor) });
        }

        if (btn_more_prices) btn_more_prices.addEventListener('click', () => this.showMorePrices());
    },
    set_ipt_check_value(inputElement, checkElement)
    {
        inputElement.value = (checkElement.checked ? 1 : 0);
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
        const disable = (selectClass.value == '3');

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

        let ipt_prices = document.querySelectorAll('.precio-util');
        
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

document.addEventListener('DOMContentLoaded', () => {
    producto.init();
});