<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { User } from "../types/User.ts";
import { loginUser } from "../services/userApi.ts";

const initialUser = {
  email: "",
  password: "",
};

const user = ref<User>(initialUser);

const router = useRouter();

const handleSubmit = async () => {
  const { token } = await loginUser(user.value);
  localStorage.setItem("jwt", token);
  router.push("/dashboard");
};
</script>

<template>
  <v-container class="mx-auto" max-width="600">
    <div class="text-center">Login</div>
    <v-form @submit="handleSubmit" @submit.prevent class="mt-8">
      <v-text-field
        v-model="user.email"
        placeholder="Email"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        placeholder="Password"
        type="password"
      ></v-text-field>
      <v-btn
        class="mt-2"
        text="Register User"
        type="submit"
        color="success"
        block
      ></v-btn>
    </v-form>
  </v-container>
</template>
