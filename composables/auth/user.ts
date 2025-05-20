import { ref, watch } from "vue";
import { useStorage } from "@vueuse/core";
const user = ref(null);

const runtimeData = {
  auth: ref(),
  user: ref({} as any),
  church: ref({} as any),
  token: ref(""),
};
const localStorageData = {
  auth: ref(),
  user: useStorage("user", {} as any),
  church: useStorage("church", {} as any),
  token: useStorage("token", ""),
};

watch(
  runtimeData.user,
  (val) => {
    if (val && typeof val === "object") {
      Object.keys(val).forEach((key) => {
        localStorageData.user.value[key] = val[key];
      });
    }
  },
  { deep: true }
);

(() => {
  runtimeData.auth.value = localStorageData.auth.value;
  runtimeData.user.value = localStorageData.user.value;
  runtimeData.church.value = localStorageData.church.value;
  runtimeData.token.value = localStorageData.token.value;
})();

export const useUser = () => {
  const id = computed({
    get: () => runtimeData?.auth?.value?.id ?? "",
    set: () => {},
  });


  const isLoggedIn = computed({
    get: () => {
      if (!runtimeData.token?.value) return false;
      return (
        runtimeData?.user?.value != null &&
        typeof runtimeData.user.value === "object"
      );
    },
    set: () => {},
  });

  const isEmailVerified = computed(() => {
    return runtimeData?.user?.value.isEmailVerified;
  });

  const logOut = () => {
    localStorage.clear();
    runtimeData.user.value = null;
    runtimeData.church.value = null;
  };

  const setToken = (token: string) => {
    runtimeData.token.value = token;
    localStorageData.token.value = token;
  };
  const createUser = (data: any) => {
    runtimeData.user.value = data?.user;
    localStorageData.user.value = data?.user;
    localStorageData.token.value = data?.token;
    runtimeData.token.value = data?.token;
    localStorageData.church.value = data?.church;
    runtimeData.church.value = data?.church;
  };

  const updateUser = (user: any) => {
    runtimeData.user.value = user;
    localStorage.setItem('user', JSON.stringify(user));
    localStorageData.user.value = user;
  };

  return {
    id,
    isLoggedIn,
    isEmailVerified,
    createUser,
    ...runtimeData,
    logOut,
    updateUser,
    setToken
  };
};
