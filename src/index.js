import toolbarButtons from "./toolbarButtons.js";
import { hotkeys } from "@ohif/core";

const ohif = {
  layout: "org.ohif.default.layoutTemplateModule.viewerLayout",
  sopClassHandler: "org.ohif.default.sopClassHandlerModule.stack",
  hangingProtocols: "org.ohif.default.hangingProtocolModule.default",
  viewport: "org.ohif.cornerstone.viewportModule.cornerstone",
};

const clock = {
  panel: "simple.extension.panelModule.clockPanel",
};

export default function mode({ modeConfiguration }) {
  return {
    id: "clock",
    displayName: "Basic Viewer",
    /**
     * Lifecycle hooks
     */
    onModeEnter: ({ servicesManager, extensionManager }) => {
      const { ToolBarService } = servicesManager.services;
      ToolBarService.init(extensionManager);
      ToolBarService.addButtons(toolbarButtons);
      ToolBarService.createButtonSection("primary", ["Time"]);
    },
    onModeExit: () => {},
    validationTags: {
      study: [],
      series: [],
    },
    isValidMode: () => {},
    routes: [
      {
        path: "clock",
        layoutTemplate: ({ location, servicesManager }) => {
          return {
            id: ohif.layout,
            props: {
              leftPanels: [],
              rightPanels: [clock.panel],
              viewports: [
                {
                  namespace: ohif.viewport,
                  displaySetsToDisplay: [ohif.sopClassHandler],
                },
              ],
            },
          };
        },
      },
    ],
    extensions: ["org.ohif.default", "org.ohif.cornerstone"],
    hangingProtocols: [ohif.hangingProtocols],
    sopClassHandlers: [ohif.sopClassHandler],
    hotkeys: [...hotkeys.defaults.hotkeyBindings],
  };
}

window.clockMode = mode({});
