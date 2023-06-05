const chatboxElement = document.getElementById("chatbox");
const userInputElement = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

function appendMessage(message, className) {
    const messageElement = document.createElement("p");
    messageElement.className = className;
    messageElement.innerText = message;
    chatboxElement.appendChild(messageElement);

    // Automatically scroll to the bottom of the chatbox
    chatboxElement.scrollTop = chatboxElement.scrollHeight;
}

async function sendMessage() {
    const userInput = userInputElement.value;
    userInputElement.value = "";
    appendMessage("User: " + userInput, "user-message");

    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4.0-turbo",
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: userInput }]
        }, {
            headers: {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            }
        });

        const chatbotMessage = response.data.choices[0].message.content;
        appendMessage("ChatGPT: " + chatbotMessage, "chatbot-message");
    } catch (error) {
        console.error("Error:", error);
    }
}

sendButton.addEventListener("click", sendMessage);
userInputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
