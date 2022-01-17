import toolbarButtons from "./toolbarButtons.js";
import { hotkeys } from "@ohif/core";

const ohifDefault = {
    layout: "org.ohif.default.layoutTemplateModule.viewerLayout",
    sopClassHandler: "org.ohif.default.sopClassHandlerModule.stack",
    hangingProtocols: "org.ohif.default.hangingProtocolModule.default"
};

const ohifCornerstone = {
    viewport: "org.ohif.cornerstone.viewportModule.cornerstone"
};

const clock = {
    panel: "extension.clock.panelModule.clockPanel"
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
            series: []
        },
        isValidMode: () => {},
        routes: [
            {
                path: "clock",
                layoutTemplate: ({ location, servicesManager }) => {
                    return {
                        id: ohifDefault.layout,
                        props: {
                            leftPanels: [],
                            rightPanels: [clock.panel],
                            viewports: [
                                {
                                    namespace: ohifCornerstone.viewport,
                                    displaySetsToDisplay: [
                                        ohifDefault.sopClassHandler
                                    ]
                                }
                            ]
                        }
                    };
                }
            }
        ],
        extensions: [
            "org.ohif.default",
            "org.ohif.cornerstone",
            "extension.clock"
        ],
        hangingProtocols: [ohifDefault.hangingProtocols],
        sopClassHandlers: [ohifDefault.sopClassHandler],
        hotkeys: [...hotkeys.defaults.hotkeyBindings]
    };
}

window.clockMode = mode({});
