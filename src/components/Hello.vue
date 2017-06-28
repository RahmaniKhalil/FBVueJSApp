<template>
  <div class="hello">
    <h1 id="msg1">{{ msg1 }}</h1>
    <h1 id="msg2" style="display:none;">{{ msg2 }} : <strong id="user"></strong></h1>
    <fb-signin-button id="login-btn" style="margin:1px solide blue;"
      :params="fbSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
      Sign in with Facebook
    </fb-signin-button>

    <center>
      <button class="btn btn-sm btn-danger" id="logout-btn" style="display:none;margin:5px">Logout</button>
    </center>


    <div class="container">
      <div id="profile"></div>
      <br>
      <div class="row">
        <div id="Albums">

        </div>
      </div>

    </div>




  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg1: 'Login to get your prfile data...',
      msg2: 'Welcome to your profile data page',
      fbSignInParams: {
        scope: 'email,user_photos',
        return_scopes: true
      }

    }
  },
  created:function () {
    // init Facebook SDK
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '282173615581013',
        cookie     : true,  // enable cookies to allow the server to access the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.9' // use graph api version 2.8
      });

      FB.getLoginStatus(function(response) {

        });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));




  },
  methods: {
    onSignInSuccess (response) {
      FB.api('/me?fields=id,name,email,photos,location,birthday,albums', dude => {
        console.log(`Good to see you, ${dude.name} - ${dude.email}.`)
        console.log(dude)
        let userName = dude.name;
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('msg1').style.display = 'none';
        document.getElementById('msg2').style.display = 'block';
        document.getElementById('user').innerHTML = userName;

        // fetch some basic info
        let profile = `
          <ul class="list-group">
            <li class="list-group-item"><strong>User ID:</strong> ${dude.id}</li>
            <li class="list-group-item"><strong>Email:</strong> ${dude.email}</li>
            <li class="list-group-item"><strong>Birthday:</strong> ${dude.birthday}</li>
            <li class="list-group-item"><strong>User Location:</strong> ${dude.location.name}</li>
          </ul>
        `;
        document.getElementById('profile').innerHTML = profile;
        document.getElementById('logout-btn').style.display = 'block';


      }) // END FB API

      FB.api('/me/albums?fields=name,count,created_time,picture', alb => {


        // fetch Albums
        var album='';
        for (let i = 0; i < alb.data.length; i++) {
          album += `
          <div class="col-md-3">
            <div class="card" id="album-card" style="border:1px solid gray;border-radius:1em;padding:5px; margin:5px">
              <img style="width:100px;height:100px;" class="card-img-top" src="${alb.data[i].picture.data.url}">
              <div class="card-block">
                <h4 class="card-title">${alb.data[i].name}</h4>
                <p class="card-text"><strong>pictures:</strong> ${alb.data[i].count}</p>
                <a href="#" class="btn btn-info">Check photos</a>
              </div>
            </div>
          </div>
          `;

        }
        document.getElementById('Albums').innerHTML = album;

      }) // END FB API
    },
    onSignInError (error) {
      console.log('OH NOES', error)
      document.getElementById('profile').style.display = 'none';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}

#logout-btn{

  padding: 4px 8px;
  color: #fff;
}
h1, h2 {
  font-weight: normal;
}

</style>
