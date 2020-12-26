(() => {
    const search = document.getElementById('search')
    search.addEventListener('click', (event) => {
        const add = document.getElementById('address').value;
        const result = document.getElementById('result')
        fetch('/weather?address='+add).then((response) => {
    response.json().then((data) => {
        result.innerHTML = '';
        if (data.error) {
            result.innerHTML=`<p>${data.error}</p>`
        }
        else {
            result.innerHTML = `<p>${data.temprature}<br>${data.address}</p>` 
            
        }
       
    })
})
})
})();



