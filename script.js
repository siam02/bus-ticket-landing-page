
// Click on "Buy Ticket" button to go to ticket section
const goToTicket = document.getElementById('go-to-ticket');
goToTicket.addEventListener('click', function(event){
    const ticket = document.getElementById("ticket");
    event.preventDefault();
    const y = ticket.offsetTop;
    window.scrollTo({
        top: y,
        behavior: "smooth"
    });
});


//Phone Number Validate
const phoneNumber = document.getElementById('phone-number');

phoneNumber.addEventListener('keyup', validatePhoneNumber);

function validatePhoneNumber() {
    const regex = /^\d+$/;
    const number = phoneNumber.value;
    const invalid = document.getElementById("invalid-phone-number");

    if (!regex.test(number) && number != "") {
        invalid.innerText = "Please enter valid Phone Number";
        invalid.classList.remove("hidden")

        phoneNumber.classList.add('invalid-input');

        return false;
    }else{
        phoneNumber.classList.remove('invalid-input');
        invalid.innerText = "";
        invalid.classList.add("hidden")

        return true;
    }
    
}