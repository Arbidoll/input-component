import type { InputHTMLAttributes } from 'vue';

export type TInputAttributes = Partial<InputHTMLAttributes> &
  Required<Pick<InputHTMLAttributes, 'placeholder'>>;
