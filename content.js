function getTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}


function getWebsiteName(url) {
    let domain = url.replace(/(^\w+:|^)\/\//, '');
    let websiteName = domain.split(/[/:]/)[0];
  
    return websiteName;
  }
  

const getCookies = async (tabs) => {
    let tab = tabs.pop();
    let url = getWebsiteName(tab.url);
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
    let tab = tabs.pop();
    let url = getWebsiteName(tab.url);
  
    // Obtém o objeto de armazenamento local da página usando a API de Extensões do Firefox
    const localStorageData = await browser.tabs.executeScript(tab.id, {
      code: 'JSON.stringify(window.localStorage)',
    });
  
    const localStorage = JSON.parse(localStorageData[0]);
  
    var localStorageList = document.getElementById('local-storage-list');
    var localStorageDiv = document.getElementById('local-storage-div');
    var localStorageHeader = document.getElementById('header-title-local-storage');
  
    var localStorageNum = document.getElementById('number-local-storage');
    var p = document.createElement('p');
    var localStorageNumText = document.createTextNode(
      'Number of local storage items: ' + Object.keys(localStorage).length
    );
    p.appendChild(localStorageNumText);
    localStorageNum.appendChild(p);
  
    var localStorageText = document.createTextNode(
      'Searching for local storage from ' + url
    );
    localStorageHeader.appendChild(localStorageText);
  
    if (Object.keys(localStorage).length === 0) {
      var noLocalStorage = document.createElement('p');
      var noLocalStorageText = document.createTextNode('No local storage found');
      noLocalStorage.appendChild(noLocalStorageText);
      localStorageDiv.appendChild(noLocalStorage);
    } else {
      for (let key in localStorage) {
        var localStorageItem = document.createElement('li');
        var localStorageText = document.createTextNode(
          key + ': ' + localStorage[key]
        );
        localStorageItem.appendChild(localStorageText);
        localStorageList.appendChild(localStorageItem);
      }
    }
  };
  

  const getSessionStorage = async (tabs) => {
    let tab = tabs.pop();
    let url = getWebsiteName(tab.url);
  
    var sessionStorageList = document.getElementById('session-storage-list');
    var sessionStorageDiv = document.getElementById('session-storage-div');
    var sessionStorageHeader = document.getElementById('header-title-session-storage');
  
    var sessionStorageNum = document.getElementById('number-session-storage');
    var p = document.createElement('p');
    var sessionStorageNumText = document.createTextNode("Number of session storage items: Loading...");
    p.appendChild(sessionStorageNumText);
    sessionStorageNum.appendChild(p);
  
    // Envia uma mensagem para o content script da página atual para obter o session storage
    const response = await browser.tabs.sendMessage(tab.id, { method: 'getSessionStorage' });
  
    const sessionStorageData = response && response.data ? response.data : [];
  
    var sessionStorageText = document.createTextNode(
      'Searching for session storage from ' + url
    );
    sessionStorageHeader.appendChild(sessionStorageText);
  
    if (sessionStorageData.length === 0) {
      var noSessionStorage = document.createElement('p');
      var noSessionStorageText = document.createTextNode('No session storage found');
      noSessionStorage.appendChild(noSessionStorageText);
      sessionStorageDiv.appendChild(noSessionStorage);
    } else {
      for (let item of sessionStorageData) {
        var sessionStorageItem = document.createElement('li');
        var sessionStorageText = document.createTextNode(item[0] + ': ' + item[1]);
        sessionStorageItem.appendChild(sessionStorageText);
        sessionStorageList.appendChild(sessionStorageItem);
      }
    }
  
    // Atualiza o número de itens no elemento <p> com o ID 'number-session-storage'
    p.textContent = 'Number of session storage items: ' + sessionStorageData.length;
  };
  
  
  

  const getThirdPartyCookies = async (tabs) => {
    let tab = tabs.pop();
    let url = getWebsiteName(tab.url);
    let thirdPartyCookies = await browser.cookies.getAll({});
  
    thirdPartyCookies = thirdPartyCookies.filter(cookie => {
      const cookieDomain = getWebsiteName(cookie.domain);
      return cookieDomain !== url;
    });
  
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
    } else if (thirdPartyCookies.length > 0) {
      for (let cookie of thirdPartyCookies) {
        var thirdPartyCookiesItem = document.createElement("li");
        var thirdPartyCookiesText = document.createTextNode(cookie.name + ": " + cookie.value);
        thirdPartyCookiesItem.appendChild(thirdPartyCookiesText);
        thirdPartyCookiesList.appendChild(thirdPartyCookiesItem);
      }
    }
  }
  

getTab().then(getCookies);
getTab().then(getLocalStorage);
getTab().then(getSessionStorage);
getTab().then(getThirdPartyCookies);
