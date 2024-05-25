/**
 * useEasyToast component
 * 
 * Customized the useToast component from Chakra UI, 
 * to minimize code duplication when writing a toast prompt message.
 * 
 */

import { useToast } from '@chakra-ui/react';

export function useEasyToast() {
  const toast = useToast();
  const duration = 5000;
  const isClosable = true;

  function showSuccess(title: string) {
    toast({
      title: title,
      status: 'success',
      duration: 1300,
      isClosable,
    });
  }

  function showError(message: string) {
    toast({
      title: 'Error',
      description: "Sorry, "+(message?.match(/\(auth\/([^)]+)\)/)![1] ?? "Unknown error").replaceAll('-', ' '),
      status: 'error',
      duration,
      isClosable,
    });
  }

  function showErrorNonFirebase(message: string) {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      duration,
      isClosable,
    });
  }

  return { showSuccess, showError, showErrorNonFirebase };
}
