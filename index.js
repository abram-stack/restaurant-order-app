import { menuArray } from './data.js'

const orderArray = []

document.addEventListener('click', function (e) {
  if (e.target.dataset.add)
    handleAddItem(e.target.dataset.add);
  
})

function handleAddItem(itemId) {
  const itemObj = menuArray.filter(function (item) {
    return item.id === itemId
  })[0];
  orderArray.unshift(itemObj);

  renderItems()
  console.log(orderArray)

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
    const orderContainer = document.getElementById('place-order')
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