import { ReactElement } from "react";
import { ReactNode, createContext, useContext } from "react";
import useToast, { ToastOptions } from "~/components/Toast";

type UseMessageReturnType = {
  showToast: (
    type: "success" | "error",
    message: string,
    options?: ToastOptions
  ) => void;
  ToastContainer: JSX.Element;
};

const NotificationContext = createContext<UseMessageReturnType | undefined>(
  undefined
);

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider = ({
  children,
}: NotificationProviderProps): ReactElement => {
  const notification = useToast();

  return (
    <NotificationContext.Provider value={notification}>
      {notification.ToastContainer}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
