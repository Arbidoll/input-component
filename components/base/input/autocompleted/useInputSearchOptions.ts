import type { Ref } from 'vue';

export default function useInputSearchOptions<T extends object | string>(
  options: Ref<T[]>,
  optionKey?: keyof T,
) {
  const filteredOptions = ref<string[]>([]);

  const filterOptions = (str?: string) => {
    const transformedOptions = options.value.map(_getOptionText);

    if (!str?.length) {
      filteredOptions.value = transformedOptions;
    } else {
      filteredOptions.value = transformedOptions.filter(option =>
        option.toLowerCase().includes(str.toLowerCase()),
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const _getOptionText = (option: T) => {
    if (option instanceof String) {
      return `${option}`;
    }

    if (
      option instanceof Object &&
      optionKey &&
      optionKey in (option as object)
    ) {
      return `${option[optionKey]}`;
    }

    throw new Error(
      'Option must be ether an Object(with "optionKey" passed) or a String',
    );
  };

  filterOptions();

  return {
    filteredOptions,
    filterOptions,
  };
}
