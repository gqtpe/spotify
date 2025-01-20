import type { Preview } from "@storybook/react";
import "../src/common/styles/vars.scss";
import "../src/index.scss"
import "../src/common/styles/animations.scss"


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
