async function checkLoginStatus() {
    try {
        const res = await fetch('get_user.php');
        const user = await res.json();

        const signLink = document.querySelector('.sign-link');
        if (!signLink) return;

        const container = document.querySelector('.sign-link')
        if (container) {
            container.innerHTML = '';

        }

        const signElement = [{
            tag: "a",
            href: "#",
            class: "flex",
            children: [{
                    tag: "img",
                    class: "favicon",
                    src: "assets/images/favicon.svg"
                },
                {
                    tag: "span",
                    class: "flex-text",
                    text: `${user.name}さん`
                }
            ]
        }, ];

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
checkLoginStatus();