const API = "https://chat.joelsiervas.online/messages";

const getMessages = async () => {
  const response = await fetch(API);
  const messages = await response.json();

  const ul = document.getElementById("messages");
  ul.innerHTML = "";

  for (let i = 0; i < messages.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${messages[i].user}:</strong> ${messages[i].text}`;
    ul.appendChild(li);
  }
};

const postMessage = async (message) => {
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

getMessages();

// AUTO REFRESH (10 pts)
setInterval(getMessages, 3000);

// CLICK SEND
document.getElementById("send").addEventListener("click", () => {
  const input = document.getElementById("message");

  postMessage({
    user: "alejandro",
    text: input.value,
  });

  input.value = "";
});

// ENTER PARA ENVIAR (10 pts)
document.getElementById("message").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("send").click();
  }
});

