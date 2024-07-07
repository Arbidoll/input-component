import type { ComputedRef, Ref } from 'vue';

export type MaybeComputedOrRef = ComputedRef<string> | Ref<string> | string;
