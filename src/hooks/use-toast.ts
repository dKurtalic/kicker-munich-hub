
// This file is a wrapper around useToast from '@/components/ui/use-toast'
// It's here to prevent circular dependencies and make it easier to import

import { 
  useToast as useToastOriginal,
  toast as toastOriginal
} from "@/components/ui/use-toast";

export const useToast = useToastOriginal;
export const toast = toastOriginal;

// Re-export the toast action types
export type {
  ToastProps,
  ToastActionElement
} from "@/components/ui/toast";
