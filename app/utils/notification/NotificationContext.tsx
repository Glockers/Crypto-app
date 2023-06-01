import { ReactElement } from "react";
import { ReactNode, createContext, useContext } from "react";
import useToast, { IShowToast } from "~/shared/Toast";

interface IMessageReturnType {
  showToast: IShowToast;
  ToastContainer: JSX.Element;
}

const NotificationContext = createContext<IMessageReturnType | undefined>(
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

export const useNotificationContext = (): IMessageReturnType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
