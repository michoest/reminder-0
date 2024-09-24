<template>
  <div>
    <h4>Push Notification Demo</h4>
    <button @click="subscribeToPushNotifications">Subscribe to Push Notifications</button>
  </div>
</template>

<script setup>
defineOptions({ name: 'NotificationPage' });

import { ref } from 'vue';
import axios from 'axios';

const subscribeToPushNotifications = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BA2QsS6SgbbmYqHy_B7cZBmGvMZXoybhQyWPNhCB5ayABE3UXGdx8IFVyYrQKlyrcU3g57nZujUN_nCe9WYGg6o'
      });

      await axios.post('https://reminder-0.server.michoest.com/subscribe', subscription);
      console.log('Push notification subscription successful');
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
    }
  } else {
    console.log('Push notifications are not supported');
  }
};
</script>
