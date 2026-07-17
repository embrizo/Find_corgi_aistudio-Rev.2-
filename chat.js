export function initChat() {
  const btnChatbot = document.getElementById("btn-chatbot");
  const modalChat = document.getElementById("chat-modal");
  const btnCloseChat = document.getElementById("btn-close-chat");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const btnSendChat = document.getElementById("btn-send-chat");

  let messages = [];

  function openChat() {
    modalChat.classList.remove("hidden");
    chatInput.focus();
  }

  function closeChat() {
    modalChat.classList.add("hidden");
  }

  btnChatbot?.addEventListener("click", openChat);
  document.getElementById("btn-home-chat")?.addEventListener("click", openChat);
  btnCloseChat?.addEventListener("click", closeChat);

  function appendMessage(role, content) {
    const div = document.createElement("div");
    div.className = `chat-message ${role}`;
    div.innerHTML = `<p>${content}</p>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = "";
    chatInput.disabled = true;
    btnSendChat.disabled = true;

    // Add user message to UI
    appendMessage("user", text);
    messages.push({ role: "user", content: text });

    // Show loading
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "chat-message assistant loading";
    loadingDiv.innerHTML = "<p>Thinking...</p>";
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      const data = await response.json();
      
      // Remove loading
      chatMessages.removeChild(loadingDiv);

      if (response.ok && data.reply) {
        appendMessage("assistant", data.reply);
        messages.push({ role: "model", content: data.reply });
      } else {
        appendMessage("assistant", "Sorry, I had trouble processing that.");
      }
    } catch (err) {
      chatMessages.removeChild(loadingDiv);
      appendMessage("assistant", "Network error. Please try again later.");
    } finally {
      chatInput.disabled = false;
      btnSendChat.disabled = false;
      chatInput.focus();
    }
  }

  btnSendChat?.addEventListener("click", sendMessage);
  chatInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}
