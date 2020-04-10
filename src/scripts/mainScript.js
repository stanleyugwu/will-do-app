//var temp = [{ id: '3238195', date: new Date('Apr 05 2020 22:59:17'), text: 'sasj asjasjhjrjrnfm rrr c', importance: 2.9 }, { id: '4497732', date: new Date('Apr 01 2010 22:59:17'), text: 'asj asjasjh sjh asjhsasdldsjh sjhd jsdkhd kds dssdh dsdss jdhjd dk jrjrnfm rrr c', importance: 4 }, { id: '3457612', date: new Date('Jan 03 2019 22:59:17'), text: 'basj asjasjh sjh asjhsasdl dkjdd ddl d  jhsa samm djdd djd ddkj ddijd dns d dhsd sdn sdjh dhsd d sjdh dsjh sjhd jsdkhd kds dssdh dsdss jdhjd dk jrjrnfm rrr c', importance: 3.9 }, { id: '9990561', date: new Date('Apr 08 2020 22:59:17'), text: 'zasj asjas sjdh dsjh sjhd jsdkhd kds dssdh dsdss jdhjd dk jrjrnfm rrr c', importance: 1.9 }, { id: '9786452', date: new Date('Apr 24 2020 22:59:17'), text: 'abasj asjasjh sjh asjhsasdl dkjdd ddl d  jhsa samm djdd djd ddkj ddijd dns d dhsd sdn sdjh dhsd d sjdh dsjh sjhd jsdkhd kds dssdh dsdss jdhjd dk jrjrnfm rrr c', importance: 2.9 }];
/**Sorting Fuction */
function compareValues(key) {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }
        let order = 'desc';
        let varA;
        let varB;
        if (typeof a[key] === 'string' && typeof b[key] === 'string' && (new Date(a[key]).toTimeString() == 'Invalid Date' || new Date(b[key]).toTimeString() == 'Invalid Date')) {
            varA = a[key].toUpperCase();
            varB = b[key].toUpperCase();
            order = 'asc';
        } else if (typeof a[key] === 'number' && typeof b[key] === 'number') {
            varA = a[key];
            varB = b[key];
        } else {
            varA = new Date(a[key]).getTime();
            varB = new Date(b[key]).getTime();
        }
        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return ((order == 'asc') ? comparison : comparison * -1)
    };
} /**Sorting ends */

let dbInUse = 'db';

const db = get('willdo.db', true);
db.sort(compareValues(get('willdo.sort')));

const dbTrash = get('willdo.trash', true);
dbTrash.sort(compareValues(get('willdo.sort')));

const dbCompleted = get('willdo.completed', true);
dbCompleted.sort(compareValues(get('willdo.sort')));


window.onload = function() {
    $('.page-wrapper .floating-bottom-tab').css('position', (db.length <= 2) ? 'absolute' : 'sticky')
    if (!localStorage.getItem('willdo.username')) {
        $('body #newUser').css('display', 'flex')
    } else {
        $('.profile-tab .username').text(get('willdo.username') || 'Anony')
    }
    if (db.length == 0) {
        $('.main-content').css('display', 'block');
        $('main.main-content').html(
            '<h1 style="display:block;width:100%;color:orange;text-align:center;clear:both">NO TASKS YET!! SO SAD!!</h1><h1 style="color:orange;font-size:8rem;text-align:center;"><i class ="mdi mdi-emoticon-frown"></i></h1><i style="text-align:center;color:orange;font-size:5rem;margin:auto;display:block;" class="mdi mdi-arrow-down-bold"></i>'
        );
        $('.sort-pane').hide();
    }
}

let userName = ` ${get('willdo.username')}`;
let greet = '';
setInterval(function() {
    let hour = new Date().getHours();
    greet = (hour >= 0 && hour < 12) ? 'Good Morning' : (hour >= 12 && hour < 16) ? 'Good Afternoon' : (hour >= 16 && hour < 19) ? 'Good Evening' : (hour >= 19 && hour <= 23) ? "Good Night" : 'Good Day';
    document.querySelector('.greet-pane #greeting').innerText = greet += userName;
}, 100);

$('.will-do-count').text(`total will-dos: ` + db.length);


function addNewUser(event) {
    event.preventDefault();
    let input = event.target.elements.username.value.trim();
    if (input && input.length >= 2) {
        input = input.split(' ')[0]
        store('willdo.username', input, false)
    } else {
        alert('Please Enter A valid Name With Atleast Two Characters')
    }
}

function store(key, value, stringify = false) {
    if (stringify) {
        localStorage.setItem(key, JSON.stringify(value))
        window.location.reload()
    } else {
        localStorage.setItem(key, value)
        window.location.reload();
    }
}

function get(key, parse = false) {
    return (parse) ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key);
}

