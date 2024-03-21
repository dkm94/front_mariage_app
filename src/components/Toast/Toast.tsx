import 'react-toastify/dist/ReactToastify.css'; 

import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Zoom, ToastContainer, toast, ToastOptions } from 'react-toastify';

interface ToastProps {
  message: string | undefined;
  messageType: "error" | "success" | undefined;
  options?: Partial<ToastOptions>;
  id?: string | undefined;
  setGeneratedId?: Dispatch<SetStateAction<string | undefined>>;
}

const Toast = (props: ToastProps) => {
  const { message, messageType, id, options, setGeneratedId } = props;
  
  useEffect(() => {
    const showToast = messageType === "error" ? toast.error : toast.success;
    const toastOptions: ToastOptions = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    }
    if(id){
      showToast(message, {
        ...toastOptions,
        ...options,
        toastId: id
      });
    }

    return () => {
      if(id && setGeneratedId){
        setGeneratedId(undefined)
      }
    }
}, [id]);

  return  <ToastContainer
  position="top-right"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  transition= {Zoom}
  />
}

export default Toast