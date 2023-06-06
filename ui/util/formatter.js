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

    const STATUS_ICON_MAP = {
        0: "",
        1: "sap-icon://sys-enter-2",
        2: "sap-icon://alert",
        3: "sap-icon://message-warning",
        4: "sap-icon://error"
    };

    return {
        getListStatusText(value) {
            return STATUS_TEXT_MAP[value];
        },
        getListStatusType(value) {
            return STATUS_TYPE_MAP[value];
        },
        getListStatusIcon(value) {
            return STATUS_ICON_MAP[value];
        },
        getCategoryText(value) {
            return this.getConfig().getProperty("/TodoListCategories").find(item => item.id === value).category;
        }
    }
});
