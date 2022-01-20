import toolbarButtons from "./toolbarButtons.js";

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

const id = "clock";
const extensionDependencies = [
    "org.ohif.default",
    "org.ohif.cornerstone",
    "extension.clock"
];

function modeFactory({ modeConfiguration }) {
    return {
        id,
        displayName: "Clock",
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
        isValidMode: ({ modalities }) => {
            const modalities_list = modalities.split("\\");

            // Slide Microscopy modality not supported by clock mode yet
            return !modalities_list.includes("SM");
        },
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
        extensions: extensionDependencies,
        hangingProtocols: [ohifDefault.hangingProtocols],
        sopClassHandlers: [ohifDefault.sopClassHandler],
        hotkeys: []
    };
}

const mode = {
    id,
    modeFactory,
    extensionDependencies
};

export default mode;
