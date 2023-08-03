import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const auth = useFirebaseAuth();

  const errorMessage = ref("");

  const hasError = computed(() => {
    return errorMessage.value;
  });

  const errorCodes = {
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "Wrong password",
  };

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        errorMessage.value = "";
      })
      .catch((error) => {
        errorMessage.value = errorCodes[error.code];
      });
  };

  return {
    login,
    errorMessage,
    hasError,
  };
});
