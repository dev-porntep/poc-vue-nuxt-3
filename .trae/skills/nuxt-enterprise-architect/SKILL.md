---
name: "nuxt-enterprise-architect"
description: "Enforces Nuxt 3 Enterprise Architecture (Atomic Design, Pinia Setup Stores, Repository Pattern) defined in tech-req.md. Invoke for any coding task in this project."
---

# Nuxt Enterprise Architect

This skill guides the AI to follow the specific Enterprise Architecture and Tech Stack defined in `tech-req.md`.

## 🛠 Tech Stack
- **Framework:** Nuxt 3
- **State:** Pinia (Setup Stores)
- **UI:** Tailwind CSS + Flowbite
- **Language:** TypeScript
- **Icons:** Nuxt Icon

## 🏗 Architectural Rules (Strict)

### 1. Atomic Design (UI Components)
All components MUST be placed in `components/` using Atomic Design principles:
- **Atoms** (`components/atoms/`): Smallest, stateless, reusable (Buttons, Inputs, Icons).
- **Molecules** (`components/molecules/`): Groups of atoms (Form groups, Cards).
- **Organisms** (`components/organisms/`): Complex sections (Headers, Footers, Tables).

**Constraint:**
- UI Components should be "dumb" (presentational).
- Avoid complex business logic in components.

### 2. State Management (Pinia)
- Location: `stores/`
- **MUST** use **Setup Stores** pattern (`defineStore('id', () => { ... })`).
- Business logic should reside here or in Composables.

### 3. Service Layer (Repository Pattern)
- Location: `services/`
- **Decoupled API Logic**: All API calls (`useFetch`, `$fetch`) MUST be encapsulated in service classes/functions.
- **Flow**: Component -> Store -> Service -> API.
- **NEVER** call API directly in a Component.

## 📝 Code Templates

### Atom Component (Example)
```vue
<script setup lang="ts">
// components/atoms/MyButton.vue
interface Props {
  label: string;
  variant?: 'primary' | 'secondary';
}
withDefaults(defineProps<Props>(), {
  variant: 'primary'
});
</script>

<template>
  <button :class="['px-4 py-2 rounded', variant === 'primary' ? 'bg-blue-600' : 'bg-gray-200']">
    {{ label }}
  </button>
</template>
```

### Pinia Setup Store (Example)
```ts
// stores/user.ts
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  async function login(credentials: LoginDto) {
    // Call Service Layer
    const response = await authService.login(credentials);
    user.value = response.user;
  }

  return { user, login };
});
```

### Service Module (Example)
```ts
// services/auth.ts
class AuthService {
  async login(credentials: LoginDto) {
    return await $fetch('/api/auth/login', {
      method: 'POST',
      body: credentials
    });
  }
}
export const authService = new AuthService();
```
