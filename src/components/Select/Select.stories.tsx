import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Select from './Select';
import 'theme/components/_select.scss';
import { useState } from '@storybook/addons';

export default {
  title: 'Example/Select',
  component: Select,
  argTypes: {},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = args => {
  const [value, setValue] = useState<string>(args.value);

  return (
    <Select
      {...args}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Select...',
  options: ['Option 1', 'Option 2'],
};

const MultiTemplate: ComponentStory<typeof Select> = args => {
  const [values, setValues] = useState<string[]>(args.value || []);

  return (
    <Select
      {...args}
      value={values}
      onChange={e => {
        const selected: string[] = Array.from(
          e.target.selectedOptions,
          (option: HTMLOptionElement) => option.value
        );

        setValues(selected);
      }}
    />
  );
};

export const Multiple = MultiTemplate.bind({});
Multiple.args = {
  options: ['Option 1', 'Option 2'],
  multiple: true,
  placeholder: 'Select one...'
};
