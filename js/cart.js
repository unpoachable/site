let itemList=[];
const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');
});


//Add Cart
function add2cart(event){ 
 // let product=event.path[0].parentElement;
 
 var evv = event.composedPath()
 
 
let title=evv[0].dataset.title;
let price=evv[0].dataset.price;
let imgSrc=evv[0].dataset.src;

 let newProduct={title,price,imgSrc}

 // check if product already exist in cart
 if(itemList.find((el)=>el.title==newProduct.title)){
  note.innerHTML = "Already in cart";
  return;
 }else{
  itemList.push(newProduct);
   note.innerHTML = "";
 }


let newProductElement= createCartProduct(title,price,imgSrc);
let element=document.createElement('div');
element.classList = 'cart-product';
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);
loadContent();
}

//
function loadContent(){
  //Remove product Items  From Cart
  let btnRemove=document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });

  //Product Item Change Event
  let qtyElements=document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
  });

  updateTotal();
}

//

function createCartProduct(title,price,imgSrc){

  return `
  <div class="cart-box">
  <img src="`+'images/'+`${imgSrc}" class="cart-img">
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="price-box">
      <div>unit price: <span class="cart-price">${price}</span></div>
      <div>amount: <span class="cart-amt">${price}</span></div>
   </div>
    <input type="number" value="1" class="cart-quantity">
  </div>
  <button name="trash" class="cart-remove">remove</button>
</div>
  `;
}

function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("cost.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="£"+(price*qty);

  });

  totalValue.innerHTML="£"+total;


  // Add Product Count in Cart Icon

  const cartCount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }


}

//
//Remove Item
function removeItem(){
  // if(confirm('Are Your Sure to Remove')){
    let title=this.parentElement.querySelector('.cart-product-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
  // }
}

//Change Quantity
function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;
  }
  loadContent();
}
