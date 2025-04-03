import {useQuery} from "@tanstack/react-query";
import {fetchSession, fetchSessions} from "../../api/study/session";

export const useSessions = (page, size) => {
  return useQuery({
    queryKey: ["studies", page],
    queryFn: () => fetchSessions(page, size),
    // staleTime: 30 * 1000,
  });
};

export const useSession = id => {
  return useQuery({
    queryKey: ["study", id],
    queryFn: () => fetchSession(id),
  });
};
