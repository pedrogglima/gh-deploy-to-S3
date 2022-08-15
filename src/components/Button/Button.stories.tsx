import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'filled',
  children: 'Button',
  color: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Button',
  color: 'secondary',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: 'Button',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  children: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Button',
};

export const Xsmall = Template.bind({});
Xsmall.args = {
  size: 'x-small',
  children: 'Button',
};
