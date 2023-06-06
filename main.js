function externalLinks () {
    const tags = "link, img, script, video, source, audio, iframe, embed";
    const elements = Array.prototype.map.call(document.querySelectorAll(tags), 
        (HTMLtag) => {return HTMLtag.src || HTMLtag.href});

    return {"Links" : elements, "Length" : elements.length};
}

async function getFingerprint() {
    const FingerprintJS = await import('https://openfpcdn.io/fingerprintjs/v3/esm.min.js');
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const visitorId = result.visitorId;
    return visitorId;
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
    if (request.method === 'getFingerprint') {
        getFingerprint()
          .then(fingerprint => {
            sendResponse({ data: fingerprint });
          })
          .catch(error => {
            sendResponse({ data: null });
          });
      }
      
      
    else {
        sendResponse({data: null});
    }

});
