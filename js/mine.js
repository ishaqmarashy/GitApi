$(document).ready(function(){
   $('#searchUser').on('keyup', function(e){
    let username = e.target.value;
    let idt=e.target.name;
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
        client_id:'12d978262b59208c9198',
        client_secret:'8c9e5f37e5ec8d5cb3336d5ba8b81fed2c504e8b'
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'12d978262b59208c9198',
          client_secret:'8c9e5f37e5ec8d5cb3336d5ba8b81fed2c504e8b',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <style>table {font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 300;}td, th {
                border: 2px solid #dddddd;
                text-align: left;
                padding: 8px;}
            tr:nth-child(even) {background-color: #dddddd;}
            </style>
            <table><tr role="row" class="even"><th><p hidden><input  id='`+index+`rname' type='text' readonly value='${repo.name}' ></p>${repo.name}</th>
                          </tr><tr role="row" class="even">
                          <th>Description</th>
                          <th>Watchers</th>
                          <th>Forks</th> 
                          <th>Stars</th>
                          <th>Url</th>
                        <tr role="row" class="even">
                          <td><p hidden><input  id='`+index+`rdescription' type='text' value='${repo.description}' ></p>${repo.description}</td>
                          <td>${repo.watchers_count}</td>
                          <td>${repo.forks_count}</td>
                          <td>${repo.stargazers_count}</td>
                          <td><p hidden><input  id='`+index+`repourl'  type='text' readonly value='${repo.html_url}' ></p><a href='${repo.html_url}'>${repo.html_url}</a></td> 
                        </tr></tr></table><br>`);});});
      $('#profile').html(`
        <style>table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 300;} td, th {
                border: 2px solid #dddddd;
                text-align: left;
                padding: 8px;}
            tr:nth-child(even) {background-color: #dddddd;}
            </style>
            <br>

            <script src='js/button.js'></script>
            
            <p hidden><input  id='oname'  type='text' readonly value='${user.name}' ></p>
            <a>Name: ${user.name}</a><br>
              <img src='${user.avatar_url}''>
              <br>
              <p hidden><input id='opage' type='text' readonly value='${user.html_url}' ></p>
              <a href="${user.html_url}">Profile</a>
              <table><tr role="row" class="even"><th>Public Repos</th>
              <th>Public Gists</th>
              <th>Followers</th>
              <th>Following</th></tr>
              <tr role="row" class="even"><th>${user.public_repos}</th>
              <th>${user.public_gists}</th>
              <th>${user.followers}</th>
              <th>${user.following}</th></tr></table>
              <table><tr role="row" class="even"><th>Company</th>
              <th>Website</th>
              <th>Location</th>
              <th>Member Since</th></tr>
              <th>${user.company}</th>
              <p hidden><input  id='website'  type='text' readonly value='${user.blog}' ></p>
              <th><a href="${user.blog}">${user.blog}</th>
              <th>${user.location}</th>
              <th>${user.created_at}</th></tr></table>
              <br><div id="repos"></div>
              `);});});});
