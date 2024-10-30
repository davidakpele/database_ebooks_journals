/* global thiss */

/**
 * Override the create_iframe method from the persistence service thiss.js
 *
 * This allows us to add some security of using the sandbox attribute.
 *
 * Ideally we would want to add Content-Security-Policy attribute to the iframe, however, the underlying websites
 * don't return a CSP response and so adding a CSP would fail to load the iframe.
 */

function createOAPersistenceService(baseUrl) {
    'use strict';

    var OAPersistenceService = function () {
        thiss.PersistenceService.apply(this, arguments);
    };

    OAPersistenceService.prototype = thiss.PersistenceService.prototype;

    OAPersistenceService.prototype.constructor = OAPersistenceService;

    OAPersistenceService.prototype.create_iframe = function (url) {
        var frame = window.document.createElement('iframe');
        frame.style.display = 'none';
        frame.style.position = 'absolute';
        frame.style.top = '-999px';
        frame.style.left = '-999px';
        frame.id = "ps_" + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
        frame.sandbox += ['allow-scripts allow-same-origin']; // Extra adding of sandbox
        window.document.body.appendChild(frame);
        frame.src = url;
        return frame;
    };

    return new OAPersistenceService(baseUrl);
}
