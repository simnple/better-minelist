// ==UserScript==
// @name         Better Minelist
// @namespace    Better Minelist
// @version      2025-01-15
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
})();
