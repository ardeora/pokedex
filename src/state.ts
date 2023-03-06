import { QueryClient } from '@tanstack/solid-query';
import { createSignal } from 'solid-js';

const [text, setText] = createSignal('34');
const add = () => setText((Number(text()) + 1).toString());
const subtract = () => setText((Number(text()) - 1).toString());

export const client = new QueryClient();

export { text, setText, add, subtract };
