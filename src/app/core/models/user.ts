import { Address } from "./address";

export interface User {
    id?: number;
    name?: string | null;
    username?: string
    email?: string;
    address?: Address | null;
    phone?: string | null;
    website?: string | null;
    company?: {
      name?: string | null;
      catchPhrase?: string | null;
      bs?: string
    },
    completeProfile?: number | null;
    photo?: string;
    roles?: string[]
}
