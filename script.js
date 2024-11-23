"use strict";
//==========================================
const TELEGRAM_BOT_TOKEN = " "; //telegram bot token

const TELEGRAM_CHAT_ID = " "; //telegram chat id
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

async function sendEmailTelegram(event) {
  event.preventDefault();

  const form = event.target;
  const formBtn = document.querySelector(".form__submit-button button");
  const formSendResult = document.querySelector(".form__send-result");
  formSendResult.textContent = "";

  const { name, email, phone, pass } = Object.fromEntries(
    new FormData(form).entries()
  );

  const text = `Заявка от ${name}}`;

  try {
    formBtn.textContent = "Loading...";

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });

    if (response.ok) {
      formSendResult.textContent =
        "Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.";
      form.reset();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    formSendResult.textContent = "Анкета не отправлена! Попробуйте позже.";
    formSendResult.style.color = "red";
  } finally {
    formBtn.textContent = "Отправить";
  }
}

// const loginText = document.querySelector(".title-text .login");
//   const loginForm = document.querySelector("form.login");
//   const loginBtn = document.querySelector("label.login");
//   const signupBtn = document.querySelector("label.signup");
//   const signupLink = document.querySelector("form .signup-link a");

//   signupBtn.onclick = () => {
//     loginForm.style.marginLeft = "-50%";
//     loginText.style.marginLeft = "-50%";
//   };

//   loginBtn.onclick = () => {
//     loginForm.style.marginLeft = "0%";
//     loginText.style.marginLeft = "0%";
//   };

//   signupLink.onclick = () => {
//     signupBtn.click();
//     return false;
//   };
