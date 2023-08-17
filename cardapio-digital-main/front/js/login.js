window.onload = () => {
    const url = window.location.search;

    console.log("URL: " + url);
    const urlParams = new URLSearchParams(url);
    const warning = urlParams.get('warning');
    const fromUrl = urlParams.get('from');
    console.log(warning);

    // mostrar erro email ou senha errados
    if (warning == 1) {
        label = document.getElementById('warning');        
        label.innerHTML = '<label>Email ou senha incorretos.</label>';
    }
    console.log("FROM: " + fromUrl);
    if (fromUrl) 
        form = document.getElementById('form');
        form.action = `/entrar?from=${fromUrl}`
}