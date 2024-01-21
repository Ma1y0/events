import { createSignal } from "solid-js";

type Event = {
  name: string;
  date: Date;
};

const [events, setEvents] = createSignal<Event[]>([]);

export const useEvetns = () => [events, setEvents];
