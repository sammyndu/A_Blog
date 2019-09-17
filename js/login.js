$(document).ready(function(){
    $('#submit').click(function(e){
        e.preventDefault();
        let email = $('#email').val();
        let password = $('#password').val();
        $.ajax({
            url: `http://localhost:3000/users?email=${email}`, success: function(obj){
                console.log(obj);
            if (obj.length === 0){
                $('.alert').removeClass('hide');
                $('.alert').addClass('show');
                $('#message').html('Username does not exist')
                alert(1);
            }
            else if (obj[0].password !== password){
                $('.alert').removeClass('hide');
                $('.alert').addClass('show');
                $('#message').html('Incorrect username or password')
            }
            else{
                sessionStorage.setItem('user_email', obj[0].email);
                sessionStorage.setItem('user_id', obj[0].id);
                window.location.href="index.html";
            }
            },
            method:'GET',
        })
    })
})