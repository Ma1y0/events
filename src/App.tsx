import { useNavigate } from "@solidjs/router";
import { useUser } from "./auth";
import { useEvetns } from "./events";
import { For, createSignal } from "solid-js";

export default function App() {
  const navigate = useNavigate();
  const [user, setUser] = useUser();
  const [events, setEvents] = useEvetns();

  const [name, setName] = createSignal("");
  const [date, setDate] = createSignal(new Date().toISOString().split("T")[0]);

  // if (!user()) {
  //   navigate("/login");
  // }

  const addEvent = (e: SubmitEvent) => {
    e.preventDefault();

    setEvents((state) => [...state, { name: name(), date: date() }]);

    setName("");
    setDate(new Date().toISOString().split("T")[0]);
  };
  return (
    <>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="flex gap-3 items-center" onSubmit={addEvent}>
          <div>
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              name
            </label>
            <div class="mt-2">
              <input
                value={name()}
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                type="text"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              for="date"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              date
            </label>
            <div class="mt-2">
              <input
                value={date()}
                onChange={(e) => setDate(e.target.value)}
                id="date"
                name="date"
                type="date"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="">
            <button
              type="submit"
              class="flex items-center justify-center font-bold text-3xl mt-6"
            >
              +
            </button>
          </div>
        </form>
      </div>
      <div class="mt-5 flex justify-center">
        <div class="relative overflow-x-auto w-[70%]">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-lg text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <For each={events()}>
                {(event) => (
                  <tr>
                    <td>{event.name}</td>
                    <td>{event.date}</td>
                    <td>
                      <button
                        class="flex justify-center items-center bg-red-800 rounded-md text-white w-9 h-6"
                        onClick={() =>
                          setEvents((prevState) =>
                            prevState.filter((a) => a.name !== event.name),
                          )
                        }
                      >
                        X
                      </button>
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
