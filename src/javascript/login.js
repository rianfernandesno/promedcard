const linkLogin = document.getElementById('link-login');
const linkCadastro = document.getElementById('link-cadastro');
const containerCadastro = document.querySelector('.container-registrar');
const containerLogin = document.querySelector('.container-login');
const registerButton  = document.getElementById('btn-register');
const loginButton = document.getElementById('btn-login');


linkLogin.addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    containerCadastro.style.display = 'none'; // Oculta o cadastro
    containerLogin.style.display = 'block'; // Mostra o login
});


linkCadastro.addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    containerLogin.style.display = 'none'; // Oculta o login
    containerCadastro.style.display = 'block'; // Mostra o cadastro
});

registerButton.addEventListener('click', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('register-email').value;
    const telephone = document.getElementById('tel').value;
    const password = document.getElementById('register-password').value;
    
    const userData = {
        name: name,
        email: email,
        telephone: telephone,
        password: password
    };

    try{
        const checkResponse = await fetch('http://localhost:8080/register/check-client',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: userData.email})
        })

        if(checkResponse.status == 400){
            alert("Email já registrado");
            return;
        }
    }catch(error){
        console.error("Erro ao verificar email", + error);
        alert("Algo deu errado");
        return;
    }
    
    try {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const responseText = await response.text(); // Lendo como texto primeiro
        console.log('Resposta do servidor:', responseText);

        if (response.ok) {
            // Verifica se a resposta não está vazia
            if (responseText) {
                const data = JSON.parse(responseText); // Parse do texto para JSON
                console.log('Usuário Registrado', data);
                alert('Usuário registrado com sucesso!');
            } else {
                console.error('Resposta vazia do servidor');
                alert('Erro ao registrar usuário. Resposta vazia do servidor.');
            }
        } else {
            console.error('ERROR', response.statusText);
            alert('Erro ao registrar usuário!');
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Erro de rede. Tente novamente.');
    }
});

loginButton.addEventListener('click', async function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const loginData = {
        email : email,
        password : password,
        name: "",
        telephone: ""
    }

    try{
        const response = await fetch('http://localhost:8080/register/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })

        const responseText = await response.text();
        console.log("Resposta do servidor", responseText);

        if(response.ok){
            console.log("Login bem sucedido!", responseText);
            alert('Login bem sucedido');
            localStorage.setItem('userEmail', email);
            if(loginData.email == "professionalaccount@gmail.com" && loginData.password == "professionalaccount"){
                window.location.href = "../../examesPost.html"
            }else{
                window.location.href = "../../exames.html"
            }
        } else{
            console.error("Algo deu errado!");
            alert("Credencias erradas");
        }
    }catch(error){
        console.error("Erro de rede: " + error)
        alert("Error de rede! Tente novamente.")
    }
    
})






