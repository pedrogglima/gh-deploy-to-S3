import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from './Icon';

export default {
  title: 'Example/Icon',
  component: Icon,
  argTypes: {},
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = args => (
  <Icon {...args} />
);

export const IconExample = Template.bind({});
IconExample.args = {
  icon: 'question'
};
