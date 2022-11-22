import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/user";

export const useController = (props) => {
  //------------------ QUERY -------------------------------------
  const query = useQuery({
    queryKey: ["user",props.filter ],
    queryFn: () => getUsers({ filter: props.filter }),
  });

  return { query };
};
