/** @jsxImportSource solid-js */

import { createQuery } from "@tanstack/solid-query";
import { createEffect, For, Match, Switch } from "solid-js";
import { unwrap } from "solid-js/store";
import { getColorPalette, getTypesAndWeaknesses } from "../api/pokemon";
import { client, text } from "../state";

export function Details() {
  const query = createQuery(
    () => ({
      queryKey: ["pokemon", text()],
      queryFn: () => getTypesAndWeaknesses(text()),
      placeholderData: (prev) => prev,
    }),
    () => client
  );
  const colorsQuery = createQuery(
    () => ({
      queryKey: ["color", text()],
      queryFn: () => getColorPalette(text()),
      placeholderData: (prev) => prev,
    }),
    () => client
  );

  let color = () =>
    colorsQuery.data ? `hsl(${colorsQuery.data[0]}, 40%, 30%)` : "transparent";

  return (
    <div>
      <div class="flex">
        <p class="font-semibold flex-1 text-lg text-black/70">Details</p>
      </div>
      <div class="flex-1 relative">
        <p class="text-sm font-semibold text-black/80">Type</p>
        <div class="flex flex-wrap mt-2 gap-2">
          <Switch>
            <Match when={query.isLoading}>Loading...</Match>
            <Match when={query.isSuccess}>
              <p>HELLLO</p>
              <For each={query.data?.types || []}>
                {(name) => (
                  <span
                    class="px-4 py-1 border rounded-md font-medium"
                    style="color: black; border-color: {color};"
                  >
                    {name}
                  </span>
                )}
              </For>
            </Match>
          </Switch>
        </div>
        <p class="text-sm font-semibold text-black/80 mt-3">Weaknesses</p>
        <Switch>
          <Match when={query.isLoading}>Loading...</Match>
          <Match when={query.isSuccess}>
            <p>HELLO AGAIn</p>
            <For each={query.data?.weaknesses || []}>
              {(weakness) => (
                <span
                  class="px-4 py-1 border rounded-md font-medium"
                  style={`color: black; border-color: ${color()}; border-width: 2px; border-style: solid;`}
                >
                  {weakness}
                </span>
              )}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
