import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

interface ToastProps {
  type: "success" | "error";
  message: string;
  duration?: number;
}

export interface ToastOptions {
  duration?: number;
}

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  z-index: 99999;
  right: 20px;
`;

const ToastItem = styled.div<{ type: "success" | "error" }>`
  padding: 10px 16px;
  border-radius: 4px;
  color: white;
  margin-bottom: 10px;
  animation: ${slideInLeft} 0.3s forwards;
  background-color: ${({ type }) => (type === "success" ? "green" : "red")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:last-child {
    margin-bottom: 0;
  }
`;

const useToast = () => {
  const [toastQueue, setToastQueue] = useState<ToastProps[]>([]);

  useEffect(() => {
    if (toastQueue.length > 0) {
      const timer = setTimeout(() => {
        setToastQueue((prevQueue) => prevQueue.slice(1));
      }, toastQueue[0].duration || 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toastQueue]);

  const showToast = (
    type: "success" | "error",
    message: string,
    options?: ToastOptions
  ) => {
    const toastProps: ToastProps = {
      type,
      message,
      duration: options?.duration,
    };

    setToastQueue((prevQueue) => [...prevQueue, toastProps]);
  };

  return {
    showToast,
    ToastContainer: (
      <ToastContainer>
        {toastQueue.map((toast, index) => (
          <ToastItem key={index} type={toast.type}>
            {toast.message}
          </ToastItem>
        ))}
      </ToastContainer>
    ),
  };
};

export default useToast;
