import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as auth from "../api/auth";
import { queryKeys } from "../api/queryKeys";

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => auth.getProfile(),
    enabled: !!localStorage.getItem("token"),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auth.login,
    onSuccess: ({ data }) => {
      localStorage.getItem("token", data.token);
      queryClient.setQueryData(queryKeys.auth.me, data.user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auth.register,
    onSuccess: ({ data }) => {
      localStorage.getItem("token", data.token);
      queryClient.setQueryData(queryKeys.auth.me, data.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      localStorage.getItem("token");
      queryClient.setQueryData(queryKeys.auth.me, null);
      queryClient.clear();
    },
  });
}
