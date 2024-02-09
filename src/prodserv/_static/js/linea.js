var linea =
{
    init()
    {
        const check_visible = document.querySelector('#check_visible');
        const ipt_visible = document.querySelector('#ipt_visible');
        
        if (check_visible && ipt_visible) check_visible.addEventListener('change', e => { ipt_visible.value = (check_visible.checked ? 1 : 0) });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    linea.init();
});