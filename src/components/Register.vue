<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { User } from "../types/User.ts";
import { registerUser } from "../services/userApi.ts";

const initialUser = {
  email: "",
  username: "",
  password: "",
};

const user = ref<User>(initialUser);
const registerError = ref();

const router = useRouter();

const handleSubmit = async () => {
  try {
    const response = await registerUser(user.value);
    if (response.user) {
      router.push("/login");
    } else {
      registerError.value = response.message;
    }
  } catch (error) {
    registerError.value = "Error registering user";
  }
};

const validateForm = () => {
  return !user.value.username || !user.value.email || !user.value.password;
};

const emailRule = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};
</script>

<template>
  <v-container class="mx-auto" max-width="600">
    <div class="text-center">Register</div>
    <v-form @submit="handleSubmit" @submit.prevent class="mt-8">
      <v-text-field
        v-model="user.email"
        placeholder="Email"
        type="email"
        :rules="[
          (v) => !!v || 'Email is required',
          (v) => emailRule(v) || 'Invalid email format',
        ]"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.username"
        placeholder="Username"
        type="text"
        :rules="[(v) => !!v || 'Username is required']"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        placeholder="Password"
        type="password"
        :rules="[(v) => !!v || 'Password is required']"
        required
      ></v-text-field>
      <v-btn
        class="mt-2"
        text="Register"
        type="submit"
        color="success"
        :disabled="validateForm()"
        block
      ></v-btn>
      <v-btn
        class="mt-2"
        text="Log In"
        variant="outlined"
        @click="() => router.push('/login')"
        color="success"
        block
      ></v-btn>
    </v-form>
    <div>{{ registerError }}</div>
  </v-container>
</template>
