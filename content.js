function getTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}


function getWebsiteName(url) {
    let domain = url.replace(/(^\w+:|^)\/\//, '');
    let websiteName = domain.split(/[/:]/)[0];
  
    return websiteName;
  }
  

const getCookies = async (tabs) => {
    let tap = tabs.pop();
    let url = getWebsiteName(tap.url);
    let cookies = browser.cookies.getAll({url: tab.url});

    cookies.then((cookies) => {
        var cookieList = document.getElementById('cookie-list');
        var cookiesDiv = document.getElementById("cookies-div");
        var cookiesHeader = document.getElementById("header-title-cookies");
    
        var cookiesNum = document.getElementById('number-cookies');
        var p = document.createElement("p");
        var cookiesNumText = document.createTextNode("Number of cookies: " + cookies.length);
        p.appendChild(cookiesNumText);
        cookiesNum.appendChild(p);
        
    
        var cookiesText = document.createTextNode("Searching for Cookies from " + url);
        cookiesHeader.appendChild(cookiesText);

        if (cookies.length == 0) {
            var noCookies = document.createElement("p");
            var noCookiesText = document.createTextNode("No cookies found");
            noCookies.appendChild(noCookiesText);
            cookiesDiv.appendChild(noCookies);
        }

        else if (cookies.length > 0) {
            for (let cookie of cookies) {
                var cookieItem = document.createElement("li");
                var cookieText = document.createTextNode(cookie.name + ": " + cookie.value);
                cookieItem.appendChild(cookieText);
                cookieList.appendChild(cookieItem);
            }
        }
    }
    );
}

const getLocalStorage = async (tabs) => {
    let tap = tabs.pop();
    let url = getWebsiteName(tap.url);
    let localStorage = browser.storage.local.get(url);

    localStorage.then((localStorage) => {
        var localStorageList = document.getElementById('local-storage-list');
        var localStorageDiv = document.getElementById("local-storage-div");
        var localStorageHeader = document.getElementById("header-title-local-storage");
    
        var localStorageNum = document.getElementById('number-local-storage');
        var p = document.createElement("p");
        var localStorageNumText = document.createTextNode("Number of local storage items: " + localStorage.length);
        p.appendChild(localStorageNumText);
        localStorageNum.appendChild(p);
        
    
        var localStorageText = document.createTextNode("Searching for local storage from " + url);
        localStorageHeader.appendChild(localStorageText);

        if (localStorage.length == 0) {
            var noLocalStorage = document.createElement("p");
            var noLocalStorageText = document.createTextNode("No local storage found");
            noLocalStorage.appendChild(noLocalStorageText);
            localStorageDiv.appendChild(noLocalStorage);
        }

        else if (localStorage.length > 0) {
            for (let item of localStorage) {
                var localStorageItem = document.createElement("li");
                var localStorageText = document.createTextNode(item.name + ": " + item.value);
                localStorageItem.appendChild(localStorageText);
                localStorageList.appendChild(localStorageItem);
            }
        }
    }
    );
}


const getSessionStorage = async (tabs) => {
    let tap = tabs.pop();
    let url = getWebsiteName(tap.url);
    let sessionStorage = browser.storage.local.get(url);

    sessionStorage.then((sessionStorage) => {
        var sessionStorageList = document.getElementById('session-storage-list');
        var sessionStorageDiv = document.getElementById("session-storage-div");
        var sessionStorageHeader = document.getElementById("header-title-session-storage");
    
        var sessionStorageNum = document.getElementById('number-session-storage');
        var p = document.createElement("p");
        var sessionStorageNumText = document.createTextNode("Number of session storage items: " + sessionStorage.length);
        p.appendChild(sessionStorageNumText);
        sessionStorageNum.appendChild(p);
        
    
        var sessionStorageText = document.createTextNode("Searching for session storage from " + url);
        sessionStorageHeader.appendChild(sessionStorageText);

        if (sessionStorage.length == 0) {
            var noSessionStorage = document.createElement("p");
            var noSessionStorageText = document.createTextNode("No session storage found");
            noSessionStorage.appendChild(noSessionStorageText);
            sessionStorageDiv.appendChild(noSessionStorage);
        }

        else if (sessionStorage.length > 0) {
            for (let item of sessionStorage) {
                var sessionStorageItem = document.createElement("li");
                var sessionStorageText = document.createTextNode(item.name + ": " + item.value);
                sessionStorageItem.appendChild(sessionStorageText);
                sessionStorageList.appendChild(sessionStorageItem);
            }
        }
    }
    );
}

const getThirdPartyCookies = async (tabs) => {
    let tap = tabs.pop();
    let url = getWebsiteName(tap.url);
    let thirdPartyCookies = browser.cookies.getAll({url: tab.url});

    thirdPartyCookies.then((thirdPartyCookies) => {
        var thirdPartyCookiesList = document.getElementById('third-party-cookies-list');
        var thirdPartyCookiesDiv = document.getElementById("third-party-cookies-div");
        var thirdPartyCookiesHeader = document.getElementById("header-title-third-party-cookies");
    
        var thirdPartyCookiesNum = document.getElementById('number-third-party-cookies');
        var p = document.createElement("p");
        var thirdPartyCookiesNumText = document.createTextNode("Number of third party cookies: " + thirdPartyCookies.length);
        p.appendChild(thirdPartyCookiesNumText);
        thirdPartyCookiesNum.appendChild(p);
        
    
        var thirdPartyCookiesText = document.createTextNode("Searching for third party cookies from " + url);
        thirdPartyCookiesHeader.appendChild(thirdPartyCookiesText);

        if (thirdPartyCookies.length == 0) {
            var noThirdPartyCookies = document.createElement("p");
            var noThirdPartyCookiesText = document.createTextNode("No third party cookies found");
            noThirdPartyCookies.appendChild(noThirdPartyCookiesText);
            thirdPartyCookiesDiv.appendChild(noThirdPartyCookies);
        }

        else if (thirdPartyCookies.length > 0) {
            for (let cookie of thirdPartyCookies) {
                var thirdPartyCookiesItem = document.createElement("li");
                var thirdPartyCookiesText = document.createTextNode(cookie.name + ": " + cookie.value);
                thirdPartyCookiesItem.appendChild(thirdPartyCookiesText);
                thirdPartyCookiesList.appendChild(thirdPartyCookiesItem);
            }
        }
    }
    );
}