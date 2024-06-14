const btnEl = document.querySelector(".btn");
const inputEl = document.getElementById("input");
const copyEl = document.querySelector(".fa-copy");
const alertContainerEl = document.querySelector(".alert-container");

btnEl.addEventListener("click", () => {
    createPassword();
});

copyEl.addEventListener("click", () => {
    copyPassword();
    if (inputEl.value) {
        alertContainerEl.classList.remove("active");
        setTimeout(() => {
            alertContainerEl.classList.add("active");
        }, 2000);
    }
});

const createPassword = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxtz!@#$%^&*()_+?:{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 14;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomNo = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNo, randomNo + 1);
    }
    inputEl.value = password;
    alertContainerEl.innerText = password + " copied!";
};

const copyPassword = () => {
    inputEl.select();
    inputEl.setSelectionRange(0, 9999);
    navigator.clipboard.writeText(inputEl.value);
};
