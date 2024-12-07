<template>
  <div class="hidden border-separate border-b bg-background md:block shadow-sm">
    <nav class="navbar container flex items-center justify-between px-8 mx-auto">
      <div class="flex h-[80px] min-h-[60px] items-center gap-x-4">
        <RouterLink to="/" class="flex items-center gap-2 cursor-pointer">
          <AppLogo />
        </RouterLink>
        <ul class="navbar-list flex h-full gap-x-4">
          <li
            v-for="route in routes"
            :key="route.name"
            class="navbar-item flex relative items-center"
          >
            <RouterLink
              :to="route.path"
              :class="
                cn(
                  { active: isActive(route.path) },
                  'w-full justify-start text-lg font-semibold text-muted-foreground hover:text-foreground',
                  isActive(route.path) && 'text-foreground'
                )
              "
              >{{ route.name }}</RouterLink
            >
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
  <div class="mobile-navbar border-separate border-b bg-background md:hidden">
    <nav class="container flex items-center justify-between px-8">
      <Sheet :open="open" @update:open="handleOpenChange">
        <SheetTrigger as-child>
          <Button variant="ghost" size="icon" @click="openMenu">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent class="w-[400px] sm:w-[540px]">
          <SheetHeader class="text-left">
            <AppLogo />
            <div class="pt-4"></div>
            <div
              v-for="route in routes"
              :key="route.name"
              class="navbar-item flex relative items-center"
            >
              <RouterLink
                :to="route.path"
                :class="
                  cn(
                    { active: isActive(route.path) },
                    'w-full justify-start text-2xl font-semibold py-4 text-muted-foreground hover:text-foreground',
                    isActive(route.path) && 'text-foreground'
                  )
                "
                @click="closeMenu"
                >{{ route.name }}</RouterLink
              >
              <div
                v-show="isActive(route.path)"
                class="absolute -left-[12px] top-1/2 w-[4px] h-[80%] -translate-y-1/2 rounded-xl bg-violet-500"
              ></div>
            </div>
            <SheetTitle> <VisuallyHidden>Title goes here</VisuallyHidden> </SheetTitle>
            <SheetDescription>
              <VisuallyHidden>Description goes here</VisuallyHidden>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { RouterLink, useRoute, useRouter } from 'vue-router'
import AppLogo from './AppLogo.vue'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-vue-next'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { VisuallyHidden } from 'radix-vue'

const router = useRouter()
const routes = ref(router.options.routes)

const route = useRoute()

const isActive = (path: string) => {
  return route.path === path
}

const open = ref(false)
function openMenu() {
  open.value = true
}
function closeMenu() {
  open.value = false
}

function handleOpenChange(isOpen: boolean) {
  open.value = isOpen
}
</script>
