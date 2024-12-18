const form = document.getElementById('exameForm'); 

form.addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const clientEmail = document.getElementById("clientEmail").value;
    const exameNome = document.getElementById("exameNome").value;
    const dataExame = document.getElementById("dataExame").value;
    const resultado = document.getElementById("resultado").value;
    const comentarios = document.getElementById("comentarios").value;

    console.log("Email do cliente:", clientEmail);
    console.log("Nome do exame:", exameNome);
    console.log("Data do exame:", dataExame);
    console.log("Resultado:", resultado);
    console.log("Comentários:", comentarios);

    const exameData = {
        clientEmail: clientEmail,
        exameNome: exameNome,
        dataExame: dataExame,
        resultado:  resultado,
        comentarios: comentarios
    }


   try{
        const response = fetch("http://localhost:8080/register/examepost",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(exameData)
        })

        const responseText = await response.text();
        console.log("Resposta do servidor", responseText);

   }catch(error){
    console.log(error)
   }

    alert("Deu certo!");
    
});