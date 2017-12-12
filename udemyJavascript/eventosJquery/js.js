$(document).ready( function () { 
    console.log('hello JS - Mouse');
    //click
    //dbclick
    //mousedown
    //mouseover

    $('#div1').click(function () { 

        console.log('elemento clicado');
        
    });

 });

 $(document).ready( function () { 
    console.log('hello JS - Teclado');

    //pesquisa pelo ID usando o # ou pela classe usando o ( . )
    $('#username').click(function () { 

        console.log('username clicado');
        
    });

    $('#password').click(function () { 
        
        console.log('password clicado');
                
    });

    $('#entradas').blur(function () { 
        notification();
    });
 });

$(document).ready(function () {
    $('.campos').change(function () { 
        document.getElementById("username").value = $(".campos option:selected").text();       
    });
});

 function clickGo(inputU, inputP) {
     var realU = 'luis';
     var realP = 'amilcar';

     if (inputU != realU || inputP != realP) {
         console.log("User ou password errado");
     } else {
        window.location.href = 'toGo.html?'+inputU;
     }
 }

 function clickClean(inputU, inputP) {
    inputU = '';
    inputP = '';
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

 }

 function nameHello() {
     
     var url = window.location.search;
     var name = url.replace("?", "");
     document.getElementById('helloName').innerHTML = name;

 }

 function notification() {
    var msg = 'Por favor, campo necessario';
    document.getElementById('notificationMenssage').innerHTML = msg;
 }

 function validate(params) {
    var rst = (params == '') ? notification() : document.getElementById('notificationMenssage').innerHTML = '';
 }

 function multipleValidate(paramsU,paramsP) {
    var rst = (paramsU == '' || paramsP  == '') ? notification() : document.getElementById('notificationMenssage').innerHTML = '';
 }