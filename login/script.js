const loginForm = document.getElementById("loginForm");
const loginIdInput = document.getElementById("loginIdInput");
const loginPasswordInput = document.getElementById("loginPasswordInput");
const loginBtn = document.getElementById("loginBtn");
const rememberIdCheckbox = document.getElementById("rememberId");

let loginId = "";
let loginPw = "";

window.addEventListener("load", () => {
  const savedId = localStorage.getItem("savedId");
  if (savedId) {
    loginIdInput.value = savedId;
    loginId = savedId;
    rememberIdCheckbox.checked = true;
  }
});

loginIdInput.addEventListener("input", (e) => {
  loginId = e.target.value;
});

loginPasswordInput.addEventListener("input", (e) => {
  loginPw = e.target.value;
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (loginId === "" || loginPw === "") {
    alert("아이디와 비밀번호를 입력해주세요");
    return;
  }

  const signupInfo = JSON.parse(localStorage.getItem("signupInfo"));

  if (!signupInfo || loginId !== signupInfo.id || loginPw !== signupInfo.pw) {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    return;
  }

  if (rememberIdCheckbox.checked) {
    localStorage.setItem("savedId", loginId);
  } else {
    localStorage.removeItem("savedId");
  }

  localStorage.setItem("isLogin", "true");
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      id: signupInfo.id,
      username: signupInfo.username,
    })
  );

  alert("로그인에 성공하셨습니다");
  window.location.href = "../index.html";
});

loginBtn.addEventListener("click", () => {});