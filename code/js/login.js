$(document).ready(function(){

    if (window.location.search.indexOf('?type=') > -1){
        // If form data starts with '?type=', then the user came from registration page and his account is created and ready to be used to sign in
        $('.is-ready').show();
    } else if (window.location.search.indexOf('?email=') > -1){
        // If form data starts with '?email=', then the user came from login page and entered invalid login credentials
        $('#login #email, #login #password').addClass('is-invalid');
    }

    $('#login').on('submit', function(e){

        if(typeof(Storage) !== "undefined"){
            // If no storage is detected, create and store both demo accounts by default
            if (!localStorage.getItem('campingspot_accounts')){

                var accounts = new Array();
                customerAccount = new Object();
                producerAccount = new Object();
                
                // Create demo customer account
                customerAccount = {
                    email: 'as@ua.pt',
                    password: btoa('cliente'),		// Base64 encode
                    type: 'cliente'
                };
                
                accounts.push(customerAccount);
                
                // Store data (both demo accounts) on storage
                localStorage.setItem('campingspot_accounts', JSON.stringify(accounts));
            }

            // Get all saved accounts on storage
            accounts = JSON.parse(localStorage.getItem('campingspot_accounts'));

            // Get values entered by the user on the login fields
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            
            // Cycle through all accounts stored
            accounts.forEach(function(object){
                // Compares both email and password entered by the user with the stored ones
                if(object.email == email && atob(object.password) == password){		// Base64 decode

                    // Store session data on the storage item and remember that this account is logged in
                    localStorage.setItem('campingspot_session', JSON.stringify(object));

                    // After a valid login, choose where to redirect the user, according to their account type
                    if (object.type == 'cliente'){
                        // A  account goes to index page
                        $('#login').attr('action', 'index.html');
                    } else{
                        // A customer account stay to login page
                        alert("Ooops! tu não estás registrado!");
                    }
                }
            });

        } else{
            // Browser does not support web storage
            window.location.replace("error.html");
        }

    });
});