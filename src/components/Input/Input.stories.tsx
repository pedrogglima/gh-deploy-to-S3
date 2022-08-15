import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './Input';

export default {
  title: 'Example/Input',
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
  label: 'Text Input',
  placeholder: 'Placeholder',
  helpText: 'This is a text input helper text',
  type: 'text'
};

export const TextAreaInput = Template.bind({});
TextAreaInput.args = {
  label: 'Text Input',
  placeholder: 'Placeholder',
  helpText: 'This is a text input helper text',
  type: 'text-area'
};
