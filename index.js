document.addEventListener('DOMContentLoaded', ()=>{

    var btn = document.getElementById('button')
    var inpcrcy = document.getElementById('Currency')
    var crcy = "https://api.exchangerate-api.com/v4/latest/USD";

    btn.disabled= true

    inpcrcy.onkeyup = ()=>{
        if (inpcrcy.value.length > 0){
            btn.disabled = false 
        } else{
            btn.disabled = true
        }

    }
    inpcrcy.parentNode.addEventListener('submit', (e)=>{
        e.preventDefault();

        var vlrinpt = inpcrcy.value;
        vlrinpt = vlrinpt.toUpperCase();
        inpcrcy.value = "";
        fetch(`${crcy}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            var conversion = document.createElement('p');
            conversion.innerHTML = `1 USD equals to ${data.rates[vlrinpt]} ${vlrinpt}`
            var body = document.querySelector('body');
            document.querySelector('.mainDiv').appendChild(conversion)
            document.querySelector('.mainDiv').insertBefore(conversion, document.querySelector('#frm'))
        })
    })

    // console.log(crcy.rates['USD'])

})