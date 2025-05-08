function encurtar_link() {
    let link = document.getElementById("link").value;
    let result_link = document.getElementsByClassName("resultado_encurtador")[0];

    if (!link) {
        result_link.innerHTML = "❌ Por favor, insira uma URL válida.";
        return;
    }
    //precisa criar uma api 
    fetch("https://cleanuri.com/api/v1/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `url=${encodeURIComponent(link)}`
    })
    
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                const shortLink = data.result.full_short_link;
                result_link.innerHTML = `
                    ✅ Link encurtado: <a href="${shortLink}" target="_blank">${shortLink}</a>
                    <br><button onclick="copiarLink('${shortLink}')">Copiar</button>
                `;
            } else {
                result_link.innerHTML = "❌ Erro ao encurtar o link.";
            }
        })
        .catch(() => {
            result_link.innerHTML = "❌ Erro na conexão com a API.";
        });
}

function copiarLink(link) {
    navigator.clipboard.writeText(link).then(() => {
        alert("📋 Link copiado!");
    });
}

// feito, falta arrumar o css 
function gerar_qrcode() {
    let linkqr = document.getElementById('qrcode_input').value; // Correção aqui: 'getElementById'
    let qrimg = document.getElementsByClassName('qrimg')[0]; // Correção: acessando o primeiro item da coleção

    qrimg.innerHTML = ""

    if (!linkqr) {
        qrimg.innerHTML = '❌ Por favor, insira uma URL válida.';
        return;
    }

    const qr = new QRCode(qrimg, {
        text: linkqr, // Correção: passando o texto correto
        width: 200,
        height: 200,
        correctLevel: QRCode.CorrectLevel.H // Correção: usando a referência certa
    });

    setTimeout(() => {
        const img = qrimg.querySelector("img");
        if (img) {
            const baixarLink = document.getElementById("baixarLink");
            baixarLink.href = img.src;
            baixarLink.style.display = "inline-block";
        }
    }, 300);
}

// falta o video do youtube, provavelmente precisa de api tmbm 