const API = "/api/messages";

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

  const isAtBottom = ul.scrollHeight - ul.scrollTop <= ul.clientHeight + 50;

  if (isAtBottom) {
    ul.scrollTop = ul.scrollHeight;
  }
};

const postMessage = async (message) => {
  return await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

// auto refresh
setInterval(getMessages, 1500);

getMessages();

// botón
document.getElementById("send").addEventListener("click", async () => {
  const input = document.getElementById("message");

  await postMessage({
    user: "alejandro",
    text: input.value,
  });

  input.value = "";
});

// enter
document.getElementById("message").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("send").click();
  }
});
