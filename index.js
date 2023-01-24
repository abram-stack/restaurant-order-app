import { menuArray } from './data.js'

const orderArray = []
const orderContainer = document.getElementById('place-order')

document.addEventListener('click', function (e) {
  if (e.target.dataset.add)
    handleAddItem(e.target.dataset.add);
  else if (e.target.id === 'order-btn')
    handleProceedOrder()  
})

function handleProceedOrder() {
  const modalEl = document.getElementById('modal')
  const closeBtn = document.getElementById('close-modal-btn')
  const cardDetailForm = document.getElementById('card-detail-form')
  const userNameEl = document.getElementById('userName')
  const banner = document.getElementById('banner')

  modalEl.style.display = 'block'
  closeBtn.addEventListener('click', function () {
    modalEl.style.display = 'none'
  })

  cardDetailForm.addEventListener('submit', function (e) {
    e.preventDefault()

    
    // close the modal
    // close place order
    // display banner
    // clear input txt

    modalEl.style.display = 'none'
    orderContainer.classList.add('hidden')
    banner.classList.remove('hidden')
    banner.innerHTML = `
      <div class="banner-inner">
        <h2>Thanks, ${userNameEl.value}! Your order is on its way!</h2>
      </div>
    `
    userNameEl.value = ''
  })
}


function handleAddItem(itemId) {
  const itemObj = menuArray.filter(function (item) {
    return item.id === itemId
  })[0];
  orderArray.unshift(itemObj);

  renderItems()

}

function getItemHtml() {
  let stringHtml = ''
  
  menuArray.forEach(menu =>  {
    stringHtml += `
      <div class="item">
        <div class="item-inner">
          <div class="item-pic">${menu.emoji}</div>
          <div class="item-detail">
            <p class="handle">${menu.name}</p>
            <p class="item-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, tempore.</p>
            <p class="prize">$${menu.price}</p>
          </div>
          <div class="item-add" data-add='${menu.id}'><i class="fa-solid fa-plus" data-add=${menu.id}></i></div>
        </div>
      </div>
    `
  })
  
  return stringHtml; 
}

function getOrderHtml() {
  let orderHtml = ''
  let total = 0;
    //take control the order container, set hidden to visible
  if (orderArray.length > 0) {
   orderContainer.classList.remove('hidden') 

    orderArray.forEach(order => { 
      orderHtml += `
         <div class="order">
           <div class="order-items">${order.name}</div>
           <div class="order-items">$${order.price}</div>
         </div>
      `
      total += order.price;
    })

    orderHtml += `
        <div class="order-price">
          <div>Total Price:</div>
          <div>${total}</div>
        </div>
        <button id="order-btn">Complete order</button>
      `
    return orderHtml; 
  }
  else
    return orderHtml += ''
}


function renderItems() { 
  document.getElementById('menu').innerHTML = getItemHtml()
  document.getElementById('order-container').innerHTML = getOrderHtml()
}

renderItems()

console.log('call', getOrderHtml());