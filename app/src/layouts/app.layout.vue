<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="flex flex-center">
      <PushNotification />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({ name: 'AppLayout '});

import PushNotification from '/src/components/notification.component.vue';
</script>
