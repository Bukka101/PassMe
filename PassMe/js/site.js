var user = null; //Spacifies the Admin
var viewId = 0; //Id used to view account specific record. 0 views all records

$(document).ready(function () {
    //Displays the Create Admin pannel (This is only visible at the first instance of using the system. Creates Admin for the system)
    if(GetJSON("Admin") != null){
        $("#createAdmin").css("display","none");
    }
    
    // Loads Dashboard page
    $(".dash").click(function () {
        $("#container").load("dashboard.html", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "error")
                alert(xhr.status + ": " + xhr.statusText);
        });
    });

    //Loads Add Account page 
    $("#add").click(function () {
        $("#page-content-wrapper").load("add_account.html", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "error")
                alert(xhr.status + ": " + xhr.statusText);
        });
    });

    //Loads Search page 
    $("#search").click(function () {
        $("#page-content-wrapper").load("search.html", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "error")
                alert(xhr.status + ": " + xhr.statusText);
        });
    });

    //Loads View Account page 
    $("#view").click(function () {
        $("#page-content-wrapper").load("view_account.html", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "error")
                alert(xhr.status + ": " + xhr.statusText);
        });
    });

    //Loads Admin page 
    $("#admin").click(function () {
        $("#page-content-wrapper").load("admin.html", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "error")
                alert(xhr.status + ": " + xhr.statusText);
        });
    });

    //Loads Create Admin page 
    $("#create").click(function () {
        $("#container").load("createadmin.html", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "error")
                alert(xhr.status + ": " + xhr.statusText);
        });
    });

    //Loads Login (index) page 
    $("#logout").click(function () {
        $("#container").load("index.html", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "error")
                alert(xhr.status + ": " + xhr.statusText);
        });
    });
});

//Fetches JSON from localstorage
function GetJSON(database){
    var jsonData = JSON.parse(localStorage.getItem(database));
    return jsonData;
}

//Login
function Login(){
    var uName= $("#inputUsername").val();
    var pWord = $("#inputPassword").val();
    if(Check(uName) && Check(pWord)){
        if(GetJSON("Admin") != null){
            var data = GetJSON("Admin");
            for(var i=0; i<data.Admin.length; i++){
                if(uName.trim()=== data.Admin[i].Username && pWord.trim()=== data.Admin[i].Password){
                    user = data.Admin[i].id;
                    break;
                }
            }
            if(user != null){
                $("#container").load("dashboard.html", function (responseTxt, statusTxt, xhr) {
                    if (statusTxt == "error")
                        alert(xhr.status + ": " + xhr.statusText);
                });
            }
            else{
                alert("Invalid Login! Please enter correct details");
                $("#inputUsername").val("");
                $("#inputPassword").val("");
            }
        }
        else{ alert("No Admin data registered! please register first");}
    }
    else{alert("Invalid character detected!");}
}

//Stores Admin to localstorage
function CreateAdmin(){
    var user= $("#inputUser").val();
    var pWord = $("#inputUserPassword").val();
    var cPWord = $("#inputCUserPassword").val();
    if(pWord === cPWord){
        if(Check(user) == true && Check(pWord) == true){
            if(PasswordStrength(pWord)>=3){
                data = {"Admin":[
                    {
                        "id":1,
                        "Username" : "Shirley",
                        "Password":"shirleypassword",
                        "Application" : "Snap!",
                        "PlayMins" : 23,
                        "Score" : 3, 
                        "Level" : 1
                    },
                    {
                        "id":2,
                        "Username" : user,
                        "Password":pWord,
                        "Application" : "instagram!",
                        "PlayMins" : 24,
                        "Score" : 10, 
                        "Level" : 1}    
                ]};

                localStorage.setItem("Admin", JSON.stringify(data));
                location.reload();
            }
            else
                alert("Weak Password! Kindly enter a strong password for account security");
        }
        else
            alert("Invalid character detected!");
    }
    else{
        alert("Password mismatch!");
    }
}

//Edit Admin password and store to localstorage
function EditAdmin(){
    var pWord = $("#editInputUserPassword").val();
    var cPWord = $("#editInputCUserPassword").val();
    if(pWord === cPWord){
        var database = GetJSON("Admin");

        database.Admin[1].Password = pWord;

        localStorage.setItem("Admin", JSON.stringify(database));
        alert("Password Changed successfully");

        $("#container").load("dashboard.html", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "error")
                alert(xhr.status + ": " + xhr.statusText);
        });
    }
    else{
        alert("Password mismatch!");
    }
}

