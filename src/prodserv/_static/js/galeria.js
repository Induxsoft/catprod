var galeria =
{
    product:null,
    url_images:'',
    url_image:'',
    img_max_size:0,
    tem_img_list : [],
    image_selected: null,

    init()
    {
        const mdl_ai_btn_accept = document.querySelector('#mdl_ai_btn_accept');
        const mdl_ai_drop_image = document.querySelector('#mdl_ai_drop_image');
        const mdl_ai_input_file = document.querySelector('#mdl_ai_ipt_file');
        const media_list_images = document.querySelector('#ml_p_images');
        const butn_delete_image = document.querySelector('#delete_image');

        if (mdl_ai_btn_accept) mdl_ai_btn_accept.addEventListener('click', () => this.upload_images());
        if (mdl_ai_drop_image) mdl_ai_drop_image.addEventListener('click', () => { if (mdl_ai_input_file) mdl_ai_input_file.click(); });
        if (mdl_ai_input_file) mdl_ai_input_file.addEventListener('change', () => { this.prepareToUpImage(mdl_ai_input_file); })
        if (mdl_ai_drop_image) this.setDropImageEvent(mdl_ai_drop_image);
        if (media_list_images){ media_list_images.onClicking = (data) => { this.image_selected = data; };}
        if (butn_delete_image) butn_delete_image.addEventListener('click', () => this.deleteCurrentImage());
    },

    //=============== IMAGES
    upload_images()
    {
        let mlup = document.querySelector('#ml_up_images');
        let data = mlup.getData();
        let imgs = [];

        if (data && data.length > 0) {
            data.forEach(ml_img => {
                let img = (this.tem_img_list??[]).find(l => l.id == ml_img.id)
                if (img) imgs.push(img);
            });
        }
        else{
            alert('Debe agregar al menos una imagen para continuar.');
            return;
        }

        let formData = new FormData();
        imgs.forEach(img => formData.append(img.data.name, img.data));

        let sku = (this.product?.codigo??'');
        let url = this.url_images.replace('@sku', sku);

        this.showSpiner(true);

        InduxsoftCrudlModel.InvokeService(url, formData,
            success => {
                mlup.setData([]);
                this.tem_img_list = [];
                this.showSpiner(false);
                if (success.errors && success.errors.length > 0)
                    success.errors.forEach(error => alert(error));
                this.closeModal('modal_add_image');
                window.location.reload();
            },
            failure => {
                alert("Ocurrió un error al subir las imagenes.\n\n"+JSON.stringify(failure));
                this.showSpiner(false);
            },
            'POST', false, true, '', true
        );
    },
    setDropImageEvent(element)
    {
        element.ondragover = (e) => {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
        element.ondragover = (e) => {
            e.stopPropagation();
            e.preventDefault();
            e.target.classList.add('over-image');
        }
        element.ondragleave = (e) => {
            e.stopPropagation();
            e.target.classList.remove('over-image');
        }
        element.ondragend = (e) => {
            e.stopPropagation();
            e.target.classList.remove('over-image');
        }
        element.ondrop = (e) => {
            e.stopPropagation();
            e.preventDefault();
            e.target.classList.remove('over-image');
            const mdl_ai_ipt_file = document.querySelector('#mdl_ai_ipt_file');
            mdl_ai_ipt_file.files = e.dataTransfer.files;
            this.prepareToUpImage(mdl_ai_ipt_file);
        }
    },
    prepareToUpImage(inputFile)
    {
        let ml = document.querySelector('#ml_up_images');

        Object.keys(inputFile.files).forEach(k => 
        {
            let file = inputFile.files[k];
            if (this.valideImageFormat(file))
            {
                if (file.size > this.img_max_size) {
                    alert(`La imagen ${file.name} es muy grande, el tamaño máximo es de ${(this.img_max_size/1048576)} Megabytes`);
                }
                else
                {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    
                    let newImg = {
                        id: this.generateUUID(),
                        url:''
                    }
    
                    reader.onload = (e) =>
                    {
                        if (ml.getData().length+1 <= this.img_max_up)
                        {
                            newImg['mini'] = e.target.result;
                            ml.addMedia(newImg);
                        }
                    }
    
                    let copy = JSON.parse(JSON.stringify(newImg));
    
                    copy['data'] = inputFile.files[k];
                    this.tem_img_list.push(copy);
                }
            }
        });
    },
    valideImageFormat(image)
    {
        return (['image/png','image/jpeg','image/jpg'].find(t => t == image.type) ? true : false)
    },
    deleteCurrentImage()
    {
        if (!this.image_selected) {
            alert('Debe elegir una imagen para continuar.');
            return;
        }

        if (!confirm('¿Está seguro de eliminar la imagen seleccionada?')) return;
        
        let img = this.image_selected.id;
        let sku = (this.product?.codigo??'');
        let url = this.url_image;

        url = url.replace('@sku', sku);
        url = url.replace('@image_id', img);

        InduxsoftCrudlModel.InvokeService(url, null,
            success => {
                window.location.reload();
            },
            failure => {
                alert(failure.message ?? failure);
            }, "DELETE", false
        );
    },

    //=============== UTILS

    openModal(modalId='')
    {
        this.getBSModal(modalId).show();
    },
    closeModal(modalId='')
    {
        this.getBSModal(modalId).hide();
    },
    getBSModal(modalId='')
    {
        const modalElement = document.getElementById(modalId);
        const bsModal = bootstrap.Modal.getInstance(modalElement);
        if (!bsModal) return new bootstrap.Modal(modalElement);

        return bsModal;
    },
    showSpiner(val)
    {
        document.getElementById('spinner-containner').style.display = (val ? 'flex' : 'none');
    },
    generateUUID()
    {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, 
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
}

document.addEventListener('DOMContentLoaded', () => {
    galeria.init();
});