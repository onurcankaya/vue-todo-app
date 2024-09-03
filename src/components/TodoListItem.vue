<script setup lang="ts">
import { ref } from "vue";
import { deleteTodo, updateTodo } from "../services/todoApi";
import { Todo } from "../types/Todo";

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits(["getTodos"]);
const getTodos = () => emit("getTodos");

const isEditMode = ref(false);
const editInputValue = ref(props.todo.title);

const handleDeleteTodo = async (id: Todo["id"]) => {
  await deleteTodo(id);
  await getTodos();
};

const toggleTodo = async (todo: Todo) => {
  const newTodo = { ...todo, is_completed: !todo.is_completed };
  await updateTodo(newTodo);
  await getTodos();
};

const toggleEditMode = () => {
  isEditMode.value = true;
};

const handleSaveTodo = async () => {
  const newTodo = { ...props.todo, title: editInputValue.value };
  await updateTodo(newTodo);
  await getTodos();
  isEditMode.value = false;
};
</script>

<template>
  <div class="d-flex align-center">
    <v-checkbox-btn
      color="success"
      v-model="todo.is_completed"
      @click="toggleTodo(todo)"
    ></v-checkbox-btn>
    <input
      v-if="isEditMode"
      type="input"
      v-model="editInputValue"
      class="editInput"
    />
    <span
      v-if="!isEditMode"
      :style="todo.is_completed ? { textDecoration: 'line-through' } : {}"
      >{{ todo.title }}</span
    >
  </div>
  <div class="d-flex flex-row">
    <v-btn
      v-if="isEditMode"
      variant="outlined"
      @click="handleSaveTodo"
      class="mx-1"
      >save</v-btn
    >
    <v-btn
      v-if="!isEditMode"
      variant="outlined"
      @click="toggleEditMode"
      class="mx-1"
      >edit</v-btn
    >
    <v-btn variant="outlined" @click="handleDeleteTodo(todo.id)" class="mx-1"
      >delete</v-btn
    >
  </div>
</template>

<style scoped>
.editInput {
  border: 1px solid magenta;
}
</style>
