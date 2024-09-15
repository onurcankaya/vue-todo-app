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
const loginError = ref();

const router = useRouter();

const handleSubmit = async () => {
  try {
    const response = await loginUser(user.value);
    localStorage.setItem("jwt", response.token);
    if (response.token) {
      router.push("/dashboard");
    } else {
      loginError.value = response.message;
    }
  } catch (error) {
    loginError.value = "Error logging in";
  }
};

const validateForm = () => {
  return !user.value.email || !user.value.password;
};

const emailRule = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
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
        :rules="[
          (v) => !!v || 'Email is required',
          (v) => emailRule(v) || 'Invalid email format',
        ]"
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
        text="Log In"
        type="submit"
        color="success"
        :disabled="validateForm()"
        block
      ></v-btn>
      <v-btn
        class="mt-2"
        text="Register"
        variant="outlined"
        color="success"
        @click="() => router.push('/register')"
        block
      ></v-btn>
    </v-form>
    <div>{{ loginError }}</div>
  </v-container>
</template>
