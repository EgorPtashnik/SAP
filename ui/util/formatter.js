sap.ui.define([], function() {
    "use strict";

    const STATUS_TEXT_MAP = {
        0: "None",
        1: "Low",
        2: "Medium",
        3: "High",
        4: "Critical"
    };

    const STATUS_TYPE_MAP = {
        0: sap.ui.core.MessageType.None,
        1: sap.ui.core.MessageType.Success,
        2: sap.ui.core.MessageType.Warning,
        3: sap.ui.core.MessageType.Error,
        4: sap.ui.core.MessageType.Error
    };

    return {
        getListStatusText(value) {
            return STATUS_TEXT_MAP[value];
        },
        getListStatusType(value) {
            return STATUS_TYPE_MAP[value];
        },
        getCategoryText(value) {
            return "No Category"
        }
    }
});
