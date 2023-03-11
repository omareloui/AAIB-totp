<script setup lang="ts">
import Container from "./components/Container.vue";
import { reactive, ref } from "vue";

type User = { email: string | null; secret: string | null };

const user = reactive<User>({ email: null, secret: null });

const email = ref("");
const qrcode = ref("");
const totp = ref("");
const totpFromServer = ref<string | null>(null);

const isTotpValid = ref<null | boolean>(null);

async function onRegister() {
  await register();
  await getQRCode();
}

async function validateTotp() {
  const res = await fetch("http://localhost:3000/auth/totp/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.value, token: totp.value }),
  });
  const data: { isValid: boolean } = await res.json();
  isTotpValid.value = data.isValid;
}

async function getTotpFromServer() {
  const res = await fetch(
    `http://localhost:3000/auth/totp/generate?email=${user.email}`
  );
  const data: { token: string } = await res.json();
  totpFromServer.value = data.token;
}

async function register() {
  const res = await fetch("http://localhost:3000/auth/totp/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.value }),
  });
  const _user: { email: string; secret: string } = await res.json();
  user.email = _user.email;
  user.secret = _user.secret;
}

async function getQRCode() {
  const res = await fetch(
    `http://localhost:3000/auth/totp/qrcode?email=${user.email}`
  );
  const data: { uri: string; imageData: string } = await res.json();
  qrcode.value = data.imageData;
}
</script>

<template>
  <div class="main-page">
    <Container v-if="!qrcode || !user.email">
      <h1>Register</h1>
      <form @submit.prevent="onRegister" class="email-form">
        <div class="form-field">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="email"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <button type="submit">Register and get the TOTP QRCode</button>
      </form>
    </Container>

    <Container v-if="qrcode">
      <h1>Validate TOTP</h1>
      <div class="qrcode-wrapper">
        <div class="qrcode-image">
          <img :src="qrcode" />
        </div>
        <div class="description">
          Scan this qrcode with your authentication app to get the TOTP.
          <span class="or">OR</span>
          <button @click="getTotpFromServer">
            Get the TOTP from the server
          </button>
        </div>
      </div>

      <div class="totp-server" v-if="totpFromServer">
        TOTP from server: <b>{{ totpFromServer }}</b
        >.
      </div>

      <form @submit.prevent="validateTotp" class="totp-form">
        <div class="form-field">
          <label for="totp">TOTP</label>
          <input
            type="text"
            name="totp"
            id="totp"
            v-model="totp"
            placeholder="000000"
          />
        </div>
        <button type="submit">Validate TOTP</button>

        <output
          class="totp-output"
          :class="{ valid: isTotpValid, invalid: isTotpValid === false }"
          >{{
            isTotpValid !== null ? (isTotpValid ? "Valid" : "Invalid") : ""
          }}</output
        >
      </form>
    </Container>
  </div>
</template>

<style scoped>
.main-page {
  margin: 30px 0;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
}

.qrcode-wrapper {
  display: grid;
  place-items: center;
  gap: 20px;
}

.qrcode-wrapper .description {
  color: #6a6a6a;
}

.qrcode-wrapper .description span.or {
  display: block;
  text-align: center;
  font-size: 1.2em;
  margin: 10px 0;
  color: #ffffff;
}

.qrcode-wrapper .description button {
  text-align: center;
  display: block;
  margin: 0 auto;
}

.qrcode-image {
  background: #ffffff;
  border-radius: 0.4em;
  display: inline-block;
  padding: 10px;
}

.qrcode-image img {
  display: block;
}

.totp-server {
  text-align: center;
  font-size: 1.4em;
  margin-top: 20px;
}

output {
  padding: 20px;
  font-size: 1.2em;
  border-radius: 0.4em;
  text-align: center;
  color: #ffffff;
  width: 100%;
  display: block;
  border: 0;
}

output.valid {
  background: #4cd74c;
}
output.invalid {
  background: #f52020;
}
</style>
