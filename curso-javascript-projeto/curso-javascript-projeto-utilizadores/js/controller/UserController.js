class UserController {
    constructor(formIdCreate, formIdUpdate, tableId){
        this.formEL = document.getElementById(formIdCreate);
        this.formUP = document.getElementById(formIdUpdate);
        this.tableEL = document.getElementById(tableId);
        this.onSubmit();
        this.onEdit();
    }

    onEdit(){
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{
            UserController.showPanel("create");
        });

        this.formUP.addEventListener("submit", event => {
            event.preventDefault();

            let btn = this.formUP.querySelector("[type=submit]");
            btn.disabled = true;

            let values = this.getValues(this.formUP);

            let index = this.formUP.dataset.trIndex;
            let tr = this.tableEL.rows[index];
            tr.dataset.user = JSON.stringify(values);
            tr.innerHTML = `
                <td><img src="${values.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${values.name}</td>
                <td>${values.email}</td>
                <td>${(values.admin) ? 'Sim' : 'Não'}</td>
                <td>${Utils.dateFormat(values.register)}</td>
                <td>
                  <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
                  <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                </td>
            `;

            this.addEventsTr(tr);
            this.updateCount();
        });
    }

    onSubmit(){
        
        this.formEL.addEventListener("submit", (event) => {
            event.preventDefault();

            let btn = this.formEL.querySelector("[type=submit]");
            btn.disabled = true;

            let values = this.getValues(this.formEL);

            if(!values){
                return false;
            }

            this.getPhoto().then(
                (content) =>{
                    values.photo = content;
                    this.addLine(values);
                    this.formEL.reset();
                    btn.disabled = false;
            }, 
                (e) =>{
                    console.error(e);
            });
            
        });
    }

    getPhoto(){

        return new Promise((resolve, reject)=>{
            let fileReader = new FileReader();

            let elements = [...this.formEL.elements].filter(item =>{
                if(item.name === 'photo'){
                    return item;
                }
            });
    
            let file = elements[0].files[0];
    
    
            fileReader.onload = () =>{
                resolve(fileReader.result);
            };

            fileReader.onerror = (e) =>{
                reject(e);
            };
    
            if(file){
                fileReader.readAsDataURL(file);   
            }else{
                resolve('dist/img/boxed-bg.jpg');
            }
        });
    }

    getValues(myForm){
        let user = {};
        var isValid = true;

        [...myForm.elements].forEach(function (field, index) {
            if(['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value){
                field.parentElement.classList.add('has-error');
                isValid = false;
            }

            if (field.name === "gender"){
                if (field.checked){
                    user[field.name] = field.value;
                }
            }else if(field.name === "admin"){
                user[field.name] = field.checked;
            }else {
                user[field.name] = field.value;
            }
        });
    
        if(!isValid){
            return false;
        }

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        );
    }

    addLine(dataUser){

        let tr = document.createElement('tr');

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML = `
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${(dataUser.admin) ? 'Sim' : 'Não'}</td>
            <td>${Utils.dateFormat(dataUser.register)}</td>
            <td>
              <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
              <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;

        this.addEventsTr(tr);
        this.tableEL.appendChild(tr);
        this.updateCount();
    }

    static showPanel(type){
        if(type === "create"){
            document.querySelector("#box-user-create").style.display = "block";
            document.querySelector("#box-user-update").style.display = "none";
        }else{
            document.querySelector("#box-user-create").style.display = "none";
            document.querySelector("#box-user-update").style.display = "block";
        }
    }

    updateCount(){
        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEL.children].forEach(tr =>{
            numberUsers++;
            let user = JSON.parse(tr.dataset.user);
            if(user._admin){
                numberAdmin++;
            }
        });

        document.querySelector("#number-users").innerHTML = numberUsers;
        document.querySelector("#number-users-admin").innerHTML = numberAdmin;

    }

    addEventsTr(tr) {
        tr.querySelector(".btn-edit").addEventListener("click", e=>{
            let json = JSON.parse(tr.dataset.user);
            let form = document.querySelector("#form-user-update");

            form.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json){
                let field = form.querySelector("[name=" + name.replace("_", "") + "]");
                if(field){

                    switch (field.type) {
                        case 'file':
                            continue;
                            break;

                        case 'radio':
                            field = form.querySelector("[name=" + name.replace("_", "") + "][value=" + json[name] + "]");
                            field.checked = true;
                            break;

                        case 'checkbox':
                            field.checked = json[name];
                            break;

                        default:
                            field.value = json[name];
                    }
                    field.value = json[name];
                }
            }
            UserController.showPanel("update");
        });
    }
}