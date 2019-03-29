window.fbAsyncInit = function() {
    FB.init({
      appId      : '1895048947452061',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.0'
    });
      
    FB.login(function (response) {
      ValidateUser();
      }, {scope: 'public_profile, email '});

      function ValidateUser ()
      {
          FB.getLoginStatus(function(response) {
              statusChangeCallback(response);
          });
      }

      function statusChangeCallback ()
      {
          console.log('statusChangeCallback');
          console.log(response);
          if (response.status === 'connected')
          // Logged into your app and Facebook
              testAPI();
          else // The person is not logged or we are unable to tell
              alert('unable to login');
      }

      function testAPI ()
      {
          console.log('Welcome! Fetching your information.... ');
          FB.api('/me?fields=id,name,first_name,email,picture', function(response) {
              // The user was logged successfully
              console.log('Successful login for: ' + response.name);
              console.log(response);
          });
      }

      function CloseFacebook ()
      {
          FB.getLoginStatus(function (response) {
          if (response.status === 'connected')
          {
              FB.logout(function (response) {
                  console.log('User logged out');
                  setTimeout(function () {
                     // Exit game
                  }, 500);
              });
          }
          });
      }

      function ShareOnFB (userName, score, level)
      {
          FB.ui({
              method: 'share', // feed = new, share = share
              display: 'popup',
              quote: userName + ' has won ' + score + ' in the level ' + level,
              href: 'https://developers.facebook.com/docs/', // Replace with game's source path
          }, function(response){});
      }

    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));