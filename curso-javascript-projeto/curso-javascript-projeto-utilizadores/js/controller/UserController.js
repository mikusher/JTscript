class UserController {
    constructor(formId, tableId){
        this.formEL = document.getElementById(formId);
        this.tableEL = document.getElementById(tableId);
        this.onSubmit();
        this.onEdit();
    }

    onEdit(){
        document.querySelector("#box-user-update .btn-cancel").addEventListener("click", e=>{
            UserController.showPanel("create");
        });
    }

    onSubmit(){
        
        this.formEL.addEventListener("submit", (event) => {
            event.preventDefault();

            let btn = this.formEL.querySelector("[type=submit]");
            btn.disabled = true;

            let values = this.getValues();

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

    getValues(){
        let user = {};
        var isValid = true;

        [...this.formEL.elements].forEach(function (field, index) {
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

        tr.querySelector(".btn-edit").addEventListener("click", e=>{
            JSON.parse(tr.dataset.user);
            UserController.showPanel("update");
        });

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
}