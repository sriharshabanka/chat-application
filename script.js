const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

// DOM elements
const joinButton = document.getElementById('join-btn');
const chatBox = document.getElementById('chat-box');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');

// Join room on button click
joinButton.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    const room = roomInput.value.trim();
    if (username && room) {
        socket.emit('joinRoom', room);
        chatBox.style.display = 'block';
        messagesDiv.innerHTML += `<p><em>${username} has joined the room ${room}</em></p>`;
    } else {
        alert('Please enter your name and room name.');
    }
});

// Send message
document.getElementById('send-btn').addEventListener('click', () => {
    const message = messageInput.value.trim();
    const room = roomInput.value.trim();
    const username = usernameInput.value.trim();
    if (message && room && username) {
        socket.emit('chatMessage', { user: username, room, message });
        messageInput.value = ''; // Clear input
    } else {
        alert('Please enter a message before sending.');
    }
});

// Listen for incoming messages
socket.on('chatMessage', (data) => {
    messagesDiv.innerHTML += `<p><strong>${data.user}:</strong> ${data.message}</p>`;
});
