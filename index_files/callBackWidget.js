
function initCallBackWidget(params) {
    if (document.getElementById('qcb_con').innerHTML !== '') {
        return;
    }
    document.getElementById('qcb_con').innerHTML = '' +
        '<div id="qcb_phone_div" class="qcb-phone green show"> ' +
            '<div class="cbh-ph-circle"></div> ' +
            '<div class="cbh-ph-circle-fill"></div> ' +
            '<div class="cbh-ph-img-circle"></div>' +
        '</div>' +
        '<div id="qcb_div_ban" class="qcb_banner">' +
            //'<div id="qcb_exit" class="qcb_banner-exit"></div> ' +
            '<div class="qcb_banner-body">' +
                '<div id="cb_block-1" style="display:none;" class="cb_block"> <!-- с кнопки --> ' +
                '<div id="qcb_banner_h1" class="qcb_banner-h1">Введите ваш номер, и мы сразу перезвоним вам</div> ' +
            '</div> ' +
            '<div id="cb_block-2" style="display:none;" class="cb_block"> <!-- Нашли --> ' +
                '<div id="qcb_banner_h1" class="qcb_banner-h1">Супер! Хотите мы сейчас вам перезвоним и обсудим детали?</div> ' +
            '</div> ' +
            '<div id="cb_block-3" style="display:none;" class="cb_block"> <!-- Не нашли --> ' +
                '<div id="qcb_banner_h1" class="qcb_banner-h1">Хотите мы сейчас вам перезвоним и обсудим детали?</div>' +
            '</div>' +
            '<div id="cb_block-6" style="display:none;" class="cb_block"> <!-- Заяка отправлена --> ' +
                '<div class="qcb_banner-h1" id="qcb_banner_h1">Заявка успешно отправлена, ожидайте ответа!</div>' +
            '</div> ' +
            '<div id="cb_block-7" style="display:none;" class="cb_block"> <!-- Открывается при уводе мышь за пределы экрана --> ' +
                '<div class="qcb_banner-h1" id="qcb_banner_h1">Bы были у нас на сайте <span id="cb_min" ></span> мин. Вы нашли то, что искали?</div>' +
            '</div> ' +
            '<div class="qcb_banner-form-row-1" id="cb_cont-1" style="display:none;">' +
                '<div id="qcb_banner_content" class="qcb_banner-form"> ' +
                    //'<div class="qcb_banner-arrow"></div>' +
                    '<div id="qcb_phone_line" class="qcb_phone_line"> ' +
                            '<input name="cb_phone" maxlength="18" id="qcb_phone" class="qcb_banner-textbox" placeholder="+7"> ' +
                            '<button id="qcb_send" class="qcb_banner-button">жду звонка</button>' +
                    '</div>' +
                '</div>' +
            '</div> ' +
            '<div class="qcb_banner-form-row-1" id="cb_cont-2" style="display:none;">' +
                '<div id="qcb_banner_content" class="qcb_banner-form"> ' +
                    '<div> <button id="qcb_button_1" class="qcb_banner-button">Да!</button> <button id="qcb_button_2" class="qcb_banner-button">Нет</button> </div>' +
                '</div>' +
            '</div> ' +
            '<div class="qcb_banner-form-row-2">  ' +
                '<span id="qcb_stat" class="cb_podpis-3" style="display:none;">Мы искренне ценим вас. Нам важно ваше мнение, чтобы стать лучше.</span>' +
            '</div>' +
        '</div> ' +
        '</div>' +
        '<div id="qcb_banner_bg" class="qcb_banner_bg"></div>';
    document.getElementById('qcb_phone').onfocus = function (event) {
        checkNumberPhone();
    };
    document.getElementById('qcb_phone').onblur = function (event) {
        if (buf.substr(4).indexOf('_') !== -1)
            document.getElementById('qcb_phone').value = '';
    };
    document.getElementById('qcb_send').onclick = function () {
        if (document.getElementById('qcb_phone').value == '') {
            checkNumberPhone();
            alert('Пожалуйста, заполните поле');
            return false;
        }
        var callbackAfterSuccess = function () {
            getClass('cb_block', null, null, 'display', 'none');
            getClass('qcb_banner-form-row-1', null, null, 'display', 'none');
            getClass('qcb_banner-form-row-2', null, null, 'display', 'none');
            document.getElementById('cb_block-6').style.display = 'block';
            document.getElementById('timeReady').setAttribute("alt", '2');
        }
        params.callbackFunction(document.getElementById('qcb_phone').value, callbackAfterSuccess);
    };
    document.getElementById('qcb_button_1').onclick = function () {
        getClass('cb_block', null, null, 'display', 'none');
        document.getElementById('cb_block-2').style.display = 'block';
        getClass('qcb_banner-form-row-1', null, null, 'display', 'none');
        document.getElementById('cb_cont-1').style.display = 'block';
        setStyleById('qcb_stat', null, 'span', 'display', 'none');
        getClass('cb_podpis-1', null, null, 'display', 'block');
        document.getElementsByName('cb_id')[0].value = '2';
    };

    document.getElementById('qcb_button_2').onclick = function () {
        $('.cb_block').css('display', 'none');
        getClass('cb_block', null, null, 'display', 'none');
        document.getElementById('cb_block-3').style.display = 'block';
        getClass('qcb_banner-form-row-1', null, null, 'display', 'none');
        document.getElementById('cb_cont-1').style.display = 'block';
        setStyleById('qcb_stat', null, 'span', 'display', 'none');
        getClass('cb_podpis-1', null, null, 'display', 'block');
    };
    document.getElementById('qcb_phone_div').onclick = function () {
        getClass('qcb_banner', null, null, 'display', 'block');
        getClass('qcb_banner_bg', null, null, 'display', 'block');
        document.getElementById('qcb_phone_div').style.display = 'none';
        getClass('cb_block', null, null, 'display', 'none');
        document.getElementById('cb_block-1').style.display = 'block';
        getClass('qcb_banner-form-row-1', null, null, 'display', 'none');
        document.getElementById('cb_cont-1').style.display = 'block';
        setStyleById('qcb_stat', null, 'span', 'display', 'none');
        getClass('cb_podpis-1', null, null, 'display', 'block');
    };
    document.getElementById('qcb_phone').onkeypress = function(e){
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13'){
            $('#qcb_send')[0].click();
            return false;
        }
    };
    document.getElementById('qcb_banner_bg').onclick = function () {
        getClass('qcb_banner', null, null, 'display', 'none');
        getClass('qcb_banner_bg', null, null, 'display', 'none');
        document.getElementById('qcb_phone_div').style.display = 'block';
    };
    document.getElementById('qcb_phone_div').style.top = (height - 190) + "px";
    document.getElementById('qcb_phone_div').style.left = (width - 190) + "px";
    div = document.createElement('div');
    div.id = 'timeReady';
    div.style.display = 'none';
    div.setAttribute('alt', '1');
    div.innerHTML = timeReady;
    document.body.appendChild(div);

    if (params.showDialogOnLeave) {
        document.body.onmouseout = handleMouseleave(function (e) {// вывод курсоса за пределы <body>
            var tmp2 = new Date();
            var timeNow = tmp2.getTime();
            //var timeR = $('#timeReady').text();
            var timeR = document.getElementById('timeReady').innerHTML;
            // var mFlag = $('#timeReady').attr("alt"); // информация об отправленных заявках
            var mFlag = document.getElementById('timeReady').getAttribute("alt"); // информация об отправленных заявках
            var timeSec = timeNow - timeR; // считаем сколько времени прошло между загрузкой страницы и когда курсор выб выведен
            /*alert (fdgd + '///' + mFlag);*/

            if (5000 < (timeNow - timeR) & mFlag == 1) { // если прошло прошло боле 5 секунд и заявка еще не отправлялась
                //$('.qcb_banner').css('display', 'block');
                getClass('qcb_banner', null, null, 'display', 'block');
                // $('.qcb_banner_bg').css('display', 'block');
                getClass('qcb_banner_bg', null, null, 'display', 'block');
                // $('#qcb_phone_div').css('display', 'none');
                document.getElementById('qcb_phone_div').style.display = 'none';
                //$('#timeReady').attr("alt", "2");
                document.getElementById('timeReady').setAttribute("alt", '2');
                //$('.cb_block').css('display', 'none');
                getClass('cb_block', null, null, 'display', 'none');
                //  $('#cb_block-7').css('display', 'block');
                document.getElementById('cb_block-7').style.display = 'block';
                // $('.qcb_banner-form-row-1').css('display', 'none');
                getClass('qcb_banner-form-row-1', null, null, 'display', 'none');
                //$('#cb_cont-2').css('display', 'block');
                document.getElementById('cb_cont-2').style.display = 'block';
                //$('span[id=qcb_stat]').css('display', 'none');
                setStyleById('qcb_stat', null, 'span', 'display', 'none');
                // $('.cb_podpis-3').css('display', 'block');
                getClass('cb_podpis-3', null, null, 'display', 'block');
                var timeMin = Math.ceil(timeSec / 1000 / 60); // кол-во минут прошедших с даты загрузки страницы
                // $('#cb_min').text(timeMin);
                document.getElementById('cb_min').innerHTML = timeMin;
            }
        });
    }
}


