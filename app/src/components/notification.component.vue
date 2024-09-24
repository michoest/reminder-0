<template>
  <div>
    <q-btn color="primary" @click="requestNotificationPermission" label="Enable Notifications" />
  </div>
</template>

<script setup>
defineOptions({ name: 'NotificationComponent' });

import { useQuasar } from 'quasar'

const $q = useQuasar()

const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission()
    console.log(permission);
    if (permission === 'granted') {
      $q.notify({
        color: 'positive',
        message: 'Showing notification after 10s...'
      })
      sendNotificationAfterDelay()
    } else {
      $q.notify({
        color: 'negative',
        message: 'Notification permission denied'
      })
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error)
  }
}

const sendNotificationAfterDelay = () => {
  setTimeout(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Welcome!', {
          body: 'Thanks for using our PWA!',
          icon: '/icons/favicon-128x128.png'
        })
      })
    } else {
      new Notification('Welcome!', {
        body: 'Thanks for using our PWA!',
        icon: '/icons/favicon-128x128.png'
      })
    }
  }, 10000) // 10 seconds delay
}
</script>
