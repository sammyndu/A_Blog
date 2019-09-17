$(document).ready(function(){
    let id = sessionStorage.getItem('user_id');
    let name = sessionStorage.getItem('user_name');
    if (id===undefined){
        $('#welcome-user').hide('fast')
    }
    else{
        $('#log-in').hide('fast')
        $('#sign-up').hide('fast')
        $('#welcome-user').show('fast')
        $('#welcome-user').html(`Welcome ${name.split(" ")[0]}`)
    }
    // console.log(user)
    $.ajax({
        url: 'http://localhost:3000/posts?_sort=id&_order=desc', success: function(result){
        console.log(result);
        for (let i =0; i<result.length; i++){
            $.ajax({
                url: `http://localhost:3000/users/${result[i].author_id}`, success: function(user){
                    $('.posts').append(`
                <div class="card" style="width: 30rem;">
                    
                    <div class="card-body bg">
                        <h5 class="card-title">${result[i].title}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="card-link">Go somewhere</a><br>
                        <span>Written by ${user.email}</span>
                    </div>
                </div>`)
                },
                method: 'GET'
            })
        }
        },
        method:'GET',
    })
    // console.log(posts);
    
});