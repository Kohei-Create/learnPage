document.addEventListener('DOMContentLoaded', async () => {

    const setNav = () => { console.log('Nav initialized'); };

    try {
        // 1. 設定ファイルの読み込み
        const configResponse = await fetch('./assets/data/index.json');
        if(!configResponse.ok) throw new Error('Config load failed');
        const config = await configResponse.json();

        // 2. 読み込んだ(config.parts)を使ってループ
        await Promise.all(config.parts.map(async (part) => {
            try {
                const res = await fetch(part.url);
                if (!res.ok) return;

                const html = await res.text();
                const target = document.querySelector(part.id);
    
                if (target) {
                    target.innerHTML = html;
    
                    const callbacks = { 'setNav': setNav };
                    if (callbacks[part.callback]) {
                        callbacks[part.callback]();
                    }
                }
            } catch (innerError) {
                console.warn(`Failed to load part: ${part.id}`, innerError)
            }
        }));
    } catch (e) {
        console.error('Error', e);
    }

});