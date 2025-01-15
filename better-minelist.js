// ==UserScript==
// @name         Better Minelist
// @namespace    Better Minelist
// @version      0.1
// @description  마인리스트 기능 추가
// @author       Simnple
// @match        ://*.minelist.kr/*
// @icon         https://minelist.kr/favicon.ico
// @grant        none
// @updateURL    https://raw.githubusercontent.com/simnple/better-minelist/refs/heads/main/better-minelist.js
// @downloadURL  https://raw.githubusercontent.com/simnple/better-minelist/refs/heads/main/better-minelist.js
// @supportURL   https://github.com/simnple/better-minelist/issues
// ==/UserScript==

(function() {
    'use strict';

    async function fetchData(url) {
        try {
            const response = await fetch(url); // 비동기로 GET 요청을 보냄
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json(); // 응답을 JSON으로 파싱
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const JAVA_API = "https://api.mcsrvstat.us/3/";
    const BEDROCK_API = "https://api.mcsrvstat.us/bedrock/3/";

    const today = new Date();
    const day = today.getDate();

    if (window.location.pathname === '/' ||
        window.location.pathname === '/servers' ||
        window.location.pathname === '/bedrock-edition-servers' ||
        window.location.pathname.startsWith('/categories/')) {

        const elements = document.querySelectorAll('.order-2');

        elements.forEach(element => {
            const badgeElements = element.querySelectorAll('.badge');
            const voteText = badgeElements[2]?.innerText.slice(0, badgeElements[2].innerText.length - 4);
            const vote = parseInt(voteText, 10) || 0;
            const voteAverage = Math.floor(vote / day);

            // console.log(`하루 평균 ${voteAverage}번 추천`);

            const clone = badgeElements[0].cloneNode(true);
            clone.textContent = `하루 평균 ${voteAverage}번 추천`;
            element.querySelector('div').appendChild(clone);

            const clone2 = badgeElements[0].cloneNode(true);
            clone2.textContent = '...';
            element.querySelector('div').appendChild(clone2);
        });

    } else if (window.location.pathname.startsWith('/servers/')) {
        const element = document.querySelector('.server-info-wrap');
        const childs = element.querySelectorAll('div');
        const voteText = childs[2]?.querySelector('.info-text')?.innerText.slice(0, childs[2].innerText.length - 4);
        const vote = parseInt(voteText, 10) || 0;
        const voteAverage = Math.floor(vote / day);

        // console.log(voteAverage);

        const clone = childs[4].cloneNode(true);
        const infos = clone.querySelectorAll('p');

        // console.log(`1: ${childs[4].style.width}, 2: ${element.offsetWidth}`);

        clone.classList.remove('col-md-4');
        clone.classList.add('col-md-12');

        infos[0].textContent = `${voteAverage}`;
        infos[1].textContent = '하루 평균 추천 수';

        element.appendChild(clone);
    }

    // async add server info

    if (window.location.pathname === '/' ||
        window.location.pathname === '/servers' ||
        window.location.pathname === '/bedrock-edition-servers' ||
        window.location.pathname.startsWith('/categories/')) {
        var API_URL = "";
        if (window.location.pathname === '/' ||
            window.location.pathname === '/servers' ||
            window.location.pathname.startsWith('/categories/')) {
            API_URL = JAVA_API;
        } else if (window.location.pathname == '/bedrock-edition-servers') {
            API_URL = BEDROCK_API;
        };

        const elements = document.querySelectorAll('.order-2');
        const ipElements = document.querySelectorAll(".copyable");

        elements.forEach((element, index) => {
            const badgeElements = element.querySelectorAll('.badge');
            const serverIP = ipElements[index].innerText.replaceAll(' ', '');

            fetchData(API_URL + serverIP).then(data => {
                const software = data.software || "알 수 없음"
                const hostname = data.hostname || "-"

                ipElements[index].childNodes[0].nodeValue += `(${hostname}) `

                // const clone = badgeElements[4]
                badgeElements[4].textContent = `${software}`;
                // element.querySelector('div').appendChild(clone);
            });
        });
    };

})();
