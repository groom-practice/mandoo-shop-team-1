/*
 * 장바구니와 최근 구매한 목록은 로컬스토리지에 저장되어 있다고 가정
 * 로컬스토리지에서 'cart'와 'purchasedItems' 키를 통해 접근 가능
 * 로컬스토리지에서 'orderPurchasedItems' 키를 통해 구매하기를 누른 상품 접근 가능
 */

document.addEventListener('DOMContentLoaded', async () => {
  const productContainer = document.createElement('div');
  productContainer.classList.add('product-container');
  document.body.appendChild(productContainer);

  let products = [];
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
  let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];
  let page = 0;
  const limit = 5;
  let loading = false;

  if (!localStorage.getItem('purchasedItems')) {
    // mock 데이터로 상품 ID 1, 3, 5번이 구매되었다고 가정
    const mockPurchasedItems = [1, 3, 5];
    localStorage.setItem('purchasedItems', JSON.stringify(mockPurchasedItems));
    purchasedItems = mockPurchasedItems;
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('../db.json');
      products = await response.json();
      loadProducts();
    } catch (error) {
      console.error('상품 데이터', error);
    }
  };

  const loadProducts = () => {
    if (loading) return;
    loading = true;

    const start = page * limit;
    const end = start + limit;
    const items = products.slice(start, end);

    if (items.length === 0) {
      window.removeEventListener('scroll', handleScroll);
      return;
    }

    items.forEach(createProductElement);
    page++;
    loading = false;
  };

  const createProductElement = (product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const img = document.createElement('img');
    img.src = `../imgs/${product.productImgFileName}`;
    img.alt = product.productName;

    const name = document.createElement('h2');
    name.textContent = product.productName;

    const price = document.createElement('p');
    price.textContent = `${product.productPrice.toLocaleString()}원`;

    const buyButton = document.createElement('button');
    buyButton.textContent = '구매하기';
    buyButton.addEventListener('click', () => purchaseProduct(product));

    const cartButton = document.createElement('button');
    cartButton.textContent = '장바구니 추가';

    const savedCart = JSON.parse(localStorage.getItem('cart')) || {};

    cartButton.disabled = Object.keys(savedCart).length > 0;

    cartButton.addEventListener('click', () => addCart(product, cartButton));

    if (purchasedItems.includes(product.id)) {
      const badge = document.createElement('span');
      badge.classList.add('tag');
      badge.textContent = '최근 구매';
      productCard.appendChild(badge);
    }

    productCard.append(img, name, price, cartButton, buyButton);
    productContainer.appendChild(productCard);
  };

  const purchaseProduct = (product) => {
    localStorage.setItem('orderPurchasedItems', JSON.stringify(product));
    window.location.href = '../order/index.html';
  };

  const addCart = (product, button) => {
    cart = { [product.id]: product };
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.productName}이(가) 장바구니에 추가되었습니다.`);

    document.querySelectorAll('.product-card button').forEach((btn) => {
      if (btn.textContent === '장바구니 추가') btn.disabled = true;
    });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
    ) {
      loadProducts();
    }
  };

  window.addEventListener('scroll', handleScroll);
  await fetchProducts();
});
