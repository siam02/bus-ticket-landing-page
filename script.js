
// Click on "Buy Ticket" button to go to ticket section
const goToTicket = document.getElementById('go-to-ticket');
goToTicket.addEventListener('click', function (event) {
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

    if (number === "") {
        addAttrById('form-submit', 'disabled');
        return false;
    }

    if (!regex.test(number) && number !== "") {
        invalid.innerText = "Please enter valid Phone Number";
        invalid.classList.remove("hidden")
        
        phoneNumber.classList.add('invalid-input');

        
        addAttrById('form-submit', 'disabled');

        return false;
    } else {
        phoneNumber.classList.remove('invalid-input');
        invalid.innerText = "";
        invalid.classList.add("hidden")

        if (selectedSeats.length > 0 && number !== "") {
            removeAttrById('form-submit', 'disabled');
        }else{
            addAttrById('form-submit', 'disabled');
        }

        return true;

    }

}


// Ticket Functionalities
let selectedSeats = [];
let couponApplied;
document.getElementById('seats-container').addEventListener('click', function (event) {
    const seatId = event.target.id;
    if (seatId != 'seats-container' && seatId != '') {
        if (selectedSeats.length === 4 && !selectedSeats.includes(seatId)) {
            alert("You can't select more than 4 seats");
        }
        if (selectedSeats.length < 4 && !selectedSeats.includes(seatId)) {
            selectSeat(seatId);
        }else if(selectedSeats.length <= 4 && selectedSeats.includes(seatId) && !couponApplied) {
            removeSeat(seatId);
        }

        // Increase the number of Selected Seats
        let selectedSeatNumber = selectedSeats.length;
        setTextById('seats-selected', selectedSeatNumber)

        if (selectedSeatNumber === 4) {
            removeClassNameById('coupon-container', '!bg-[#f2f2f2]');
            removeAttrById('coupon', 'disabled');
            removeAttrById('apply-coupon', 'disabled');
        }else{
            addClassNameById('coupon-container', '!bg-[#f2f2f2]');
            addAttrById('coupon', 'disabled');
            addAttrById('apply-coupon', 'disabled');
        }

        // update total price
        totalPrice();
        const isPhone = validatePhoneNumber();
        console.log(isPhone);
        if (selectedSeats.length > 0 && isPhone === true) {
            removeAttrById('form-submit', 'disabled');
        }else{
            addAttrById('form-submit', 'disabled');
        }

    }
});


function selectSeat(id) {
    // Add color to the selected seat
    const seat = document.getElementById(id);
    seat.classList.add('btn-success', 'selected');
    selectedSeats.push(id);

    // Decrease the number of available seat
    let availableSeat = getTextById('available-seat');
    availableSeat = parseInt(availableSeat);
    availableSeat--;
    setTextById('available-seat', availableSeat);

    // Add Selected Seats to the list
    addSeatToList(id);
}

function addSeatToList(id){
    const seatListContainer = document.getElementById('selected-seats-container');
    const seatContainer = document.createElement('div');
    seatContainer.className = "flex justify-between";
    // Add Seat Number
    const seatNumber = document.createElement('p');
    seatNumber.innerText = id;
    seatContainer.appendChild(seatNumber);
    // Add Seat Number
    const seatClass = document.createElement('p');
    seatClass.innerText = 'Economoy';
    seatContainer.appendChild(seatClass);
    // Add Seat Price
    const seatPrice = document.createElement('p');
    seatPrice.innerText = '550';
    seatContainer.appendChild(seatPrice);
    seatListContainer.appendChild(seatContainer);
}

function removeSeat(id) {
    // Remove color to the removed seat
    const seat = document.getElementById(id);
    seat.classList.remove('btn-success', 'selected');
    let seatIndex = selectedSeats.indexOf(id);
    if (seatIndex !== -1) {
        selectedSeats.splice(seatIndex, 1);
    }

    // Increase the number of available seat
    let availableSeat = getTextById('available-seat');
    availableSeat = parseInt(availableSeat);
    availableSeat++;
    setTextById('available-seat', availableSeat);


    // Remove the seat form the list
    removeSeatFromList(id);

}

function removeSeatFromList(id){
    const seatListContainer = document.getElementById('selected-seats-container');
    let childDivs = seatListContainer.getElementsByClassName('flex justify-between');
    for (let i = 0; i < childDivs.length; i++) {
        let currentDiv = childDivs[i];
        let p = currentDiv.querySelector('p');

        if (p && p.innerText.trim() === id) {
            seatListContainer.removeChild(currentDiv);
            break;
        }
    }
}



// Total price
function totalPrice() {
    const seatSelectedNumber = selectedSeats.length;
    const price = 550 * seatSelectedNumber;
    setTextById('total-price', price)
    setTextById('grand-total-price', price)
    return price;
}

// discount Price
document.getElementById('apply-coupon').addEventListener('click', function discountPrice(event) {
    const coupon = getValueById('coupon');

    if (coupon !== "" ) {
        if(coupon === "NEW15" || coupon === "Couple 20"){
            removeClassNameById('discount', 'hidden');
            document.getElementById('coupon-container').remove();
            if (coupon === "NEW15") {
                var discount = 15;
            }else if(coupon === "Couple 20"){
                var discount = 20;
            }
            const price = totalPrice();
            const discountPrice = price * (discount/100);
            setTextById('discount-price', discountPrice);
            couponApplied = true;
            
            grandPrice(price, discountPrice);
        }else{
            alert('Please input valid coupon');
        }
    }else{
        alert('Please input coupon');
    }
});

function grandPrice(totalPrice, discountPrice){
    const price = totalPrice - discountPrice;
    setTextById('grand-total-price', price)
    return price;
}



function getTextById(id) {
    let text = document.getElementById(id);
    text = text.innerText;

    return text
}

function setTextById(id, value) {
    let text = document.getElementById(id);
    text.innerText = value;
}

function getValueById(id) {
    let text = document.getElementById(id);
    text = text.value;

    return text
}

function removeClassNameById(id, className) {
    const el = document.getElementById(id);
    el.classList.remove(className);
}

function addClassNameById(id, className) {
    const el = document.getElementById(id);
    el.classList.add(className);
}

function removeAttrById(id, attr) {
    const el = document.getElementById(id);
    el.removeAttribute(attr);
}

function addAttrById(id, attr) {
    const el = document.getElementById(id);
    el.setAttribute(attr, true);
}