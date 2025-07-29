<template>
  <div class="header-container">
    <div class="header-menu">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.path"
        class="menu-button"
        active-class="active"
      >
        <component :is="item.icon" class="menu-icon" />
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
// import { Money, ListOrdered, TrendingUp, Warehouse } from 'lucide-vue-next';

const menuItems = [
  { name: 'Incomes', path: '/'},
  { name: 'Orders', path: '/orders' },
  { name: 'Sales', path: '/sales'},
  { name: 'Stocks', path: '/stocks' }
];
</script>

<style scoped>
.header-container {
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-menu {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

.menu-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  color: #4CAF50; /* Зеленый цвет */
  border-radius: 8px;
  transition: all 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu-button:hover {
  background: #f1f5f9;
  color: #2E7D32; /* Темно-зеленый при наведении */
}

.menu-button.active {
  background: #4CAF50;
  color: white;
}

.menu-icon {
  width: 18px;
  height: 18px;
}
</style>