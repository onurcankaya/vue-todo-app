<script setup>
import { ref, onMounted } from "vue";
import { fetchTodos } from "../services/api";

const todos = ref([]);

const getTodos = async () => {
  try {
    const allTodos = await fetchTodos();
    todos.value = allTodos;
  } catch (error) {
    console.error("Error fetching todos", error.message);
  }
};

onMounted(() => {
  getTodos();
});
</script>

<template>
  <v-card class="mt-8">
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="d-flex align-center justify-space-between pa-4"
    >
      <div class="d-flex align-center">
        <v-checkbox-btn
          color="success"
          v-model="todo.is_completed"
        ></v-checkbox-btn>
        {{ todo.title }}
      </div>
      <v-btn variant="outlined">delete</v-btn>
    </div>
  </v-card>
</template>
