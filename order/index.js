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

  orderItem.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `<img src="/imgs/${item.productImgFileName}" alt="${item.productName}" /><span>${item.productName}</span><p>${item.productPrice}원</p>`;

    orderContainer.appendChild(div);
  });
};
order();

const submitOrder = document.getElementById("submitOrder");

submitOrder.addEventListener("click", (e) => {
  e.preventDefault();

  const orderName = document.getElementById("orderName");
  const orderPhoneNum = document.getElementById("orderPhoneNum");
  const orderAddress = document.getElementById("orderAddress");

  let orderInfo = {
    name: orderName.value,
    phone: orderPhoneNum.value,
    address: orderAddress.value,
  };
  localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

  if (
    orderInfo.name === "" ||
    orderInfo.phone === "" ||
    orderInfo.address === ""
  ) {
    alert("주문자 정보를 입력하지 않았습니다.");
    return;
  }

  const isConfirm = confirm(`
    name: ${orderInfo.name}\n
    phone: ${orderInfo.phone}\n
    address: ${orderInfo.address}\n
    위 정보로 주문하시곘습니까?`);

  localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
});
