let socket;
const joinScreen = document.getElementById('join-screen');
const chatScreen = document.getElementById('chat-screen');
const messagesLog = document.getElementById('messages-log');
const usernameInput = document.getElementById('username-input');
const messageInput = document.getElementById('message-input');

document.getElementById('join-btn').addEventListener('click', joinChat);
document.getElementById('send-btn').addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

function joinChat() {
    const username = usernameInput.value.trim();
    if (!username) return alert('Please enter a username');

    // io() automatically targets the hosting server address base route location
    socket = io();

    // Socket.IO Native listeners match cleanly via event labels
    socket.on('connect', () => {
        joinScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
        socket.emit('join', username);
    });

    socket.on('system', (message) => {
        appendMessage({ type: 'system', message });
    });

    socket.on('message', (data) => {
        appendMessage({ type: 'user', username: data.username, message: data.message });
    });

    socket.on('disconnect', () => {
        alert('Lost connection to server.');
        window.location.reload();
    });
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    socket.emit('chat', text);
    messageInput.value = '';
}

function appendMessage(data) {
    const el = document.createElement('div');
    el.classList.add('msg');

    if (data.type === 'system') {
        el.classList.add('system');
        el.textContent = data.message;
    } else {
        el.classList.add('user');
        el.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    }

    messagesLog.appendChild(el);
    messagesLog.scrollTop = messagesLog.scrollHeight;
}
