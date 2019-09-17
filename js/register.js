$(document).ready(function(){
    $('#submit').click(function(e){
        e.preventDefault();
        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();
        if(name==='' || email==='' || password === ''){
            $(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <span id="message">Please enter all fields</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).insertBefore('.card');
            // $('.alert').removeClass('hide');
            // $('.alert').addClass('show');
            // $('#message').html('Please fill all fields')
        }
        else{
            $.ajax({
                url: `http://localhost:3000/users?email=${email}`, success: function(result){
                    console.log(result);
                    if (result.length===0){
                        $.ajax({
                            url: 'http://localhost:3000/users', success: function(){
                             $.ajax({
                                 url: `http://localhost:3000/users?email=${email}`, success: function(user){
                                    console.log(user);
                                    sessionStorage.setItem('user_id', user[0].id);
                                    sessionStorage.setItem('user_name', user[0].name);
                                    window.location.href="index.html";
                                 } 
                             })
                            // window.location.href='index.html';
                            },
                            method: 'POST',
                            data:{
                                name,
                                email,
                                password
                            }
                        })
                    }
                    else{
                        $(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <span id="message">Email already registered</span> 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`).insertBefore('.card');
                    }
                },
                method: 'GET'
            })
        }
    })
})