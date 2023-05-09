<template>
    <div class="logo">
        <RouterLink to="/">
            <span> <v-img src="/logo.png" height="50"></v-img> </span>
        </RouterLink>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const primary = ref('rgb(var(--v-theme-primary))');
const secondary = ref('rgb(var(--v-theme-secondary))');
</script>
