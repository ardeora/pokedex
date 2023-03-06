import {
  createQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/solid-query";

import { getPokemon, IPokemon } from "../api/pokemon";
import { client, text } from "../state";
import { Details } from "./Details";

const Pokedex = () => {
  const query = createQuery(
    () => ({
      queryKey: ["pokemon", text()],
      queryFn: () => getPokemon(text()),
      placeholderData: (prev) => prev,
    }),
    () => client
  );

  return <Pokemon data={query.data} />;
};

function Pokemon(props: { data: IPokemon | undefined }) {
  return (
    <>
      <div class="container flex gap-4 items-center px-8 mt-4 justify-between mx-auto max-w-5xl">
        <Details />
      </div>
    </>
  );
}

export default function PokedexProvider() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Pokedex />
    </QueryClientProvider>
  );
}