//Add or stores account record to localstorage
function AddAccount(){
    var app= $("#inputApp").val();
    var user= $("#inputAppUser").val();
    var email= $("#inputEmail").val();
    var pWord = $("#inputAppPassword").val();
    var cPWord = $("#inputCAppPassword").val();
    var database;
    var id;
    var duplicate = false;
    if(pWord === cPWord){
        if(Check(user) == true && Check(pWord) == true){
            if(GetJSON("Apps") !== null){
                database = GetJSON("Apps");
                if(database.length == 0)
                    id = 1;
                else
                    id = database[database.length-1].id+1;
            }
            else{
                database = [];
                id = 1;
            }

            data = {
                "id": id,
                "Username" : user,
                "Email": email,
                "Password": pWord,
                "Password_Strength": PasswordStrength(pWord),
                "Application" : app,
                "PlayMins" : 23,
                "Score" : 3, 
                "Level" : 1
            };

            for(var i=0; i<database.length; i++){
                if(database[i].Username == user && database[i].Email == email && database[i].Password == pWord && database[i].Application == app){
                    duplicate = true;
                    break;
                }
            }

            if(duplicate == false){
                database.push(data);
                localStorage.setItem("Apps", JSON.stringify(database));
                alert("Data added successfully");

                $("#page-content-wrapper").load("add_account.html", function (responseTxt, statusTxt, xhr) {
                    if (statusTxt == "error")
                        alert(xhr.status + ": " + xhr.statusText);
                });
            }
            else{
                alert("Duplicate Entry! Data already exists...");
            }
        }
        else
            alert("Invalid character detected!");
    }
    else{
        alert("Password mismatch!");
    }
}

//Determines the strength of a password
function PasswordStrength(input){
    var i = input.length;
    var specialChar=false;
    var number = false;
    var uppercase = false;
    var lowercase = false;
    var len = false;
    for(var x = 0; x< i;x++){
        if((input.charCodeAt(x)>32 && input.charCodeAt(x)<48) || (input.charCodeAt(x)>57 && input.charCodeAt(x)<65)|| (input.charCodeAt(x)>90 && input.charCodeAt(x)<97) || (input.charCodeAt(x)>122 && input.charCodeAt(x)<127)){
            specialChar=true;
        }
        else if(input.charCodeAt(x)>47 && input.charCodeAt(x)<58){
            number = true;
        }
        else if(input.charCodeAt(x)>64 && input.charCodeAt(x)<91){
            uppercase = true;
        }
        else if(input.charCodeAt(x)>96 && input.charCodeAt(x)<123){
            lowercase = true;
        }
    }
    if(i>8)
        len=true;

    var array = [len,specialChar,number,uppercase,lowercase];
    var strength = array.filter(Boolean).length;
    return strength;
}

//Displays password strength as user fills form
function ShowPasswordStrength(input,progress){
    var strength = PasswordStrength(input);
    if(strength ==1){
        DisplayProgress(progress,"progress-bar bg-danger",20,"Very weak")
    }
    else if(strength ==2){
        DisplayProgress(progress,"progress-bar bg-warning",35,"Weak")
    }
    else if(strength ==3){
        DisplayProgress(progress,"progress-bar bg-info",50,"Medium")
    }
    else if(strength ==4){
        DisplayProgress(progress,"progress-bar bg-info",70,"Strong")
    }
    else if(strength ==5){
        DisplayProgress(progress,"progress-bar bg-success",100,"Very strong")
    }
    else{
        $(progress).parent().css("display","none");
    }
}

//Makes the password strength progress visible
function DisplayProgress(progress,cssClass,value,text){
    $(progress).removeClass();
    $(progress).parent().css("display","block");
    $(progress).addClass(cssClass);
    $(progress).css({"width":value+"%", "aria-valuenow":value});
    $(progress).html(text);
}

//Checks for invalid characters in form fields
function Check(input){
    var invalid = false;
    var unaccepted=[34,38,39,60,61,62,92,124];
    for(var i=0; i<input.length; i++){
        if((unaccepted.indexOf(input.charCodeAt(i)) != -1)){
            invalid=true;
        }
    }
    if(invalid==true){
        return false;
    }
    else
        return true;
}

