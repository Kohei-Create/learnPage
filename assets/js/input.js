//全てのアイコン取得
const eyeIcons = document.querySelectorAll(".eye-open, .eye-close");

eyeIcons.forEach(btn => {
    //btnがclickされた時に動く
    btn.addEventListener('click', () => {

        //clickされたiconから見て、「input-wrap」の中にあるinputを探す
        const wrap = btn.closest('.input-wrap');
        const input = wrap.querySelector('.input-pass');

        //wrapの中にある「icon」を探す
        const openIcon = wrap.querySelector('.eye-open');
        const closeIcon = wrap.querySelector('.eye-close');

        //条件分岐: password なら text に変更する
        const isPassword = input.type === 'password'
        input.type = isPassword ? 'text' : 'password';
        //classを入れ替えて表示を切り替える
        console.log('icon-open')
        openIcon.classList.toggle('d-none', !isPassword);
        closeIcon.classList.toggle('d-none', isPassword);
    });
});

const getWeather = async (icons, layout) => {
    try {
        const url = "https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json";
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('天気データが取得できませんでした');
        
        const data = await response.json();
        
        if (!data || !data[0] || !data[0].timeSeries) {
            throw new Error('取得データ',!data,!data[0]);
        } 
        
        const areaName = data[0].publishingOffice;
        const reportText = data[0].timeSeries[0].areas[0].weathers[0] || "予報なし";

        const matchedIcon = icons.find(icon => reportText.includes(icon.text)) || icons[0];

        const weatherTarget = document.getElementById('weather-info');
        if (!weatherTarget) return;

        weatherTarget.innerHTML = '';
        const div = document.createElement('div');
        div.classList.add('weather-card');

        layout.forEach(item => {
            const el = document.createElement(item.tag);
            el.classList.add(item.class);
            console.log('loading error');

            if (item.type === 'icon') {
                el.src = matchedIcon.src;
                el.alt = matchedIcon.text;
            } else if (item.type === 'area') {
                el.textContent = `${areaName}:`;
            } else if (item.type === 'report') {
                el.textContent = reportText;
            }
            div.appendChild(el);
        });
        console.log('icon, area, areaName, report');
        
        weatherTarget.appendChild(div);
        
    } catch (e) {
        console.error('天気が取得できませんでした', e);
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const configResponse = await fetch('./assets/data/index.json');
        const { icons, layout } = await configResponse.json();
        
        await getWeather(icons, layout);
    } catch (e) {
        console.error('Setting Load to Error', e);
    }
});