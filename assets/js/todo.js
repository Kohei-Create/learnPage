document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const list = document.getElementById('list');
    const items = JSON.parse(localStorage.getItem('items'));

    if (items) {
        items.forEach(item => {
            add(item);
        })
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        add();
    });
    
    function add(item) {
        let todoText = input.value;

        if (item) {
            todoText = item.text;
        }

        if (todoText.length > 0) {
            const li = document.createElement('li');
            li.innerText = todoText;
            li.classList.add("list-group-item");

            if (item && item.completed) {
                li.classList.add('completed');
            }

            li.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                console.log('右クリック検知');
                li.remove();
                saveData();
            });

            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveData();
            });

            list.appendChild(li);
            input.value = '';
            saveData();
        }
    }

    function saveData() {
        const lists = document.querySelectorAll('#list li');
        let items = [];
        lists.forEach(list => {
            let item = {
                text: list.innerText,
                completed: list.classList.contains('completed')
            };
            items.push(item);
        });
        localStorage.setItem('items', JSON.stringify(items));
    }

});