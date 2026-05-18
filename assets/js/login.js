const checkLoginStatus = async () => {
    const container = document.querySelector('.sign-link');
    if (!container) return;
    try {
        const res = await fetch('get_user.php');
        const user = await res.json();

        container.innerHTML = '';

        const signElement = [
            { tag: "a", class: "flex", href: "#", children: [
                { tag: "img", class: "favicon", src: "assets/images/favicon.svg" },
                { tag: "span", class: "flex-text", text: `${user.name}さん` }
            ]}, 
        ];

        signElement.forEach(config => {
            const parentEl = document.createElement(config.tag);
            parentEl.className = config.class;

            if (config.children) {
                config.children.forEach(childrenConfig => {
                    const childEl = document.createElement(childrenConfig.tag);
                    childEl.className = childrenConfig.class;

                    if (childrenConfig.src) childEl.src = childrenConfig.src;
                    if (childrenConfig.text) childEl.textContent = childrenConfig.text;

                    parentEl.appendChild(childEl);
                });
            }
            container.appendChild(parentEl);
        });
    } catch (e) {
        console.error('ログイン状態の取得に失敗しました', e);
    }
};

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
checkLoginStatus();