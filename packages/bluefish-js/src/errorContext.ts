import { createContext, useContext } from "solid-js";
import { BluefishError } from "./errors";
import { createStore } from "solid-js/store";

export type ErrorContextType = {
  errors: BluefishError[];
  addError: (error: BluefishError) => void;
};

export const createErrorContext = (
  onError: (error: BluefishError) => void
): ErrorContextType => {
  const [errors, setErrors] = createStore<BluefishError[]>([]);
  const addError = (error: BluefishError) => {
    setErrors((prev) => [...prev, error]);
    onError(error);
  };
  return { errors, addError };
};

export const ErrorContext = createContext<ErrorContextType | null>(null);

export const useError = () => {
  const context = useContext(ErrorContext);

  // if (context === null) {
  //   throw new Error("useError must be used within an ErrorContext.Provider");
  // }

  // return context.addError;
  return (error: BluefishError) => {
    console.warn(error);
  };
};