function editUsername() {
    const text = "Pevious Username ==> ".toUpperCase() + get('willdo.username') + "\nENTER NEW USERNAME BELOW::";
    let newName = prompt(text).trim().split(' ')[0];
    if (newName && newName.length >= 2 && newName.length <= 16) {
        store('willdo.username', newName)
    }
}

function create(name, className = null) {
    let elem = document.createElement(name);
    elem.className = className;
    return elem
}

function createLI(name, id = null, className = null) {
    let elem = document.createElement(name);
    elem.id = id;
    elem.className = className;
    return elem
}

function append(parent, child) {
    parent.appendChild(child);
}

function build(obj, targetUl) {
    for (item of obj) {
        let id = item.id;
        let date = time_ago(item.date);
        let text = item.text;
        let importance = item.importance;

        let li = createLI('li', id, 'will-do');
        let div = create('div', 'top-tab');
        let div2 = create('div', 'timestamp');
        let i = create('i', 'mdi mdi-clock');
        let span = create('span', 'timestamp-txt');
        span.innerText = date;
        span.setAttribute('data-timestamp', item.date)
        let div3 = create('div', 'tools');
        let span2 = create('span', 'edit');
        let i2 = create('i', 'mdi mdi-pencil');
        let seperator = create('i', 'tool-seperator mdi mdi-octagon');
        let span3 = create('span', "delete");
        let i3 = create('i', 'mdi mdi-delete');
        let seperator2 = create('i', 'tool-seperator mdi mdi-octagon');
        let span4 = create('span', 'check');
        let i4 = create('i', 'mdi mdi-check-all');
        let div4 = create('div', 'will-do-txt');
        div4.innerText = text;
        let div5 = create('div', 'bottom-tab');
        let div6 = create('div', 'will-do-rating');
        div6.style = `--rating:${importance}`;
        let div7 = create('div', 'tools');
        let span5 = create('span', 'copy');
        let i5 = create('i', 'mdi mdi-content-copy');
        let span6 = create('span', 'full-view');
        let i6 = create('i', 'mdi mdi-chevron-double-down');


        append(li, div);
        append(div, div2);
        append(div2, i);
        append(div2, span);
        append(div, div3);
        append(div3, span2);
        append(span2, i2);
        append(div3, seperator);
        append(div3, span3);
        append(span3, i3);
        append(div3, seperator2);
        append(div3, span4);
        append(span4, i4);
        append(li, div4);
        append(li, div5);
        append(div5, div6);
        append(div5, div7);
        append(div7, span5);
        append(span5, i5);
        append(div7, span6);
        append(span6, i6);
        append(targetUl, li)


        span2.onclick = function() {
            var uid = li.id;
            let txt = prompt("Edit Text Below::", div4.innerText).trim()
            if (txt && txt.length >= 2) {
                for (det of db) {
                    if (det.id == uid) {
                        det.text = txt
                    }
                }
                store('willdo.db', db, true)
                location.reload();
            } else {
                while (!txt || txt.length < 2) {
                    let txt = prompt(`Sorry ${get('willdo.username')} You Must Enter At Least Two Characters...`).trim();
                    if (txt && txt.length >= 2) {
                        for (det of db) {
                            if (det.id == uid) {
                                det.text = txt
                            }
                        }
                        store('willdo.db', db, true);
                        break
                        location.reload();
                    }
                }
            }
        }

        span3.onclick = function() {
            let uid = li.id;
            let confirmDelete = confirm(`${get('willdo.username')}, Are You Sure You Want To Delete This Item?`);
            if (confirmDelete) {
                for (item of db) {
                    if (item.id == uid) {
                        dbTrash.push(item);
                        db.splice(db.indexOf(item), 1)
                        store('willdo.db', db, true);
                        store('willdo.trash', dbTrash, true);
                        location.reload();
                    }
                }
            }
        }

        span4.onclick = function() {
            let uid = li.id;
            for (item of db) {
                if (item.id == uid) {
                    dbCompleted.push(item);
                    db.splice(db.indexOf(item), 1)
                    store('willdo.db', db, true);
                    store('willdo.completed', dbCompleted, true);
                    alert("Congratulations For Completing Your Task!!")
                    location.reload();
                }
            }
        }

        span5.onclick = function() {
            var $temp = $('<input>');
            $('body').append($temp);
            $temp.val($(div4).text()).select()
            document.execCommand('copy', false, '');
            var $txt = $('<span id="copy-txt">Text Copied</span>')
            $(div5).append($txt);
            $(span5).css('visibility', 'hidden');
            $temp.remove();
            setTimeout(function() {
                $txt.remove();
                $(span5).css('visibility', 'visible');
            }, 1500)
        }
        span6.onclick = function() {
            let textWrap = div4;
            $(i6).toggleClass('mdi-rotate-180')
            if (textWrap.style.maxHeight == '100%') {
                $(textWrap).animate({ 'max-height': '4.9rem' });
            } else {
                $(textWrap).animate({ 'max-height': '100%' });
            }
        }


        if (item.text.length <= 142) {
            $(span6).css({ 'display': 'none' });
            $(div7).css('justify-content', 'space-evenly')
            $(div5).css('box-shadow', 'none')
        }
    }
}
var ul = document.getElementsByClassName('will-do-list')[0]

