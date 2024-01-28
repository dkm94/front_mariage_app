import { createContext, useContext } from "react";
import { UserType } from "../../types";

export const CurrentUserContext = createContext<UserType | null>(null);

export const useCurrentUser = () => {
  const currentUserContext = useContext(CurrentUserContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  return currentUserContext;
};