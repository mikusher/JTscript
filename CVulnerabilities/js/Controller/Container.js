$(document).ready(function (params) {

    var divContainerPosition = document.getElementById("containerPosition");
    var btSearch = document.getElementById("btSearchContainer");

    btSearch.addEventListener("click", function (params) {

        var inputUrl = document.getElementById("inputSearchContainer").value;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', inputUrl, true);
        xhr.send();
    
        xhr.onreadystatechange = processRequest(xhr);
        console.log(xhr.onreadystatechange);

    });

    function processRequest(xhr) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            return response;
        }
    }
});