import { createSignal } from "solid-js";

const [user, setUser] = createSignal(false);

export const useUser = () => [user, setUser];
