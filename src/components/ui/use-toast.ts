
// Re-export from the actual implementation
// Import this file in components, not directly from use-toast.ts
import { ToastActionElement, toast as toastFunction } from "@/components/ui/toast";
import { useToast as useToastHook } from "@/hooks/use-toast";

export { useToastHook as useToast, toastFunction as toast };
export type { ToastActionElement };
