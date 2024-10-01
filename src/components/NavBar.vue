<template>
  <div class="hidden border-separate border-b bg-background md:block shadow-sm">
    <nav class="navbar container flex items-center justify-between px-8 mx-auto">
      <div class="flex h-[80px] min-h-[60px] items-center gap-x-4">
        <AppLogo />
        <ul class="navbar-list flex h-full gap-x-4">
          <li
            v-for="route in routes"
            :key="route.name"
            class="navbar-item flex relative items-center"
          >
            <RouterLink :to="route.path" :class="{ active: isActive(route.path) }">{{
              route.name
            }}</RouterLink>
            <div
              v-show="isActive(route.path)"
              class="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[100%] -translate-x-1/2 rounded-xl bg-violet-500 md:block"
            ></div>
          </li>
        </ul>
      </div>
      <div class="flex items-center gap-2">ModeToggle UserButton</div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AppLogo from './AppLogo.vue'

const router = useRouter()
const routes = ref(router.options.routes)

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}
</script>
