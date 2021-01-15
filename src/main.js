
// JSON 파일로 부터 아이템을 받아옴
function loadItems() {
    return fetch('../data/data.json') // fetch는 성공적으로 데이터를 받아오면 response라는 객체를 전달해줌
        .then(response => response.json()) // response에 있는 json() API를 이용해서 response body를 json으로 변환
        .then(json => json.items); // json 파일의 items 데이터를 리턴
}

// 전달 받은 데이터를 HTML의 요소로 전환해서 화면에 보여줌
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
    // map 으로 li 태그로 된 새로운 배열을 만든 뒤 문자열로 변환
    // innerHTML: 부모 요소에 요소 추가
}

// li 태그로 전환
function createHTMLString(item) {
    return `
   <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
   `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }

    displayItems(items.filter(item => item[key] === value));
}

// 이벤트
function setEventListeners(items) {
    // 이벤트 위임: logo와 button들이 들어있는 컨테이너에 이벤트 리스너를 등록해서 한 곳에서만 핸들링 할 수 있도록 만드는 방법
    // 요소마다 일일히 이벤트 리스너를 다는거보다 효율적이기 때문에 사용
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.btns');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems()
    .then(items => {
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log);