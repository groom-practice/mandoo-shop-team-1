/**
 * - 구매하기로 넘어온 상품들 구매하기
 * - 이름,휴대폰번호,가짜주소 입력 받기
 * - 장바구니 → 구매하기라면 장바구니에서 구매한 상품은 삭제하기
 * - 상품 페이지 → 구매하기라면 바뀌는거없음
 * - 구매한 이력을 로컬에 저장하기
 */

const orderItem = [
  {
    id: 0,
    productName: "포토카드",
    productPrice: 10000,
    productImgFileName: "photoCard-01.png",
  },
];

const order = () => {
  if (!orderItem || orderItem.length === 0) return;

  const orderContainer = document.querySelector(".order-product-container");

  console.log(orderItem);

  orderItem.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `<img src="/imgs/${item.productImgFileName}" alt="${item.productName}" /><span>${item.productName}</span><p>${item.productPrice}원</p>`;

    orderContainer.appendChild(div);
  });
};
order();

let orderInfo = {
  name: "",
  phone: "",
  address: "",
};
