import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useFirebaseAuth } from 'vuefire';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth();
  const router = useRouter();

  const errorMessage = ref('');
  const authUser = ref(null);

  const hasError = computed(() => {
    return errorMessage.value;
  });

  const isAuth = computed(() => {
    return authUser.value;
  });

  const errorCodes = {
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Wrong password',
  };

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user;
      }
    });
  });

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authUser.value = user;
        errorMessage.value = '';
        router.push({ name: 'admin-properties' });
      })
      .catch((error) => {
        errorMessage.value = errorCodes[error.code];
      });
  };

  const logout = () => {
    /* auth.signOut();
    authUser.value = null;
    router.push({ name: 'login' }); */
    signOut(auth)
      .then(() => {
        authUser.value = null;
        router.push({ name: 'login' });
      })
      .catch((err) => console.log(err));
  };

  return {
    login,
    logout,
    errorMessage,
    hasError,
    isAuth,
  };
});
