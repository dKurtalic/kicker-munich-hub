
// This is used to avoid any circular references
import { useToast as useShadcnToast, toast as shadcnToast } from "@/components/ui/toast";

export const useToast = useShadcnToast;
export const toast = shadcnToast;
