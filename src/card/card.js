const cardList = document.querySelector('.card__list');

function handleClick(card, cardMenu, ul) {
    card.style.cssText = 'flex-direction: column';
    const classes = ul.className.split(' ');
    if (classes.includes('show')) {
        ul.classList.remove('show');
        ul.classList.add('hide');
        cardMenu.style.cssText = 'background: #F7F7F7';
    } else {
        ul.classList.remove('hide');
        ul.classList.add('show');
        cardMenu.style.cssText = 'background: #FF3535';
    }
}

function create(programContent, d, module) {
    const card = document.createElement('div');
    card.classList.add('card');

    const span = document.createElement('span');
    span.innerText = `${module} модуль`;

    const cardMenu = document.createElement('div');
    cardMenu.classList.add('card__menu');
    cardMenu.append(span);

    const h2 = document.createElement('h2');
    h2.classList.add('card__title');
    h2.innerText = `${module} модуль`;

    const ul = document.createElement('ul');
    ul.classList.add('card__subject-list');

    if (module === 1) {
        d.specializedSubjects.slice(0, 5).forEach(s => {
            const li = document.createElement('li');
            li.innerText = s;
            ul.append(li);
            return li;
        });
    } else if (module === 2) {
        d.specializedSubjects.slice(5).forEach(s => {
            const li = document.createElement('li');
            li.innerText = s;
            ul.append(li);
            return li;
        });
    }

    card.append(cardMenu);
    card.append(h2);
    card.append(ul);

    card.addEventListener('click', e => handleClick(card, cardMenu, ul));

    programContent.append(card);
}

const fetchApi = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    const data = json.data.slice(0, 5);

    data.map((d, i) => {
        cardList.innerHTML += `
    <div class="program">
                <h2 class="program__title">${d.title}</h2>
                <div class="program__content">
                </div>
    </div>
    `;
        const programContent = document.querySelectorAll('.program__content')[i];

        if (d.specializedSubjects.length > 5) {
            create(programContent, d, 1);
            create(programContent, d, 2);
        } else {
            create(programContent, d, 1);
        }
    });
    console.log(data);
}

fetchApi('https://ipo-cp.ru/api/v1/bootcamps/605c5f71bc557b46b4f42a56/courses');

