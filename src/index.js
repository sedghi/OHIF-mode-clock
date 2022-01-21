import toolbarButtons from "./toolbarButtons.js";

const ohifDefault = {
    layout: "@ohif/extension-default.layoutTemplateModule.viewerLayout",
    sopClassHandler: "@ohif/extension-default.sopClassHandlerModule.stack",
    hangingProtocols: "@ohif/extension-default.hangingProtocolModule.default"
};

const ohifCornerstone = {
    viewport: "@ohif/extension-cornerstone.viewportModule.cornerstone"
};

const clock = {
    panel: "@ohif-test/extension-clock.panelModule.clockPanel"
};

// TODO -> We should inject these with webpack from the package.json
// for id -> process.env.npm_package_name
// for version -> process.env.npm_package_version
// For extension Dependencies, can at least get the versions from process.env.npm_package_peerDependencies
const id = "@ohif-test/mode-clock"; //
const version = "1.0.16";
const extensionDependencies = {
    // Can derive the versions at least process.env.from npm_package_version
    "@ohif/extension-default": "^1.0.1",
    "@ohif/extension-cornerstone": "^3.0.0",
    "@ohif-test/extension-clock": "^1.0.7"
};

function modeFactory({ modeConfiguration }) {
    return {
        id,
        version,
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
    version,
    modeFactory,
    extensionDependencies
};

export default mode;
