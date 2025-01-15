// ==UserScript==
// @name         Better Minelist
// @namespace    Better MInelist
// @version      2025-01-15
// @description  마인리스트 기능 추가
// @author       Simnple
// @match        ://*.minelist.kr/*
// @icon         https://minelist.kr/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const today = new Date();
    const day = today.getDate();

    if (window.location.pathname == '/' || window.location.pathname == '/servers' || window.location.pathname == '/bedrock-edition-servers' || window.location.pathname.startsWith('/categories/')) {
        const elements = document.querySelectorAll('.order-2');

        elements.forEach(element => {
            const childs = element.querySelectorAll('.badge');
            // console.log(element);
            const vote = childs[2].innerText.slice(0, childs[2].innerText.length - 4)
            const voteAverage = Math.floor(vote / day);
            // console.log(`하루 평균 ${voteAverage}번 추천`);

            const clone = childs[0].cloneNode(true);

            clone.textContent = `하루 평균 ${voteAverage}번 추천`;
            element.querySelector('div').appendChild(clone);
        });

    } else if (window.location.pathname.startsWith('/servers/')) {
        // server-info-wrap
        const element = document.querySelector('.server-info-wrap');
        const childs = element.querySelectorAll('div');
        const vote = childs[2].querySelector('.info-text').innerText.slice(0, childs[2].innerText.length - 4)
        const voteAverage = Math.floor(vote / day);

        // console.log(voteAverage);

        const clone = childs[4].cloneNode(true);
        const infos = clone.querySelectorAll('p');

        // console.log(`1: ${childs[4].style.width}, 2: ${element.offsetWidth}`);

        clone.classList.remove('col-md-4');
        clone.classList.add('col-md-12');
        clone.style.width = element.offsetWidth;
        infos[0].textContent = `${voteAverage}`;
        infos[1].textContent = '하루 평균 추천 수';

        element.appendChild(clone);
    };
})();
