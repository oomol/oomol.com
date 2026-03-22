/* global module */
/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    "overview",
    {
      type: "category",
      label: "OOMOL Studio",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Core Concepts",
          collapsible: true,
          collapsed: true,
          items: [
            "concepts/project",
            "concepts/flow",
            "concepts/node",
            "concepts/block",
            "concepts/executor",
            "concepts/package",
          ],
        },
        {
          type: "category",
          label: "Get Started",
          collapsible: true,
          collapsed: false,
          items: [
            "get-started/quickstarts",
            {
              type: "category",
              label: "OOMOL Studio Interface",
              collapsible: true,
              collapsed: false,
              items: [
                "get-started/interface/home",
                "get-started/interface/project",
              ],
            },
            {
              type: "category",
              label: "Build Your First Workflow",
              collapsible: true,
              collapsed: true,
              items: [
                "get-started/zero-to-one/create-a-power-and-adder",
                "get-started/zero-to-one/combine-multiple-adders",
                "get-started/zero-to-one/merge-into-a-reusable-block",
              ],
            },
            "get-started/env-and-lib",
            "get-started/run-and-debug",
            "get-started/export-and-publish",
            "get-started/metering-and-billing",
          ],
        },
        {
          type: "category",
          label: "Advanced Usage",
          collapsible: true,
          collapsed: true,
          items: [
            "advanced-guide/universal-block-settings",
            "advanced-guide/advanced-scriptlet-block",
            "advanced-guide/advanced-task-block",
            "advanced-guide/advanced-subflow-block",
            "advanced-guide/batch-process",
            "advanced-guide/reusable-constants",
            "advanced-guide/export-image",
          ],
        },
        {
          type: "category",
          label: "Workflow Engine & SDK",
          collapsible: true,
          collapsed: true,
          items: [
            "workflow-engine/principle",
            "workflow-engine/nodejs-sdk-api",
            "workflow-engine/python-sdk-api",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Cloud Services",
      collapsible: true,
      collapsed: true,
      items: [
        "cloud-services/cloud-function",
        {
          type: "category",
          label: "Cloud Task",
          collapsible: true,
          collapsed: false,
          items: [
            "cloud-services/cloud-task/overview",
            {
              type: "category",
              label: "SDKs",
              collapsible: true,
              collapsed: false,
              items: [
                "cloud-services/cloud-task/typescript-sdk",
                "cloud-services/cloud-task/python-sdk",
                "cloud-services/cloud-task/mcp-sdk",
              ],
            },
            "cloud-services/cloud-task/curl-api",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Support",
      collapsible: true,
      collapsed: true,
      items: ["community", "faq"],
    },
  ],
};

module.exports = sidebars;
