document.addEventListener('DOMContentLoaded', ()=>{

    var btn = document.getElementById('button')
    var inpcrcy = document.getElementById('Currency')
    var crcy = "https://api.exchangerate-api.com/v4/latest/USD";

    btn.disabled= true

    inpcrcy.onkeyup = ()=>{
        if (inpcrcy.value.length > 0){
            btn.disabled = false 
            btn.setAttribute('id', 'avaible')
        } else{
            btn.disabled = true
            if (btn.querySelector('#avaible')){
                btn.removeAttribute('id', 'avaible')
            }
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
            if (document.querySelector('.conversion')){
                if (!data.rates[vlrinpt]){
                    document.querySelector('.conversion').innerHTML = "Introduced currency isn't valid"
                } else{
                    document.querySelector('.conversion').innerHTML = `1 USD equals to ${data.rates[vlrinpt]} ${vlrinpt}`
                }
            } else if (!document.querySelector('.conversion')){
                if (!data.rates[vlrinpt]){
                    var conversion = document.createElement('p');
                    conversion.classList.add('conversion')
                    conversion.innerHTML = "Introduced currency isn't valid"
                    document.querySelector('.mainDiv').appendChild(conversion)
                    document.querySelector('.mainDiv').insertBefore(conversion, document.querySelector('#frm'))
                } else{
                    var conversion = document.createElement('p');
                    conversion.classList.add('conversion')
                    conversion.innerHTML = `1 USD equals to ${data.rates[vlrinpt]} ${vlrinpt}`
                    document.querySelector('.mainDiv').appendChild(conversion)
                    document.querySelector('.mainDiv').insertBefore(conversion, document.querySelector('#frm'))
                }

            }
            
        })
    })

    // console.log(crcy.rates['USD'])

})