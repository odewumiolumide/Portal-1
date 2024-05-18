
const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;

    }, i+100);
})

window.onload = () => {
    if(sessionStorage.name){
        location.href = '/'
    }
}

const name = document.querySelector('.name') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

if(name == null){
    submitBtn.addEventListener('click', () => {
        fetch('login', {
            method: 'post',
            headers: new Headers({'Content-Type' : 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(res => res.json())
        .then(date => {
            if(database.name){
                alert('login sucessful');
            } else{
                alert(data);
            }
        })
    })

}else{
    submitBtn.addEventListener('click', () => {
        fetch('register', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(date => {
            ValidateData(data);
        })
    })
}

const ValidateData = (data) => {
    if(!data.name){
        alertBox(data);
    }else{
        sessionStorage.name = data.name;
        sessionStorage.name = data.email;
        location.href = '/'
        
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;
    alertContainer.style.top = '5%';
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}