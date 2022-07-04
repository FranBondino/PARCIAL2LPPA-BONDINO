
window.onload = function () {
    let formUsuario = document.getElementById('formUser')
    let emailError = document.getElementById('email-error');
    let loginFail = document.getElementById('login-fail');
    let expReg =  /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    
    //redirecciona a dashboard en caso de que ya este logeado
    if(localStorage.getItem('login')){
        window.location.href="dashboard.html";
    }

    formUsuario.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(formUsuario);
        let x = formData.get('mailInput');
        let esValido = expReg.test(x);
        if(esValido){
            emailError.classList.add('hiddenError');
            fetch("https://basic-server-one.vercel.app/login", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                email: formData.get('mailInput'),
                password: formData.get('passwordInput')
                })
            })
            .then(response => {
                if(response.ok){
                    loginFail.classList.add('hiddenError');
                    localStorage.setItem('login',true)
                    window.location.href="dashboard.html";
                }
                else {
                    loginFail.classList.remove('hiddenError');
                }
                
            })
            .catch(error => console.log('Hubo un error', error))
        }
        else {
            loginFail.classList.add('hiddenError');
            emailError.classList.remove('hiddenError');
        }
    })
             
}
