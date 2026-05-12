async function checkLoginStatus() {
    try {
        const res = await fetch('get_user.php');
        const user = await res.json();
    
        const signLink = document.querySelector('.sign-link');
        if (!signLink) return;

        if (user.isLoggedIn) {
            signLink.innerHTML = /* html */ `
            <div class="flex" style="display: flex; justify-content: center; align-items: center; gap: .5rem;">
                <img src="assets/images/favicon.svg" alt="logo" style="width:30px">
                <span>${user.name}さん</span>
            </div>
            `;
            signLink.href = "#";
        }
    } catch (e) {
        console.error('ログイン状態の取得に失敗しました', e);
    }
}

checkLoginStatus();