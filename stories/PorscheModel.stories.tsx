import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PorscheModel } from "@/components/PorscheModel";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Example/Porsche_Model",
  component: PorscheModel,
} as ComponentMeta<typeof PorscheModel>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PorscheModel> = (args: any) => (
  <PorscheModel {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  // primary: true,
  // label: "LiveEnvMaps",
};
