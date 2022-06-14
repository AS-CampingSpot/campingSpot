$(document).ready(function(){

    $('#registration').on('submit', function(e){
        if(typeof(Storage) !== "undefined"){
            // If no storage is detected, create and store both demo accounts by default
            if (!localStorage.getItem('campingspot_accounts')){

                var accounts = new Array();
                customerAccount = new Object();
              
                
                // Create demo customer account
                customerAccount = {
                    email: 'cliente@ua.pt',
                    password: btoa('cliente'),		// Base64 encode
                    type: 'cliente'
                };
                
                accounts.push(customerAccount);
                
                // Store data (both demo accounts) on storage
                localStorage.setItem('campingspot_accounts', JSON.stringify(accounts));
            }

            // Get values from the registration form
            var email = $("#registration input[name=email]").val();
            var password = $("#registration input[name=password]").val();
            var type = $("#registration input[name=type]:checked").val();

            // Get storage, append the new account created and save it again on storage
            accounts = JSON.parse(localStorage.getItem("campingspot_accounts"));
            
            accounts.push(
                {
                    email: email,
                    password: btoa(password),		// Base64 encode
                    type: type
                }
            );

            localStorage.setItem('campingspot_accounts', JSON.stringify(accounts));

        } else{
            // Browser does not support web storage
            window.location.replace("error.html");
        }
        
    });
});