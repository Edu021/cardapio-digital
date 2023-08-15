window.onload = () => {
    const url = window.location.search;

    console.log("URL: " + url);
    const urlParams = new URLSearchParams(url);
    const warning = urlParams.get('warning');
    console.log(warning);


    // mostrar erro email ou senha errados
    if (warning == 1) {
        label = document.getElementById('warning');        
        label.innerHTML = '<label>Email ou senha incorretos.</label>';
    }

}