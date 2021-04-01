// ==UserScript==
// @name         GitHub Clubhouse Linking
// @website      https://github.com/shadowhand/clubhouse-linking
// @author       @shadowhand
// @license      MIT
// @description  This userscript will change [chXXX] in PRs and commit pages to Clubhouse links
// @datecreated  2016-11-02
// @lastupdated  2016-11-02
// @namespace    githubClubhouseLink
// @version      0.1.1
// @include      http*://github.com/*/*
// ==/UserScript==

(function(w, d){
    const query = function getXPathResult(path, context) {
        const s = d.evaluate(path, context || d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        const a = [];
        for (let i = 0, m = s.snapshotLength; i < m; i++) {
            a.push(s.snapshotItem(i).parentNode);
        }
        return a;
    };

    const htmlOf = function getHtmlOfNode(node) {
        const wrap = d.createElement('div');
        wrap.appendChild(node);
        return wrap.innerHTML;
    };

    const CH_STORY_URL = 'https://app.clubhouse.io/story/';
    const update = function replaceClubhouseLink(node) {
        if (node.nodeName === 'A') {
            return; // Already a link
        }

        const id = node.innerText.match(/\[ch(\d+)\]/);

        if (!id) {
            return; // Not a valid Clubhouse story reference
        }

        const link = d.createElement('a');
        link.href =  CH_STORY_URL + id[1];
        link.innerText = id[0];
        link.setAttribute('target', '_blank');

        node.innerHTML = node.innerHTML.replace(id[0], htmlOf(link));
    };

    const changed = function onLocationChange () {
        const is_pull = /\/pull\//.test(w.location.pathname);
        const is_commit = /\/commit\//.test(w.location.pathname);

        if (!is_pull && !is_commit) {
            return; // Only operate on PRs and commits (for now)
        }

        const context = is_pull ? d.querySelector('.comment-body') : d.querySelector('.full-commit');

        const nodes = query('.//text()[contains(., "[ch")]', context);
        nodes.forEach(update);
    };

    const state = {
        path: '',
        check: function () {
            const current = w.location.pathname;
            if (this.path !== current) {
                this.path = current;
                changed();
            }
        }
    };

    setInterval(state.check.bind(state), 500);
})((unsafeWindow || window), document);