//Displays password match progress
function ShowPasswordMatch(input,inputMatch,progress){
    if(input.length>0){
        if(input === inputMatch){
            DisplayProgress(progress,"progress-bar bg-success",100,"Password Match");
        }
        else{
            DisplayProgress(progress,"progress-bar bg-danger",70,"Password Mismatch");
        }
    }
    else{
        $(progress).parent().css("display","none");
    }
}

//View account record. Id specifies the id of the account, 0 views all accounts
function ViewAccount(id){
    if(GetJSON("Apps") != null){
        var data;
        if(id == 0){
            data = GetJSON("Apps");
        }
        else{
            var getData = GetJSON("Apps");
            for(var i=0; i<getData.length; i++){
                if(getData[i].id == id){
                    data = [{
                        "id": getData[i].id,
                        "Username" : getData[i].Username,
                        "Email": getData[i].Email,
                        "Password": getData[i].Password,
                        "Password_Strength": getData[i].Password_Strength,
                        "Application" : getData[i].Application,
                        "PlayMins" : getData[i].PlayMins,
                        "Score" : getData[i].Score, 
                        "Level" : getData[i].Level
                    }];
                    break;
                }
            }
        }
        for(var i=0; i<data.length; i++){
            if(data[i].Password_Strength ==1){
                strength="<div class='progress'><div class='progress-bar bg-danger' role='progressbar' style='width: 100%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'>Very Weak!!! change now</div></div>";
            }
            else if(data[i].Password_Strength ==2){
                strength="<div class='progress'><div class='progress-bar bg-warning' role='progressbar' style='width: 100%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'>Weak!!! change now</div></div>";
            }
            else if(data[i].Password_Strength ==3){
                strength="<div class='progress'><div class='progress-bar bg-info' role='progressbar' style='width: 100%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'>Average!!! change</div></div>";
            }
            else if(data[i].Password_Strength ==4){
                strength="<div class='progress'><div class='progress-bar bg-success' role='progressbar' style='width: 100%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'>Strong!</div></div>";
            }
            else if(data[i].Password_Strength ==5){
                strength="<div class='progress'><div class='progress-bar bg-success' role='progressbar' style='width: 100%' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100'>Very Strong!</div></div>";
            }
            $("#viewTable > tbody").append(
                "<tr><th scope='row'>"+data[i].id+
                "</th><td>"+data[i].Application+
                "</td><td>"+data[i].Username+
                "</td><td>"+data[i].Email+
                "</td><td>"+data[i].Password+
                "</td><td>"+strength+
                "</td><td><button type='button' class='btn btn-primary btn-sm editButton'>Edit</button></td><td><button type='button' class='btn btn-danger btn-sm deleteButton'>Delete</button></td></tr>"
            );
        }
        
    }
    else{ 
        $("#viewTable > tbody").append("<tr><th scope='row' colspan=7> No entry </th></tr>");
    }
}

//Edit and submit account record to localstorage
function EditAccount(){
    var id = $("#editInputId").val();
    var app= $("#editInputApp").val();
    var user= $("#editInputAppUser").val();
    var email= $("#editInputEmail").val();
    var pWord = $("#editInputAppPassword").val();
    var database = GetJSON("Apps");
    for(var i=0; i<database.length; i++){
        if(database[i].id == id){
            database[i].Application = app;
            database[i].Username = user;
            database[i].Email = email;
            database[i].Password = pWord;

            localStorage.setItem("Apps", JSON.stringify(database));
            alert("Edit successfully");
            break;
        }
    }
    $("#container").load("dashboard.html", function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "error")
            alert(xhr.status + ": " + xhr.statusText);
    });
}


//Displays search suggestions as user types
function SearchSuggestions(){
    $("#list").html("");
    var database = GetJSON("Apps");
    if($("#searchInput").val() != ""){
        var input = new RegExp($("#searchInput").val(), "i");
        for(var i=0; i<database.length; i++){
            if(input.test(database[i].Application)){
                $("#list").append("<a href='#' name='"+database[i].id+"' onclick='viewId=$(this).attr(\"name\"); Process();'><li>"+database[i].Application+"</li></a>");
            }
            if(input.test(database[i].Username)){
                $("#list").append("<a href='#' name='"+database[i].id+"' onclick='viewId=$(this).attr(\"name\"); Process();'><li>"+database[i].Username+"</li></a>");
            }
        }
    }
}

//loads the view account page
function Process(){
    $("#page-content-wrapper").load("view_account.html", function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "error")
            alert(xhr.status + ": " + xhr.statusText);
    });
}