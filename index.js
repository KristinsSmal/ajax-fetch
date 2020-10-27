document.querySelector('.time-stamp').innerText 
    = new Date().toLocaleTimeString(); /*знайде селектор time-stamp і запише в 
    поточний час на момент завантаження сторінки. оновлюється тільки коли оновлюється 
    сторінка */ 
    
document.querySelector('.fetch-html').addEventListener('click', fetchHTML);
async function fetchHTML() {
    const response = await fetch('client-data.html');
    const html = await response.text();
    document.querySelector('.html-container').innerHTML = html;
}   
/* async і await роблять те ж, що і promis, але сприймають client-data.html
як звич.код, прописаний в html. але все одно звірятко буде ганяти за інфо.
1-й await збігає за інфо, 2-й await принесе її
*/
// зазвичай використовують json (різні дані з сервера, типу курс валют), 
// а не client-data.html. є json-валідатори
// це є стрінг, і щоб він став об'єктом js треба 
/* ф-ція fetch - ф-ція,що вбудована в браузер. пишемо адресу для неї -'client-data.html'
вона повертає promis(приносить дані з сервера на задану адресу, а не просто взнає дані 
і повертає. тоді-then викликає ф-цію response => response/text() ) , де response - 
відповідь,яку він принесе. Але її треба ще розшифрувати. тому тільки наступне then 
розшифрує їх
    .then( html => document.querySelector('.html-container').innerHTML = html); 
ще є catch - коли є помилка і звірятко збігає, але дані не принесе  
    */
/* можна записати в Promise - він ассинхронно працює з js
 function fetchHTML() {
 fetch('client-data.html');    
 .then( response => response/text() )
 .then( html => document.querySelector('.html-container').innerHTML = html);
 }
*/ 
 
document.querySelector('.ajax-html').addEventListener('click', ajaxHTML);
function ajaxHTML() { 
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.querySelector('.html-container').innerHTML = xhr.responseText;
        }  /* якщо ф-ція onreadystatechange = 4, то вона знайшла html-container,
             якщо 200 - завершилась спішно. */ 
    }
    xhr.open('GET', 'client-data.html', true);
    xhr.send();
}


document.querySelector('.fetch-json').addEventListener('click', fetchJSON);
async function fetchJSON() {
    const response = await fetch('client-data.json');
    const clientData = await response.json();
    document.querySelector('.client-name').innerText = clientData.name;
    document.querySelector('.balance').innerText = clientData.balance;
}



document.querySelector('.login-form input[type=submit]')
    .addEventListener('click', login);
    
function login(e) {
    e.preventDefault(); // відключить відправку форми браузером
    fetch('login', {
        method: 'POST', // в POST передаються дані в тілі запиту, 
        //а в GET перадаються дані в URL-адресі (обмежаний у к-ті даних )
        headers: {
            'Content-Type': 'application/json', // все в команді JSON
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ // робить з об'єкта JS - JSON 
        // JSON буде місити два ключі (name: і password:), які витягне з форми
        // <form class="login-form"> в htmі коді
            name: document.querySelector('.login-form input[name=name]').value,
            password: document.querySelector('.login-form input[name=password]').value
        })
    })
    .then(_ => document.querySelector('.login-form').reset());
}
// означає, що якщо форма заповниться вірно, віконечко очиститься. якщо не вірно -
// не очиститься