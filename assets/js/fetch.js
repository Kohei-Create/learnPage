function createNav(item) {
    const el = document.createElement(item.tag); //タグの作成
    if (item.class) el.className = item.class; // クラスの付与
    if (item.url) el.href = item.url // itemが(a タグなら)URLを付与する
    if (item.text) el.textContent = `${item.text}`; // 中の文字を付与

    if (item.children) {
        item.children.forEach(child => {
            const childEl = createNav(child);
            el.appendChild(childEl);
        });
    }
    return el; // 出来た要素を返す

}

document.addEventListener('DOMContentLoaded', async () => {

    const setNav = () => {
        console.log('Nav initialized');
    };

    try {
        // 1. 設定ファイルの読み込み
        const configResponse = await fetch('./assets/data/nav.json');
        if (!configResponse.ok) throw new Error('Config load failed');
        const config = await configResponse.json();

        config.headerContent.filter(item => item.tag === 'header' || item.tag === 'nav').forEach(item => {
            const el = createNav(item);
            document.getElementById('header').appendChild(el);
        });

        config.footerContent.forEach(item => {
            const el = createNav(item);
            document.getElementById('footer').appendChild(el);
        });

    } catch (e) {
        console.error(e)
    }

});