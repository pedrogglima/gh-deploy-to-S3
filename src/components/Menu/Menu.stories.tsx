import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuGroup, MenuItem } from './Menu';
import Menu from './Menu';
import Highlight from 'components/Highlight';
import 'theme/stories/_searchbar.scss';

export default {
  title: 'Example/Menu',
  component: Menu,
  argTypes: {},
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = args => {
  return (
    <Menu className="searchbar--results" {...args}>
      <MenuGroup title="Menu Example Group">
        <MenuItem className="searchbar--result">
          <span className="searchbar--result-name">
            <Highlight text="Highlight Example" match="Example" />
          </span>
          <span className="searchbar--result-info">Menu Item Example</span>
          <span className="searchbar--result-info">
            <Highlight text="12345" match="Example" />
          </span>
        </MenuItem>
        <MenuItem className="searchbar--result">
          <span className="searchbar--result-name">
            <Highlight text="Highlight Example" match="Example" />
          </span>
          <span className="searchbar--result-info">Menu Item Example</span>
          <span className="searchbar--result-info">
            <Highlight text="12345" match="Example" />
          </span>
        </MenuItem>
      </MenuGroup>
    </Menu>
  );
};

export const MenuExample = Template.bind({});
MenuExample.args = {};
