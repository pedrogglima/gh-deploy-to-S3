import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Checkbox from './Checkbox';

export default {
  title: 'Example/Checkbox',
  component: Checkbox,
  argTypes: {},
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = args => (
  <Checkbox {...args} />
);

export const CheckboxInput = Template.bind({});
CheckboxInput.args = {
  variant: 'checkbox'
};

export const RadioInput = Template.bind({});
RadioInput.args = {
  variant: 'radio'
};

export const ToggleInput = Template.bind({});
ToggleInput.args = {
  variant: 'toggle'
};
