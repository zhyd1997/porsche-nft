import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LiveEnvMaps } from "@/components/LiveEnvMaps";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Example/Porsche_Model",
  component: LiveEnvMaps,
} as ComponentMeta<typeof LiveEnvMaps>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof LiveEnvMaps> = (args: any) => (
  <LiveEnvMaps {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  // primary: true,
  // label: "LiveEnvMaps",
};
