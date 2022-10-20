<script setup lang="ts">
import {ref} from 'vue';
import {io} from 'socket.io-client';

const messages = ref<string[]>([]);
const socket = io('http://localhost:3000');
socket.on('chat message', (message: string) => (messages.value.push(message)));

const newMessage = ref('');
const sendMessage = () => {
  socket.emit('chat message', newMessage.value);
  newMessage.value = '';
};
</script>

<template>
  <main>
    <input v-model="newMessage" @keydown.enter="sendMessage"/>
    <div v-for="(message,i) in messages" :key="i">{{ message }}</div>
  </main>
</template>
