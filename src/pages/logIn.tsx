import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { useUser } from "../auth";

type User = {
  email: string;
  password: string;
};

const users: User[] = [
  {
    email: "user1@email.com",
    password: "1234",
  },
  {
    email: "user2@email.com",
    password: "1234",
  },
];

export default function LogIn() {
  const navigation = useNavigate();
  const [user, setUser] = useUser();

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  const validate = (e: SubmitEvent) => {
    e.preventDefault();

    if (
      users.filter(
        (user) => user.password == password() && user.email == email(),
      ).length > 0
    ) {
      setEmail("");
      setPassword("");

      setUser(true);

      navigation("/");
    } else {
      toast.error("Wrong password or email");
    }
  };

  return (
    <>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" onSubmit={validate}>
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div class="mt-2">
                <input
                  value={email()}
                  onInput={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div class="mt-2">
                <input
                  value={password()}
                  onInput={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
