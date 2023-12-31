//Export
let url = location.href.split("?")[0];
let page;

function scroll(){
    var scrolldown = setInterval(() => {
        window.scrollBy(0, 2000);
    }, 200);
}

function exportPlay(title = false){
    if(scrolldown){
        clearInterval(scrolldown);
    };
    let videos = [];
    videos.push(document.querySelector('yt-formatted-string[class="style-scope yt-dynamic-sizing-formatted-string yt-sans-28"]').innerHTML);
    const links = document.querySelectorAll('a');
    for (const link of links) {
        if (link.id === "video-title") {
            link.href = link.href.split('&list=')[0];
            videos.push(title ? link.title + ',' + link.href : link.href);
        }
    }

    let data = videos.join('\n');
    let blob = new Blob([data], {type: 'text/csv'});
    let elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = videos[0].replace(/\s/g, '') + '.csv';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

//Import
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function savePlaylist(listname){
    document.querySelectorAll('[aria-label="Save to playlist"]')[0].click()
    waitForElm('tp-yt-paper-dialog').then(()=>{
    let checks = document.querySelectorAll('tp-yt-paper-checkbox[class="style-scope ytd-playlist-add-to-option-renderer"]')
    let found = false;
    for (let i=0;i<checks.length;i++){
      if(checks[i].childNodes[2].children[0].children[0].children[0].title==listname){
        checks[i].click();
        found = true;
      }
    }
    if(found == false){
        document.querySelector('tp-yt-paper-item[class="style-scope ytd-compact-link-renderer"]').click();
        let elm = document.querySelector('input[placeholder="Enter playlist name..."]');
        elm.value=listname;
        let ev = new Event("input");
        elm.parentElement.dispatchEvent(ev);
        document.querySelectorAll('button[aria-label="Create"]')[1].click();
    }
    }
    );
}

function injectplaylist(title){
    let classes = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--overlay yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button";
    waitForElm('div[class="metadata-buttons-wrapper style-scope ytd-playlist-header-renderer"]').then(()=>{
        let bar = document.querySelector('div[class="metadata-buttons-wrapper style-scope ytd-playlist-header-renderer"]');
        let exportb = document.createElement('button');
        exportb.className = classes;
        exportb.onclick = ()=>exportPlay(false);
        let buttonrenderer = document.createElement("ytd-button-renderer");
        buttonrenderer.className = "style-scope ytd-playlist-header-renderer";
        bar.appendChild(buttonrenderer);
        let tooltip = buttonrenderer.querySelector('tp-yt-paper-tooltip');
        tooltip.innerHTML = '<div id="tooltip" class="style-scope tp-yt-paper-tooltip hidden" style-target="tooltip">Export</div>';
        let shape = buttonrenderer.querySelector('yt-button-shape');
        shape.appendChild(exportb); 
        let icondiv = document.createElement("div");
        icondiv.className = 'yt-spec-button-shape-next__icon';
        let yticon = document.createElement("yt-icon");
        let yticonshape = document.createElement("yt-icon-shape");
        yticonshape.className = "style-scope yt-icon";
        exportb.appendChild(icondiv);
        icondiv.appendChild(yticon);
        yticon.appendChild(yticonshape);
        yticonshape.innerHTML = '<icon-shape class="yt-spec-icon-shape"><div style="width: 100%; height: 100%; fill: currentcolor;"><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71ZM21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Z"/></svg></div></icon-shape>';
        let scrollb = document.createElement('button');
        scrollb.innerHtml = "Load videos";
        scrollb.onclick = scroll;
        buttonrenderer = document.createElement("ytd-button-renderer");
        buttonrenderer.className = "style-scope ytd-playlist-header-renderer";
        bar.appendChild(buttonrenderer);
        shape = buttonrenderer.querySelector('yt-button-shape');
        shape.appendChild(scrollb);
        tooltip = buttonrenderer.querySelector('tp-yt-paper-tooltip');
        tooltip.innerHTML = '<div id="tooltip" class="style-scope tp-yt-paper-tooltip hidden" style-target="tooltip">Scroll</div>';
        icondiv = document.createElement("div");
        icondiv.className = 'yt-spec-button-shape-next__icon';
        yticon = document.createElement("yt-icon");
        yticonshape = document.createElement("yt-icon-shape");
        yticonshape.className = "style-scope yt-icon";
        scrollb.appendChild(icondiv);
        icondiv.appendChild(yticon);
        yticon.appendChild(yticonshape);
        yticonshape.innerHTML = '<icon-shape class="yt-spec-icon-shape"><div style="width: 100%; height: 100%; fill: currentcolor;"><svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="M8,12 C9.10457,12 10,12.8954 10,14 C10,15.1046 9.10457,16 8,16 C6.89543,16 6,15.1046 6,14 C6,12.8954 6.89543,12 8,12 Z M8,-3.10862447e-14 C8.55229,-3.10862447e-14 9,0.447715 9,1 L9,6.58579 L10.2929,5.2929 C10.6834,4.90237 11.3166,4.90237 11.7071,5.2929 C12.0976,5.68342 12.0976,6.31658 11.7071,6.70711 L8,10.4142 L4.29289,6.70711 C3.90237,6.31658 3.90237,5.68342 4.29289,5.2929 C4.68342,4.90237 5.31658,4.90237 5.70711,5.2929 L7,6.58579 L7,1 C7,0.447715 7.44772,-3.10862447e-14 8,-3.10862447e-14 Z"/></svg></div></icon-shape>';
    });
}

if(location.href.split("?")[0]==="https://www.youtube.com/playlist"){
    page = "playlist";
    injectplaylist(false);
}
else if(location.href.split("?")[0]==="https://www.youtube.com/watch"){
    page = "video";
}
else{
    page = null;
}

chrome.runtime.onMessage.addListener((obj, sender, res)=>{
    const { type, value, data } = obj;
    /*
    if(type === "playlist"){
        page = "playlist";
        url = data.url;
        injectplaylist(false);
    }
    else if(type === "video"){
        url = data.url;
        page = "video";
    }
    */
    if(type === "exportplay"){
        exportPlay(data.title);
    }
    else if(type === "scrolldown"){
        scroll();
    }
    else if(type === "stopscroll"){
        clearInterval(scrolldown);
    }
    else if(type === "import"){
        savePlaylist(data.name);
    }
    else if(type === "nav"){
        window.href.location = data.url;
    }
})
