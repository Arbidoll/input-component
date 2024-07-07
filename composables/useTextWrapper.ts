import type { MaybeComputedOrRef } from '~/models/types/utils';
import { mergeObjects } from '~/helpers/objects';

interface IOptions {
  tag: keyof HTMLElementTagNameMap;
  className?: string;
}

const baseOptions: IOptions = {
  tag: 'span',
};

export default function useTextWrapper(
  text: MaybeComputedOrRef,
  substring: MaybeComputedOrRef,
  options: Partial<IOptions> = {},
) {
  const mergedOptions = mergeObjects(baseOptions, options);

  const wrapSubstring = (
    txt: MaybeComputedOrRef,
    substr: MaybeComputedOrRef,
  ) => {
    const unrefedSubstring = unref(substr);
    const unrefedText = unref(txt);

    const searchRegExp = new RegExp(`(${unrefedSubstring})`, 'gi');
    const replacedValue = `<${mergedOptions.tag} class="${options.className}">$1</${mergedOptions.tag}>`;

    return unrefedText.replaceAll(searchRegExp, replacedValue);
  };

  const formattedText = computed(() => {
    return wrapSubstring(text, substring);
  });

  return {
    formattedText,
    wrapSubstring,
  };
}