var arr = new Array(0, 1, 2, 3, 7, 8, 12, 15);

function s(n) {
    var arr = [0, 1, 2, 3, 7, 8, 12, 15];
    while (arr.indexOf(n) !== -1) {
        n++;
    }
    return n;
}
function s2(n) {
    var arr = [0, 1, 2, 3, 7, 8, 12, 15];
    while (arr.indexOf(n) !== -1) {
        n--;
    }
    return n;
}


function move(str, start, to) {
    len = to + start;
    str = str.split("");
    for (i = len; i > start;) {
        next = s2(i - 1);
        //alert(next);
        str[i] = str[next];
        i = next;
    }
    str = str.join("");
    return str;
}
function movedelete(str, start) {
    len = str.length;

    str = str.split("");
    for (i = start; i < len - 1;) {
        next = s(i + 1);
        //alert(next);
        str[i] = str[next];
        i = next;
    }
    if (start != len)str[len - 1] = '_';
    str = str.join("");

    return str;
}


function getCursorPosition(ctrl) {
    var CaretPos = 0;
    if (document.selection) {
        ctrl.focus();
        var Sel = document.selection.createRange();
        Sel.moveStart('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    } else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
        CaretPos = ctrl.selectionStart;
    }
    return CaretPos;
}

var tmp = new Date();
var timeReady = tmp.getTime();


function handleMouseleave(handler) {
    return function (e) {
        e = e || event; // IE
        var toElement = e.relatedTarget || e.toElement; // IE
        while (toElement && toElement !== this) {
            toElement = toElement.parentNode;
        }
        if (toElement == this) { // да, внутри
            return; // значит мы перешли с родителя на потомка, лишнее событие
        }
        return handler.call(this, e);
    };
}


function getClass(theClass, node, tag, stl, ord) {
    if (node == null) node = document;
    if (tag == null) tag = '*';
    var allTags = node.getElementsByTagName(tag);
    for (i = 0; i < allTags.length; i++) {
        if (allTags[i].className == theClass) {
            eval('allTags[i].style.' + stl + '=ord');
        }
    }
}
function setStyleById(id, node, tag, stl, ord) {
    if (node == null) node = document;
    if (tag == null) tag = '*';
    var allTags = node.getElementsByTagName(tag);
    for (i = 0; i < allTags.length; i++) {
        if (allTags[i].id == id) {
            eval('allTags[i].style.' + stl + '=ord');
        }
    }
}


function cwbutton() {
    getClass('qcb_banner', null, null, 'display', 'block');
    getClass('qcb_banner_bg', null, null, 'display', 'block');
    document.getElementById('qcb_phone_div').style.display = 'none';
    getClass('cb_block', null, null, 'display', 'none');
    document.getElementById('cb_block-1').style.display = 'block';
    getClass('qcb_banner-form-row-1', null, null, 'display', 'none');
    document.getElementById('cb_cont-1').style.display = 'block';
    setStyleById('qcb_stat', null, 'span', 'display', 'none');
    getClass('cb_podpis-1', null, null, 'display', 'block');
    document.getElementsByName('cb_id')[0].value = '1';
}


function getPageSize() {
    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight) { // Explorer 6 strict mode
        xScroll = document.documentElement.scrollWidth;
        yScroll = document.documentElement.scrollHeight;
    } else { // Explorer Mac...would also work in Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }

    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }

    return [pageWidth, pageHeight, windowWidth, windowHeight];
}
arr = getPageSize();

var height = arr[3];
var width = arr[2];

if (width < 1024) {
    getClass('qcb_banner_bg', null, null, 'width', '1024px');
}
else {
    getClass('qcb_banner_bg', null, null, 'width', '100%');
}


window.onresize = function () {
    arr = getPageSize();
    var height = arr[3];
    var width = arr[2];
    if (width < 1024) {
        getClass('bg', null, null, 'width', '1024px');
    }
    else {
        getClass('bg', null, null, 'width', '100%');
    }
    document.getElementById('qcb_phone_div').style.top = (height - 190) + "px";
    document.getElementById('qcb_phone_div').style.left = (width - 190) + "px";
} 