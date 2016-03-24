function initForm(baseId, params) {

    var qnitsForm = (function (formId, params) {
        (function (formId) {

            var form;
            var errors = [];
            var isProcessing = false;
            var startTimeSpent;
            var partnerCounter;

            var createCallBackOrderFunction = function (phone_number, callback) {
                var form = {
                    name: 'Заказ обратного звонка',
                    phone: phone_number,
                    params: $('#' + formId + '_params').val()
                };
                return submitFormRequest(form, false, callback);
            };

            function checkQJuery(callback) {
                if (typeof jQuery == 'undefined') {
                    if (typeof $ == 'function') {
                        // warning, global var
                        thisPageUsingOtherJSLibrary = true;
                    }
                    function getScript(url, success) {
                        var script = document.createElement('script');
                        script.src = url;
                        var head = document.getElementsByTagName('head')[0],
                            done = false;
                        // Attach handlers for all browsers
                        script.onload = script.onreadystatechange = function () {
                            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                                done = true;
                                // callback function provided as param
                                success();
                                script.onload = script.onreadystatechange = null;
                                head.removeChild(script);
                            }
                            ;
                        };
                        head.appendChild(script);
                    };
                    getScript('https://code.jquery.com/jquery-1.11.2.min.js', function () {
                        callback();
                    });
                } else {
                    callback();
                }
            }

            function init() {
                $(document).ready(function () {
                    startTimeSpent = new Date().getTime();
                    $(window).unload(function () {
                        var endTime = new Date().getTime();
                        var timeSpent = Math.round((endTime - startTimeSpent) / 1000);
                        var timeSpentOld = getCookie('qTimeSpent');
                        if (timeSpentOld !== undefined) {
                            timeSpent = timeSpent + parseInt(timeSpentOld);
                        }
                        setCookie('qTimeSpent', timeSpent, 1);
                    });
                });

                if (window['qym'] == undefined) {
                    window['qym'] = [];
                }
                form = document.getElementById(formId);
                $('#' + formId).submit(function (event) {
                    onSubmitCallback(event);
                });
                if (getCookie('q_metrika_counter') !== undefined) {
                    registerYandexMetrikaCounter(getCookie('q_metrika_counter'));
                }
                if (getCookie('q_qnits_metrika') !== undefined && !params.disableQnitsCounter) {
                    registerYandexMetrikaCounter(getCookie('q_qnits_metrika'));
                }
                if ($('meta[name=qnits]').length == 0) {
                    statUniq();
                }
                if (params.useCallBackWidget) {
                    initCallBackWidget({
                        showDialogOnLeave: params.showCallbackDialogOnLeave,
                        callbackFunction: createCallBackOrderFunction
                    });
                }
            }

            function statUniq() {
                var requestParams = {};
                location.search.substr(1).split("&").forEach(function (item) {
                    requestParams[item.split("=")[0]] = item.split("=")[1]
                });
                if (requestParams.lnk !== undefined) {
                    if (getCookie('q_lnk') != requestParams.lnk) {
                        setCookie('q_lnk', requestParams.lnk, 7);
                    }
                }
                if (getCookie('q_host_id') !== undefined) {
                    return true;
                } else {
                    setCookie('q_host_id', 'processing', 1);
                }
                if (requestParams.utm_source !== undefined) {
                    if (getCookie('q_utm_source') === undefined) {
                        setCookie('q_utm_source', requestParams.utm_source, 7);
                    }
                }
                if (requestParams.utm_medium !== undefined) {
                    if (getCookie('q_utm_medium') === undefined) {
                        setCookie('q_utm_medium', requestParams.utm_medium, 7);
                    }
                }
                if (requestParams.utm_campaign !== undefined) {
                    if (getCookie('q_utm_campaign') === undefined) {
                        setCookie('q_utm_campaign', requestParams.utm_campaign, 7);
                    }
                }
                if (requestParams.utm_term !== undefined) {
                    if (getCookie('q_utm_term') === undefined) {
                        setCookie('q_utm_term', requestParams.utm_term, 7);
                    }
                }
                if (requestParams.utm_content !== undefined) {
                    if (getCookie('q_utm_content') === undefined) {
                        setCookie('q_utm_content', requestParams.utm_content, 7);
                    }
                }
                var handle201 = function (data, textStatus, jqXHR) {
                    var responseObject = JSON.parse(data.responseText);
                    if (responseObject.status == 'OK') {
                        setCookie('q_host_id', responseObject.host_id, 1);
                        if (responseObject.metrika_counter > 0) {
                            partnerCounter = responseObject.metrika_counter;
                        } else {
                            if (params.yaCounter !== undefined) {
                                partnerCounter = params.yaCounter;
                            }
                        }
                        if(partnerCounter !== undefined){
                            setCookie('q_metrika_counter', partnerCounter, 1);
                            registerYandexMetrikaCounter(partnerCounter);
                        }
                        if (responseObject.qnits_metrika > 0 && !params.disableQnitsCounter) {
                            setCookie('q_qnits_metrika', responseObject.qnits_metrika, 1);
                            registerYandexMetrikaCounter(responseObject.qnits_metrika);
                        }
                    }
                };
                var handle400 = function (data, textStatus, jqXHR) {
                    setCookie('q_host_id', undefined, -10);
                };
                var statRequestParams = new Object();
                statRequestParams.formParams = encodeURIComponent($('#' + formId + "_params").val());
                statRequestParams.lnk = (getCookie('q_lnk'));
                statRequestParams.userAgent = encodeURIComponent(navigator.userAgent);
                utmParams = new Object();
                utmParams.utm_source = (getCookie('q_utm_source'));
                utmParams.utm_medium = (getCookie('q_utm_medium'));
                utmParams.utm_campaign = (getCookie('q_utm_campaign'));
                utmParams.utm_term = (getCookie('q_utm_term'));
                utmParams.utm_content = (getCookie('q_utm_content'));
                statRequestParams.utmParams = utmParams;
                var request = $.ajax({
                    url: getStatUrl(),
                    type: "POST",
                    method: "POST",
                    data: JSON.stringify(statRequestParams),
                    dataType: "application/json",
                    statusCode: {
                        201: handle201
                    }
                });
                return true;
            }

            function registerYandexMetrikaCounter(counter_id) {
                if (window['qym'][counter_id] == undefined) {
                    window['qym'][counter_id] = 'ok';
                    console.log('reg ' + counter_id);
                    $(document).on('yacounter' + counter_id + 'inited', function () {
                        console.log('yacounter' + counter_id + 'inited');
                        if (getRegisterMetrikaBehaviorEventAvailable(counter_id, 'mmove')) {
                            $(window).bind('mousemove', function () {
                                reachGoalAndRemember(counter_id, 'mmove', window['yaCounter' + counter_id])
                            })
                        }
                        if (getRegisterMetrikaBehaviorEventAvailable(counter_id, 'pscroll')) {
                            $(window).bind('scroll', function () {
                                reachGoalAndRemember(counter_id, 'pscroll', window['yaCounter' + counter_id])
                            })
                        }
                        registerVisitTimeGoal(counter_id, '15sec', 15);
                        registerVisitTimeGoal(counter_id, '30sec', 30);
                        registerVisitTimeGoal(counter_id, '1min', 60);
                        registerVisitTimeGoal(counter_id, '2min', 120);
                        registerVisitTimeGoal(counter_id, '3min', 180);
                        registerVisitTimeGoal(counter_id, '4min', 240);
                        registerVisitTimeGoal(counter_id, '5min', 300);
                        registerVisitTimeGoal(counter_id, '15min', 900);
                    });
                    (function (d, w, c) {
                        (w[c] = w[c] || []).push(function () {
                            try {
                                w["yaCounter" + counter_id] = new Ya.Metrika({
                                    id: counter_id,
                                    webvisor: true,
                                    clickmap: true,
                                    trackLinks: true,
                                    accurateTrackBounce: true,
                                    trackHash: true,
                                    triggerEvent:true,
                                    ut: 0
                                });
                            } catch (e) {
                            }
                        });

                        var n = d.getElementsByTagName("script")[0],
                            s = d.createElement("script"),
                            f = function () {
                                n.parentNode.insertBefore(s, n);
                            };
                        s.type = "text/javascript";
                        s.async = true;
                        s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

                        if (w.opera == "[object Opera]") {
                            d.addEventListener("DOMContentLoaded", f, false);
                        } else {
                            f();
                        }
                    })(document, window, "yandex_metrika_callbacks");
                } else {
                    console.log('already ' + counter_id);
                }
            }

            function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            }

            function getCookie(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                }
                return undefined;
            }

            function getRegisterMetrikaBehaviorEventAvailable(counterId, goalName) {
                if (getCookie('qGoal-' + goalName + '-' + counterId) === undefined) {
                    return true;
                } else {
                    return false;
                }
            }

            function reachGoalAndRemember(counterId, goalName, counter) {
                if (getCookie('qGoal-' + goalName + '-' + counterId) === undefined) {
                    setCookie('qGoal-' + goalName + '-' + counterId, 1, 1)
                    counter.reachGoal(goalName, null, function () {
                        console.log(goalName + '-' + counterId + ' throwed');
                    });
                }
            }

            function getMetrikaLastTimeSpent() {
                var timeSpent = getCookie('qTimeSpent');
                if (timeSpent === undefined) {
                    return 0;
                } else {
                    return timeSpent;
                }
            }

            function registerVisitTimeGoal(counterId, eventName, secondsToFire) {
                qts = getMetrikaLastTimeSpent();
                if (qts < secondsToFire) {
                    if (getRegisterMetrikaBehaviorEventAvailable(counterId, eventName)) {
                        setTimeout(function () {
                            reachGoalAndRemember(counterId, eventName, window['yaCounter' + counterId]);
                        }, (secondsToFire - qts) * 1000);
                    }
                }
            }

            function getStatUrl() {
                return 'http://api.qnits.ru/api/stat';
            }

            function getFormSubmitUrl() {
                return 'http://api.qnits.ru/api/buyFormSubmit'
            }

            function str_replace(search, replace, subject) {
                return subject.split(search).join(replace);
            }

            function startProcessing() {
                isProcessing = true;
                $('#' + formId + '_submit').prop('disabled', true);
                $('#' + formId + '_qf_loader').show();
            }

            function stopProcessing() {
                isProcessing = false;
                $('#' + formId + '_submit').prop('disabled', false);
                $('#' + formId + '_qf_loader').hide();
            }

            function submitForm() {
                var formElements = new Object();
                for (var numEl = 0; numEl < form.elements.length; numEl++) {
                    var element = form.elements[numEl];
                    var type = element.getAttribute('type');
                    var name = element.getAttribute('name');
                    var runame = element.getAttribute('runame');
                    if (type == 'submit' || type == 'button') {
                        continue;
                    }
                    formElements[name] = encodeURIComponent(element.value.trim());
                }
                submitFormRequest(formElements)
            }

            function submitFormRequest(formElements, useRedirectAfterOrderCreate, successCallback, failCallBack) {
                if (typeof(useRedirectAfterOrderCreate) === 'undefined') {
                    useRedirectAfterOrderCreate = true;
                }
                formElements.visitorParams = new Object();
                formElements.visitorParams.lnk = (getCookie('q_lnk'));
                formElements.visitorParams.utm_source = (getCookie('q_utm_source'));
                formElements.visitorParams.utm_medium = (getCookie('q_utm_medium'));
                formElements.visitorParams.utm_campaign = (getCookie('q_utm_campaign'));
                formElements.visitorParams.utm_content = (getCookie('q_utm_content'));
                formElements.visitorParams.utm_term = (getCookie('q_utm_term'));
                var handle400 = function (data, textStatus, jqXHR) {
                    errors = [];
                    stopProcessing();
                    var errorObject = JSON.parse(data.responseText);
                    for (var propertyName in errorObject.errors) {
                        if (errorObject.errors.hasOwnProperty(propertyName)) {
                            var formElement = document.getElementById(formId + '_' + propertyName);
                            var runame='';
                            if(formElement !== null){
                                runame = formElement.getAttribute('runame');
                            }
                            if(typeof errorObject.errors[propertyName] == "object"){
                                errorObject.errors[propertyName].forEach(function (error, error_index, parent_array) {
                                    error = str_replace(', или введите email для связи', '', error); // форма не поддерживает ввод email
                                    errors.push('"' + runame + '" ' + error);
                                });
                            }else{
                                var error = errorObject.errors[propertyName];
                                if(error.indexOf('недоступен для продаж') != -1){
                                    error = 'Данная модель закончилась';
                                }
                                errors.push(error);
                            }

                        }
                    }
                    alert(errors.join("\r\n"));
                    if (failCallBack != undefined) {
                        failCallBack();
                    }
                };

                var handle201 = function (data, textStatus, jqXHR) {
                    stopProcessing();
                    var responseObject = JSON.parse(data.responseText);
                    if (responseObject.status == 'OK') {

                        if ((typeof partnerCounter !== 'undefined') && (partnerCounter > 0)) {
                            var yaCC = window['yaCounter' + partnerCounter];
                            if ((typeof yaCC !== 'undefined')) {
                                yaCC.reachGoal("OrderConversion", {order_id: responseObject.order_id}, function () {
                                    afterHandle201(this.ro, this.ru, this.uraoc);
                                }, {ro: responseObject, ru: params.redirectUrl, uraoc: useRedirectAfterOrderCreate});
                            } else {
                                console.log("Не удалось найти счетчик yaCounter" + params.yaCounter + " на странице, поэтому конверсия не учтется. Убедитесь что счетчик установлен, и что номер счетчика в генераторе формы передачи заказов был указан верно.");
                                afterHandle201(responseObject, params.redirectUrl, useRedirectAfterOrderCreate);
                            }
                        } else {
                            afterHandle201(responseObject, params.redirectUrl, useRedirectAfterOrderCreate);
                        }
                        if (successCallback != undefined) {
                            successCallback();
                        }
                    }
                };
                var request = $.ajax({
                    url: getFormSubmitUrl(),
                    type: "POST",
                    method: "POST",
                    data: JSON.stringify(formElements),
                    dataType: "application/json",
                    statusCode: {
                        201: handle201,
                        400: handle400
                    }
                });
            }

            function onSubmitCallback(event) {
                event.preventDefault();
                if (isProcessing) {
                    return;
                }
                startProcessing();
                clientValidation();
                if (errors.length > 0) {
                    alert(errors.join("\r\n"));
                    stopProcessing();
                    return;
                }
                submitForm();
            }

            function afterHandle201(responseObject, redirectURL, useRedirectAfterOrderCreate) {
                if (useRedirectAfterOrderCreate) {
                    if (redirectURL != undefined && redirectURL.length > 0) {

                        // подстановка
                        redirectURL = redirectURL.replace(/#QNITS_ORDER_URL#/g, responseObject.common_order_url); // = "прошел еще прошел"

                        location.replace(redirectURL);
                    } else {
                        location.replace(responseObject.common_order_url);
                    }
                }
            }

            function clientValidation() {
                errors = [];
                for (var numEl = 0; numEl < form.elements.length; numEl++) {
                    var element = form.elements[numEl];
                    var type = element.getAttribute('type');
                    var name = element.getAttribute('name');
                    var required = element.getAttribute('field_required');
                    var runame = element.getAttribute('runame');
                    if (type == 'submit' || type == 'button' || required == 0) {
                        continue;
                    }
                    if (element.value == '') {
                        errors.push('"' + runame + '" не должен быть пустым');
                    }
                }
            }

            checkQJuery(function () {
                init();
            });

        })
        (formId, params);
    }(baseId, params));
}



