import { message } from "antd";
import { useEffect, useState } from "react";
export default function useToast() {
  //***************************
  // define useState
  //***************************
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });

  useEffect(() => {
    if (toastMessage.message) {
      switch (toastMessage.type) {
        case "info":
          message.info(toastMessage.message, 4);
          break;
        case "success":
          message.success(toastMessage.message, 4);
          break;
        case "warning":
          message.warning(toastMessage.message, 4);
          break;
        case "loading":
          message.loading(toastMessage.message, 1);
          break;
        case "error":
          message.error(toastMessage.message, 4);
          break;
      }
    }
  }, [toastMessage]);

  // return instance
  return setToastMessage;
}
