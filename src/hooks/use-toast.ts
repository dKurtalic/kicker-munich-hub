
// Re-export from the actual implementation
import { useToast as useToastOriginal, toast as toastOriginal, Toast } from "@/components/ui/use-toast";

export const useToast = useToastOriginal;
export const toast = toastOriginal;
export type { Toast };

// Re-export the toast action types
export type {
  ToastProps,
  ToastActionElement
} from "@/components/ui/toast";