build(db, ul);

$('.adding-form').on('submit', (ev) => {
    ev.preventDefault();
    const txt = ev.target.elements.willdoTxt.value.trim();
    if (txt && txt.length >= 2) {
        db.push({
            id: `${Math.round(Math.random() * 10000000)}`,
            date: new Date().toGMTString(),
            text: txt,
            importance: document.querySelector('.rating input').value
        });
        store('willdo.db', db, true);
        location.reload();
    } else {
        alert(`${get('willdo.username')} You Must Enter At Least Two Characters!`)
    }
})

var $dropMenu = $('.drop-menu');

$(document).click((e) => {
    e.stopPropagation()
    if (!$dropMenu.is(e.target) && $dropMenu.has(e.target).length == 0) {
        $('.hamburger').removeClass('open');
        $dropMenu.hide();
        $('.drop-menu').removeClass('animated swing');
    }
})

$('.hamburger').on('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    $('.hamburger').toggleClass('open');
    $('.drop-menu').slideToggle();
    $('.drop-menu').toggleClass('animated swing');

})

function search(val) {
    let query = val.trim();
    let allLi = document.querySelectorAll('.will-do-list li.will-do');
    for (li of allLi) {
        if (!li.querySelector('.will-do-txt').innerText.startsWith(query)) {
            li.style.display = 'none';
        } else {
            li.style.display = 'inherit';
        }
    }
}

function wipeData() {
    let ensure = confirm(`${get('willdo.username')}, Are You Sure You Want To Wipe All Your Data??\nThis Includes Your: Username, Current Will-dos, Completed Will-dos, Deleted Will-dos\n\nClick Ok To Proceed...`);
    if (ensure) {
        store('willdo.db', [], true);
        store('willdo.trash', [], true);
        store('willdo.completed', [], true);
        localStorage.removeItem('willdo.username');
        alert('User Data Wiped Successfully!!')
        location.reload();
    } else {
        alert('Ok Enjoy The App!')
    }
}

$('#visitDone').on('click', () => {
    $('.will-do-list').html('');
    $('.sort-pane .mdi-home').show(100);
    $('.hamburger').removeClass('open');
    $dropMenu.hide();
    $('.drop-menu').removeClass('animated swing');
    $('.floating-bottom-tab').hide(800);
    $('.will-do-count').text(`total completed: ` + dbCompleted.length);
    $('.sort-pane button').hide(400)
    build(dbCompleted, ul);
    $('.tools').hide(400);
    clearInterval(interv)
    for (a of document.querySelectorAll('.timestamp-txt')) {
        let timestmp = $(a).text();
        $(a).text('Was Added: ' + timestmp)
    }
});

$('#visitTrash').on('click', () => {
    $('.will-do-list').html('');
    $('.sort-pane .mdi-home').show(100).toggleClass('animated shake');
    $('.hamburger').removeClass('open');
    $dropMenu.hide();
    $('.drop-menu').removeClass('animated swing');
    $('.floating-bottom-tab').hide(800);
    $('.will-do-count').text(`total deleted:` + dbTrash.length);
    $('.sort-pane button').hide(400)
    build(dbTrash, ul);
    $('.tools').hide(400);
    clearInterval(interv)
    for (b of document.querySelectorAll('.timestamp-txt')) {
        let timestmp = $(b).text();
        console.log(timestmp)
        $(b).text('Was Added: ' + timestmp)
    }
});

function showRate(val) {
    $('.rating #rate-value').css('--rating', val)
}

function checked() {
    let radios = document.querySelectorAll('.sort-menu > div');
    for (div of radios) {
        if (div.id == get('willdo.checked', false)) {
            div.querySelector('input').setAttribute('checked', 'checked')
        }
    }
}
checked();

function sort(key, check) {
    store('willdo.checked', check)
    store('willdo.sort', key)
    location.reload();
}

function time_ago(time) {

    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
        token = 'ago',
        list_choice = 1;

    if (seconds == 0) {
        return 'Just now'
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }
    var i = 0,
        format;
    while (format = time_formats[i++])
        if (seconds < format[0]) {
            if (typeof format[2] == 'string')
                return format[list_choice];
            else
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    return time;
}
let interv = setInterval(() => {
    let timeWrap = document.querySelectorAll('li .timestamp-txt');
    for (item of timeWrap) {
        $(item).text(time_ago($(item).attr('data-timestamp')))
    }
}, 100);