import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";

export const useController = () => {
  //------------------ QUERY -------------------------------------
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });

  

  return {query}
};
