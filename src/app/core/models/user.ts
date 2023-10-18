import { Address } from "./address";
import { Todo } from "./todo";

export interface User {
    id: number;
    name: string;
    email: string;
    address: Address;
    phone: string;
    company: {
        name: string;
      },
    todos: [Todo],
    roles: [string]
}
