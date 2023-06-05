function externalLinks () {
    const tags = "link, img, script, video, source, audio, iframe, embed";
    const elements = Array.prototype.map.call(document.querySelectorAll(tags), 
        (HTMLtag) => {return HTMLtag.src || HTMLtag.href});

    return {"Links" : elements, "Length" : elements.length};
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => { 
    if (request.method == "thirdParty") {
        sendResponse({data: externalLinks()});
    }
    if (request.method == "cookies") {
        sendResponse({data: Object.entries(cookies)});
    }
    if (request.method == "localStorage") {
        sendResponse({data: Object.entries(localStorage)});
    }
    if (request.method === 'getSessionStorage') {
        const sessionStorageData = Object.entries(window.sessionStorage);
        sendResponse({ data: sessionStorageData });
      }
    else {
        sendResponse({data: null});
    }

});
