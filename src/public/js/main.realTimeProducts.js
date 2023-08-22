const socket = io();
const content = document.getElementById("content");

socket.on("realTimeProducts", (data) => {
    let salida = ``;

    data.forEach(item => {
        salida += `<div class="col-md-4">
        <div class="card border-0 mb-3">
            <img src="${item.thumbnail}" class="img-fluid" alt="${item.title}">
            <div class="card-body text-center">
                <p class="card-text">${item.title}<br><span class="text-success">$${item.price}</span></p>
            </div>
        </div>
    </div>`;
    });

    content.innerHTML = salida;
});