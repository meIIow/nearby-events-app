"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var events = [
            { id: 11, name: 'Concert at Park' },
            { id: 12, name: 'Trivia at Narcos' },
            { id: 13, name: 'Pickup Soccer at Rose Bowl' },
            { id: 14, name: 'Dodger Game at Dodger Stadium' },
        ];
        return { events: events };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map