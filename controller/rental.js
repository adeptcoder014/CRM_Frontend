import { useQuery } from "@tanstack/react-query";
import { getRent } from "../api/rental";
//=======================================
export const useRentController = () => {
  const rentQuery = useQuery({
    queryKey: ["rent"],
    queryFn: getRent,
  });

  return { rentQuery };
};