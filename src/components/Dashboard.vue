<script setup lang="ts">
import TodoList from "./TodoList.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("jwt");
  router.push("/login");
};
</script>

<template>
  <v-container max-width="600">
    <v-row>
      <v-col>Todo App</v-col>
      <v-col cols="auto">
        <v-btn
          text="Logout"
          size="small"
          variant="outlined"
          @click="logout"
        ></v-btn>
      </v-col>
    </v-row>
    <TodoList />
  </v-container>
</template>
