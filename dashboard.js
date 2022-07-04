window.onload = async function(){
    let responseContent = document.getElementById('response-content');
    let logOutBtn = document.getElementById('logout-btn');
    let tableError = document.getElementById("table-error");
    fetch('https://basic-server-one.vercel.app/users')
    .then(response => response.json())
    .then(response => {
        table = `
        <table>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>    
        `
        for (let i = 0; i < response.data.length; i++) {
            table += '<tr>'
            table += `<td>${response.data[i].username}</td>\n`
            table += `<td>${response.data[i].email}</td>\n`
            table += `<td>${response.data[i].phone}</td>\n`
            table += '</tr>\n'
        }
        table += '</table>'
        responseContent.innerHTML = table
    })
    .catch(error => {
        console.log('ERROR', error)
        tableError.classList.remove('hiddenError');
    })
    
    logOutBtn.addEventListener("click", function () {
        localStorage.removeItem('login')
        window.location.href='index.html'
    })
}

