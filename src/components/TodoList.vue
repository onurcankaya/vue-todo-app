<script setup lang="ts">
import { ref, onMounted } from "vue";
import { addTodo, fetchTodos, deleteTodo } from "../services/api";
import { Todo } from "../types/Todo";

const todos = ref<Todo[]>([]);
const inputValue = ref("");

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

onMounted(() => {
  getTodos();
});

const handleDeleteTodo = async (id: Todo["id"]) => {
  await deleteTodo(id);
  await getTodos();
};

const handleSubmit = async () => {
  if (inputValue.value.length === 0) return;
  const newTodo = { title: inputValue.value };
  await addTodo(newTodo);
  inputValue.value = "";
  await getTodos();
};
</script>

<template>
  <v-form @submit="handleSubmit" @submit.prevent class="mt-8">
    <v-row class="w-100">
      <v-col>
        <v-text-field
          v-model="inputValue"
          placeholder="Type here"
          type="input"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn
          class="mt-2"
          text="Add todo"
          type="submit"
          color="success"
        ></v-btn>
      </v-col>
    </v-row>
  </v-form>
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
