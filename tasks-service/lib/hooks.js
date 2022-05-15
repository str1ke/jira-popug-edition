import useSWR, { useSWRConfig } from "swr";

import fetcher from "./fetcher";

export function useUser() {
  const { data, error } = useSWR("/api/me", fetcher);

  const loading = !data && !error;

  return [data?.user, { loading, error }];
}

export function useTasks() {
  const { data, error } = useSWR("/api/tasks", fetcher, {
    refreshInterval: 3000,
  });

  const loading = !data && !error;

  return [data?.data, { loading, error }];
}

export function useLogin() {
  const { mutate } = useSWRConfig();

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    mutate("/api/me");
  };

  return [{ logout }];
}

export function useCreateTask() {
  const { mutate } = useSWRConfig();

  const createTask = async () => {
    await fetch("/api/tasks", { method: "POST" });
    mutate("/api/tasks");
  };

  return [{ createTask }];
}

export function useCompleteTask() {
  const { mutate } = useSWRConfig();

  const completeTask = async (id) => {
    await fetch(`/api/tasks/${id}/complete`, { method: "POST" });
    mutate("/api/tasks");
  };

  return [{ completeTask }];
}

export function useReshuffleTasks() {
  const { mutate } = useSWRConfig();

  const reshuffleTasks = async (id) => {
    await fetch("/api/tasks/reshuffle", { method: "POST" });
    mutate("/api/tasks");
  };

  return [{ reshuffleTasks }];
}
