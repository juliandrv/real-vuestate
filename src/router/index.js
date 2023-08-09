import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/property/:id",
      name: "property",
      component: () => import("../views/PropertyView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/AdminLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "properties",
          name: "admin-properties",
          component: () => import("../views/admin/AdminView.vue"),
        },
        {
          path: "new",
          name: "new-property",
          component: () => import("../views/admin/NewProperty.vue"),
        },
        {
          path: "edit/:id",
          name: "edit-property",
          component: () => import("../views/admin/EditProperty.vue"),
        },
      ],
    },
  ],
});

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      await authenticatedUser();
      next();
    } catch (error) {
      console.log(error);
      next({ name: "login" });
    }
  } else {
    next();
  }
});

const authenticatedUser = () => {
  return new Promise((resolve, reject) => {
    const auth = useFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // llama la función una vez
      if (user) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

export default router;
