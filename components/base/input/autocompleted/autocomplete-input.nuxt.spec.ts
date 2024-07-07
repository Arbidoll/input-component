import { mount, VueWrapper } from '@vue/test-utils';
import AutocompleteInput from './index.vue';
import { cities } from './cities.mock';
import { describe, it, beforeEach, expect } from 'vitest';
import sleep from '~/helpers/sleep';

// @ts-ignore
type TAutocompleteInputType = InstanceType<typeof AutocompleteInput>;
type TAutocompleteInputProps = TAutocompleteInputType['$props'];

const selectors = {
  wrapper: '.base-input-with-autocomplete',
  input: '.base-input__inner',
  dropdown: '.base-input-dropdown',
  dropdownHidden: '.base-input-dropdown--hidden',
  dropdownOption: '.base-input-dropdown-option',
};

document.body.innerHTML = `
  <div id="app"></div>
`;

describe('Input with autocomplete component', () => {
  let wrapper: VueWrapper;

  const inputOptions: TAutocompleteInputProps['inputOptions'] = {
    placeholder: 'Input placeholder',
    disabled: false,
    type: 'search',
  };

  const propsData: TAutocompleteInputProps = {
    modelValue: '',
    options: cities,
    optionKey: 'name',
    inputOptions,
  };

  const createWrapper = (
    props: Partial<TAutocompleteInputProps> = {},
    isRewrite = true,
  ) => {
    const wr = mount(AutocompleteInput, {
      propsData: { ...propsData, ...props },
      props: {
        ...propsData,
      },
      attachTo: document.getElementById('app')!,
    });

    if (isRewrite) {
      wrapper = wr;
    }
    return wr;
  };

  beforeEach(() => {
    createWrapper();
  });

  it('component should exist', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('modelValue should match', async () => {
    const input = wrapper.find<HTMLInputElement>(selectors.input);
    expect(input.element.value).toEqual(propsData.modelValue);

    const newValue = 'Москва';
    await wrapper.setProps({ modelValue: newValue });
    expect(input.element.value).toEqual(newValue);
  });

  it('dropdown should open and close', async () => {
    const dropdownHiddenClass = selectors.dropdownHidden.replace('.', '');
    // default state
    const dropdown = wrapper.find(selectors.dropdown);
    expect(dropdown.element.className).includes(dropdownHiddenClass);

    const input = wrapper.find(selectors.input);
    await input.trigger('focus');
    await wrapper.vm.$nextTick();

    // state after input was clicked
    const dropdown1 = wrapper.find(selectors.dropdown);
    expect(dropdown1.element.className).not.includes(dropdownHiddenClass);

    document.body.click();
    await wrapper.vm.$nextTick();

    // state after document was clicked
    const dropdown2 = wrapper.find(selectors.dropdown);
    expect(dropdown2.element.className).includes(dropdownHiddenClass);
  });

  it('dropdown should change options', async () => {
    const options = wrapper.findAll(selectors.dropdownOption);
    expect(options.length).toEqual(426);

    await wrapper.setProps({ modelValue: 'Козьмодемьянск' });
    await sleep(500);

    const options1 = wrapper.findAll(selectors.dropdownOption);
    expect(options1.length).toEqual(1);
  });
});
