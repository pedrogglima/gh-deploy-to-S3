import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Chip from './Chip';

export default {
  title: 'Example/Chip',
  component: Chip,
  argTypes: {},
} as ComponentMeta<typeof Chip>;

const Template: ComponentStory<typeof Chip> = args => (
  <Chip {...args}>Example</Chip>
);

export const Default = Template.bind({});
Default.args = {};
export const Success = Template.bind({});
Success.args = {
  color: 'success',
};
export const Warning = Template.bind({});
Warning.args = {
  color: 'warning',
};
export const Error = Template.bind({});
Error.args = {
  color: 'error',
  onDismiss: () => {
    alert('HELLO WORLD');
  },
};
