<template>
  <q-page padding class="flex items-center justify-center bg-gray-50">
    <div>
      <div class="flex justify-center">
        <img class="h-10 w-auto" src="/logo.svg" alt="" />
      </div>
      <div class="q-pa-md flex-grow" style="max-width: 400px">
        <div class="pb-4 flex row-auto justify-between">
          <h3 class="text-lg py-10 text-center">
            <span class="font-bold">Log in or sign up</span>
            to your account and discover the best electric charging experience:
          </h3>
        </div>
        <ErrorNotification :error="errorMessage" />

        <div v-if="showSocialLogin">
          <button
            @click="registerWithGoogle"
            class="hover:bg-blue-50 border border-solid border-gray-200 hover:border-blue-100 text-black px-4 rounded w-full mb-6"
            style="height: 36px"
          >
            <div class="flex justify-center">
              <svg
                class="w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 48 48"
              >
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="b">
                  <use xlink:href="#a" overflow="visible" />
                </clipPath>
                <path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                <path
                  clip-path="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />
                <path
                  clip-path="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />
                <path
                  clip-path="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                />
              </svg>
              Continue with Google
            </div>
          </button>
          <q-btn
            @click="registerWithFacebook"
            no-caps
            outline
            class="full-width mb-6 facebook-icon"
            icon="facebook"
            label="Continue with Facebook"
            type="submit"
          />
          <q-btn
            @click="showSocialLogin = false"
            no-caps
            class="full-width"
            icon="o_mail"
            label="Continue with email"
            type="submit"
            color="teal"
          />
        </div>
        <div v-else class="q-pa-md pt-4" style="max-width: 400px">
          <q-form class="q-gutter-md pt-4">
            <q-input
              filled
              v-model="email"
              label="Email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              filled
              v-model="password"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-form>
          <q-btn
            @click="registerWithEmailAndPassword"
            no-caps
            class="full-width"
            label="Create account"
            type="submit"
            color="teal"
          />
        </div>
        <q-btn
          v-if="!showSocialLogin"
          no-caps
          flat
          color="black"
          @click="showSocialLogin = true"
        >
          <q-icon left size="2em" name="arrow_back" color="primary" />
          <div>Back</div>
        </q-btn>
      </div>
      <h3 v-if="showSocialLogin" class="text-lg pt-2 text-center">
        Already registerd?
        <router-link :to="{ name: 'login' }">
          <span class="font-bold text-primary">Login here</span>
        </router-link>
      </h3>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router"; // import router
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import ErrorNotification from "@/components/notification/ErrorNotification.vue";
import { useAuth } from "@/use/Authentication";
import { inject } from "vue";

const mixpanel = inject("mixpanel");
const showSocialLogin = ref<boolean>(true);
const email = ref<string>("");
const password = ref<string>("");
const isPwd = ref<boolean>(true);
const errorMessage = ref();

const router = useRouter();
const { registerPartner } = useAuth();

const registerWithEmailAndPassword = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async (data) => {
      await registerPartner(
        {
          email: email.value,
          photoURL: null,
          displayName: null,
        },
        "Email and password"
      );
      router.push({ name: "home" });
    })
    .catch((error) => {
      errorMessage.value = makeErrorMessage(error);
    });
};

const registerWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(async (data) => {
      await registerPartner(
        {
          email: data.user.email as string,
          photoURL: data.user.photoURL as string,
          displayName: data.user.displayName as string,
        },
        "Google"
      );
      router.push({ name: "home" });
    })
    .catch((error) => {
      errorMessage.value = makeErrorMessage(error);
    });
};

const registerWithFacebook = () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(async (data) => {
      await registerPartner(
        {
          email: data.user.email as string,
          photoURL: data.user.photoURL as string,
          displayName: data.user.displayName as string,
        },
        "Facebook"
      );
      router.push({ name: "home" });
    })
    .catch((error) => {
      errorMessage.value = makeErrorMessage(error);
    });
};

const makeErrorMessage = (error: any): string => {
  switch (error.code) {
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/user-not-found":
      return "No account with that email was found";
    case "auth/wrong-password":
      return "Incorrect password";
    case "auth/email-already-in-use":
      return "Email already in use";
    case "auth/account-exists-with-different-credential":
      return "Account exists with different credentials";
    default:
      return "Email or password was incorrect";
  }
};
</script>

<style scoped>
.facebook-icon {
  color: #4267b2;
}
</style>
