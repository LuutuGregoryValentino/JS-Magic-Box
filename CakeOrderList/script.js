
// getting hte references
const cakeFlavourInput = document.getElementById('cakeFlavor');
const deliveryDateInput =document.getElementById('deliveryDate');
const addOrderBtn =document.getElementById('addOrderBtn');
const ordersListDiv =document.getElementById('ordersList');
const clearOrdersBtn =document.getElementById('clearOrdersBtn');

const LOCAL_STORAGE_KEY = 'cakeOrdersList';//key for loal storage

function loadOrders(){
    const ordersJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    return ordersJSON ? JSON.parse(ordersJSON) : [];//if not empty, parse inot readable words, otherwise, return empty array
}

function saveOrders(ordersArray){
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(ordersArray));

}

function renderOrderItem(order){
    const orderItemDiv = document.createElement("div");
    orderItemDiv.classList.add("order-item");
    orderItemDiv.setAttribute('data-id',order.id); //order id stored onto the element

    const flavorP = document.createElement('p');
    flavorP.classList.add('flavor');
    flavorP.textContent = order.flavor;

    const deliveryDateP = document.createElement('p');
    deliveryDateP.classList.add('date');
    const deliveryDate = new Date(order.deliveryDate);
    deliveryDateP.textContent = `Deliver by: ${deliveryDate.toLocaleDateString()}`;

    //to calculate day to delivery
    const today = new Date();
    const orderDateOnly = new Date(deliveryDate);

    today.setHours(0,0,0,0);
    orderDateOnly.getHours(0,0,0,0);

    const diffMs  = orderDateOnly - today;
    const daysUntil = Math.floor(diffMs /(1000*60*60*24));

    const reminderSpan = document.createElement('span');
    reminderSpan.style.fontWeight = 'bold';
    deliveryDateP.appendChild(reminderSpan);

    if (daysUntil>2  ){
        reminderSpan.textContent = ` ${daysUntil} days left! 🔔`;
        reminderSpan.style.color = 'green';
    }
    else if(daysUntil>0 ){
        reminderSpan.style.color = 'orange';
        reminderSpan.textContent = ` 🚨${daysUntil} days left! 🔔`
    }
    else if(daysUntil === 0){
        reminderSpan.textContent = ` (DELIVERY TODAY!)🚨`;
        reminderSpan.style.color = 'red';

    }
    else if(daysUntil<0){
        reminderSpan.style.color = 'grey';
        reminderSpan.textContent = `OVERDUE by ${daysUntil}`;
    }

    orderItemDiv.appendChild(flavorP);
    orderItemDiv.appendChild(deliveryDateP);

    ordersListDiv.appendChild(orderItemDiv);
}

function displayOrders(){
    ordersListDiv.innerHTML = '';//prevents duplicates
    const orders = loadOrders();
    orders.forEach(order => renderOrderItem(order));

}

//event listeners 
addOrderBtn.addEventListener('click',()=>{
    const flavor = cakeFlavourInput.value.trim();
    const deliveryDate = deliveryDateInput.value; //this will be a yyyy-mm-dd string

    if(!flavor || !deliveryDate){
        alert('Please enter both the delivery date and cake flavor');
        return;
    }

    const newOrder = {
        id: Date.now(),//unique timepstamp as id
        flavor : flavor,
        deliveryDate: deliveryDate //stored as a string

    };

    let currentOrders = loadOrders();//existing orders
    currentOrders.push(newOrder); //new one added
    saveOrders(currentOrders); //savesupdated list

    renderOrderItem(newOrder);

    //clear form inputs
    cakeFlavourInput.value = '';
    deliveryDateInput.value = '';
});

clearOrdersBtn.addEventListener('click',()=>{
    if (confirm('Are you sure you wna to remive all acke orders? this cannot be undone!')){
        localStorage.removeItem(LOCAL_STORAGE_KEY); //clears from storage
        ordersListDiv.innerHTML = '';
        alert('all Orders Cleared!')
    }
});

document.addEventListener('DOMContentLoaded',displayOrders)

