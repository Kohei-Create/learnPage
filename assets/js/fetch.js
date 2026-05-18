function createNav(item) {
    const { tag, text, children, id, type, class: className, for: htmlFor, href, src, alt, target, url, ...attrs } = item;
    const el = document.createElement(item.tag);

    Object.assign(el, attrs);
    if (src) el.src = src;
    if (id) el.id = id;
    if (className) el.className = className;
    if (htmlFor) el.htmlFor = htmlFor;
    if (type) el.type = type;
    if (href) el.href = href;
    
    if (text) el.textContent = text;

    if (children) {
        children.forEach(child => el.append(createNav(child)));
    }
    return el; // 出来た要素を返す

}

document.addEventListener('DOMContentLoaded', async () => {

    const setNav = () => {
        console.error('Nav initialized');
    };

    try {
        // 1. 設定ファイルの読み込み
        const configResponse = await fetch('./assets/data/nav.json');
        if (!configResponse.ok) throw new Error('Config load failed');
        const config = await configResponse.json();

        config.parts.forEach(part => {

            const contentContainerId = part.id.replace('#','');
            const container = document.getElementById(contentContainerId);

            const dataKey = part.dataKey;
            const dataList = config[dataKey];

            if (container && dataList) {
                dataList.forEach(data => container.appendChild(createNav(data)))
            }
        });

    } catch (e) {
        console.error(e)

        const errorBox = document.createElement('div');
        errorBox.className = 'error-box';
        errorBox.textContent = 'データの読み込みに失敗しました。後でもう一度お試しください。';

        document.body.appendChild(errorBox);
    }

});