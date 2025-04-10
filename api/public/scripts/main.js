/**
 * @file main.js
 * @description Main Script for UI stuff
 * @author Bloom Perez <bloomdevelop@pm.me>
 * @license GPL-3.0
 */

/**
 * @typedef {Object} Message
 * @property {string} username - The username of the message sender.
 * @property {string} content - The content of the message.
 * @property {string} experience_id - Place/Experience's ID
 */

/**
 * @description Gets message from the server
 * @returns {Promise<Array<Message>>}
 */
async function getMessages() {
  const serverUrl = window.location.origin;
  const res = await fetch(`${serverUrl}/messages`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });

  return res.message;
}

/**
 * Renders a single message in the chat log
 * @param {Message} message - The message to render
 * @param {HTMLElement} container - The container element to append the message to
 */
function renderMessage(message, container) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  const messageHeader = document.createElement("div");
  messageHeader.classList.add("message-header");

  const messageContainerHeaderExperienceId = document.createElement("span");
  const messageContainerHeaderExperienceIdNode = document.createTextNode(
    message.experience_id || "Missing Experience ID",
  );
  messageContainerHeaderExperienceId.classList.add("pill");
  messageContainerHeaderExperienceId.appendChild(
    messageContainerHeaderExperienceIdNode,
  );

  const messageContainerHeader = document.createElement("h1");
  const messageContainerHeaderNode = document.createTextNode(message.username);
  messageContainerHeader.appendChild(messageContainerHeaderNode);

  const messageContainerContent = document.createElement("p");
  const messageContainerContentNode = document.createTextNode(message.content);
  messageContainerContent.appendChild(messageContainerContentNode);

  messageHeader.appendChild(messageContainerHeader);
  messageHeader.appendChild(messageContainerHeaderExperienceId);
  messageContainer.appendChild(messageHeader);
  messageContainer.appendChild(messageContainerContent);
  container.appendChild(messageContainer);
}

window.addEventListener("DOMContentLoaded", async () => {
  const chatLog = document.getElementById("chat-logs");

  const messages = await getMessages();
  for (const message of messages) {
    renderMessage(message, chatLog);
  }
});
