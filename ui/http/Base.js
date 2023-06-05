sap.ui.define([], function() {
    "use strict";

    return {
        async _fetchJSON(endpoint, options = {}) {
            const res = await fetch(endpoint, {...options});

            if (!res.ok) 
                throw new Error(res.statusText);

            if (options.parseResponse !== false && res.status !== 204) 
                return res.json();
            
            return undefined;
        }
    }
});
