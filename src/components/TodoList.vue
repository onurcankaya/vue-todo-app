<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchTodos, deleteTodo } from "../services/api";
import { Todo } from "../types/Todo";

const todos = ref<Todo[]>([]);

const getTodos = async () => {
  try {
    const allTodos = await fetchTodos();
    if (allTodos) {
      todos.value = allTodos;
    }
  } catch (error) {
    console.error("Error fetching todos", (error as Error).message);
  }
};

const handleDeleteTodo = async (id: Todo["id"]) => {
  await deleteTodo(id);
  await getTodos();
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
      <v-btn variant="outlined" @click="handleDeleteTodo(todo.id)"
        >delete</v-btn
      >
    </div>
  </v-card>
</template>
