getHeader =(name) => {
    const nameEQ = encodeURIComponent(name) + "=";
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        
        // Trim leading whitespace
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        
        // Check if the cookie starts with the name
        if (cookie.indexOf(nameEQ) === 0) {
            // Return the cookie value
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    // Return null if the cookie is not found
    return null;
}


$('document').ready(function () {
    $('.view_All_Search').click(function (e) {
        e.preventDefault();
        const input = $('#ember650').val();
        if (input == "") {
            return false;
        }
        fetch(root_url + `api/collect?action=search&v1=true&query=` + encodeURIComponent(input) + '', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getHeader('token'),
                'Content-Type': 'application/json'
            }
        }).then((response) => { 
            if (response.status==200) {
                $.ajax({
                    url: root_url + `api/collect?action=search&v1=true&query=` + input + '',
                    type: "GET",
                    crossDomain: true,
                    dataType: 'html',
                    crossOrigin: true,
                    async: true,
                    cache: false,
                    processData: true,
                    headers: {
                        'Authorization': 'Bearer ' +getHeader('token') + '',
                    }
                }).then((data) => { 
                    const subject_span = document.getElementById('subj_holder');
                    if (window.innerWidth > 1025) {
                        if (subject_span.classList.contains('visibility-hidden')) {
                            subject_span.classList.remove('visibility-hidden');
                            //$('#browser_hf').show();
                        }
                    }
                    else {
                        if (!subject_span.classList.contains('visibility-hidden')) {
                            subject_span.classList.add('visibility-hidden');
                            //$('#browser_hf').hide();
                        }
                    }
                    $('#ember1178').hide();
                    $('.clearer').show();
                    $('.clone_result').removeClass('subjects-search-container').addClass("subjects-search-container complete")
                    $('#search_result').empty();
                    $('#search_result').append(data);
                })
            } else {
                $('#ember1178').hide();
                $('.clearer').show();
                $('.clone_result').removeClass('subjects-search-container').addClass("subjects-search-container complete")
                $('#search_result').empty();
                $('#search_result').append('<div class="error-search"><li tabindex="0" class="no-results-container in-progress" style="display:block"><span class="label">No matches for “' + input.value + '”. Title may not be SkyBase Data Center enabled at this time, but still available at your library. <br/><a tabindex="0" href="javascript:void(0)" target="_new">Please click here to search for your title again at your library</a></span></li></div>');
            }
        })
       
    });

    $('#subject_active').click(function (p) {
        p.preventDefault();
        const input = $('#ember650').val();
        if (input === "") {
            return false;
        }
        fetch(root_url + `api/collect?action=search&v1=true&query=` + encodeURIComponent(input) + '', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getHeader('token'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status == 200) {
                $.ajax({
                    url: root_url + `api/collect?action=subjects&v1=true&filter=subjectsOnly&query=` + input + '',
                    type: "GET",
                    crossDomain: true,
                    dataType: 'html',
                    crossOrigin: true,
                    async: true,
                    cache: false,
                    processData: true,
                    headers: {
                        'Authorization': 'Bearer ' + getHeader('token') + '',
                    }
                }).then((data) => {
                    const subject_span = document.getElementById('subj_holder');
                    if (window.innerWidth > 1025) {
                        if (subject_span.classList.contains('visibility-hidden')) {
                            subject_span.classList.remove('visibility-hidden');
                            //$('#browser_hf').show();
                        }
                    }
                    else {
                        if (!subject_span.classList.contains('visibility-hidden')) {
                            subject_span.classList.add('visibility-hidden');
                            //$('#browser_hf').hide();
                        }
                    }
                    $('#ember1178').hide();
                    $('.clearer').show();
                    $('.clone_result').removeClass('subjects-search-container').addClass("subjects-search-container complete")
                    $('#search_result').empty();
                    $('#search_result').append(data);
                })
            } else {
                $('#ember1178').hide();
                $('.clearer').show();
                $('.clone_result').removeClass('subjects-search-container').addClass("subjects-search-container complete")
                $('#search_result').empty();
                $('#search_result').append('<div class="error-search"><li tabindex="0" class="no-results-container in-progress" style="display:block"><span class="label">No matches for “' + input.value + '”. Title may not be SkyBase Data Center enabled at this time, but still available at your library. <br/><a tabindex="0" href="javascript:void(0)" target="_new">Please click here to search for your title again at your library</a></span></li></div>');
            }
        
        });
    });

    $('#journal_active').click(function (p) {
        p.preventDefault();
        const input = $('#ember650').val();
        if (input === "") {
            return false;
        }
        fetch(root_url + `api/collect?action=search&v1=true&query=` + encodeURIComponent(input) + '', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getHeader('token'),
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status == 200) {
                $.ajax({
                    url: root_url + `api/collect?action=journals&v1=true&filter=journalsOnly&query=` + input + '',
                    type: "GET",
                    crossDomain: true,
                    dataType: 'html',
                    crossOrigin: true,
                    async: true,
                    cache: false,
                    processData: true,
                    headers: {
                        'Authorization': 'Bearer ' + getHeader('token') + '',
                    }
                }).then((data) => {
                    const subject_span = document.getElementById('subj_holder');
                    if (window.innerWidth > 1025) {
                        if (subject_span.classList.contains('visibility-hidden')) {
                            subject_span.classList.remove('visibility-hidden');
                            //$('#browser_hf').show();
                        }
                    }
                    else {
                        if (!subject_span.classList.contains('visibility-hidden')) {
                            subject_span.classList.add('visibility-hidden');
                            //$('#browser_hf').hide();
                        }
                    }
                    $('#ember1178').hide();
                    $('.clearer').show();
                    $('.clone_result').removeClass('subjects-search-container').addClass("subjects-search-container complete")
                    $('#search_result').empty();
                    $('#search_result').append(data);
                })
            } else {
                $('#ember1178').hide();
                $('.clearer').show();
                $('.clone_result').removeClass('subjects-search-container').addClass("subjects-search-container complete")
                $('#search_result').empty();
                $('#search_result').append('<div class="error-search"><li tabindex="0" class="no-results-container in-progress" style="display:block"><span class="label">No matches for “' + input.value + '”. Title may not be SkyBase Data Center enabled at this time, but still available at your library. <br/><a tabindex="0" href="javascript:void(0)" target="_new">Please click here to search for your title again at your library</a></span></li></div>');
            }
        });
    });
});




function wayfinderHosted() {
    var Q = 'bootstrap', R = 'begin', S = 'gwt.codesvr.wayfinderHosted=', T = 'gwt.codesvr=', U = 'wayfinderHosted',
        V = 'startup',
        W = 'DUMMY',
        X = 0,
        Y = 1,
        Z = 'iframe',
        $ = 'position:absolute; width:0; height:0; border:none; left: -1000px;', _ = ' top: -1000px;',
        ab = 'aria-hidden',
        bb = 'true',
        cb = 'Wayfinder script', db = 'CSS1Compat',
        eb = '<!doctype html>', fb = '', gb = '<html><head><\/head><body><\/body><\/html>',
        hb = 'undefined', ib = 'readystatechange', jb = 10, kb = 'Chrome', lb = 'eval("', mb = '");',
        nb = 'script', ob = 'javascript', pb = 'moduleStartup', qb = 'moduleRequested',
        rb = 'Failed to load ', sb = 'head', tb = 'meta', ub = 'name',
        vb = 'wayfinderHosted::', wb = '::', xb = 'gwt:property',
        yb = 'content', zb = '=', Ab = 'gwt:onPropertyErrorFn',
        Bb = 'Bad handler "', Cb = '" for "gwt:onPropertyErrorFn"',
        Db = 'gwt:onLoadErrorFn', Eb = '" for "gwt:onLoadErrorFn"',
        Fb = '#', Gb = '?', Hb = '/', Ib = 'img', Jb = 'clear.cache.gif', Kb = 'baseUrl',
        Lb = 'wayfinderHosted.nocache.js', Mb = 'base', Nb = '//',
        Ob = 'locale', Pb = 'en_GB', Qb = 'locale=', Rb = 7, Sb = '&',
        Tb = '__gwt_Locale', Ub = '_', Vb = 'Unexpected exception in locale detection, using default: ',
        Wb = 2, Xb = 3, Yb = 4, Zb = 5, $b = 6, _b = 8, ac = 9, bc = 11, cc = 12, dc = 13, ec = 14,
        fc = 15, gc = 16, hc = 17, ic = 18, jc = 19, kc = 20, lc = 21, mc = 22, nc = 23, oc = 24, pc = 25, qc = 26,
        rc = 27, sc = 28, tc = 29, uc = 'user.agent', vc = 'webkit', wc = 'safari', xc = 'msie',
        yc = 'ie10', zc = 'ie9', Ac = 'ie8', Bc = 'gecko', Cc = 'gecko1_8', Dc = 'selectingPermutation',
        Ec = 'wayfinderHosted.devmode.js', Fc = 'pl_PL',
        Gc = '00EFB16BBE92D46283FF59A2CB459779', Hc = 'bg',
        Ic = '05F2B27EEB618805555A79891B501793', Jc = 'it_IT', Kc = '0936C8326AA0597D77E1A5B32FE8984C',
        Lc = 'zh', Mc = '0CEE8EFCAED15FE90761BB315F2191D6', Nc = 'pl', Oc = '0FAA2BFA7677F73B104A71E51B4FF87D',
        Pc = 'bg_BG', Qc = '0FF8C71E5E1D4738919608008F839FD4', Rc = '1A2AC94F14B4AC708FC22BAE2BDEE589',
        Sc = 'ru_RU', Tc = '1AE7842D9388F5CDEEBF1CFC07D4D997', Uc = 'default', Vc = '1BF43648F675AAE8167988F5AD3B805B',
        Wc = 'de', Xc = '1DE583791DE887376975D80B88298B3B', Yc = 'en', Zc = '20F5CE6B9BE2C185CE3CEDA23031B812',
        $c = 'ru', _c = '22FA418FEA75D19D95E4520D21793F39', ad = '2417DC264E7B37F1A17A0B9C29ADD8BB', bd = 'pt_PT',
        cd = '2496DED74325A56891761A4E63791006', dd = 'zh_TW', ed = '272732A6BB8D0DB2577AC1A82FA9EB19',
        fd = '2899EAD818B57D04D215FB6308969986', gd = 'nl_NL', hd = '2AC2C57313D68393D1D1ACD6D80521F5',
        jd = 'pt_BR', kd = '2B2D64AE87978DB823A0884E5AD2F59B', ld = '2E96D4BF258120042A89A4F53C6AC24A',
        md = 'ar', nd = '3CC3B97771997B4587F99F295D19DF78', od = 'nl', pd = '40264F388BEB23B1FC3194796C16EA3D',
        qd = '41CE943C948B110A4D8014DD0D2D30C3', rd = '459A2220A0BF4E04ABB5DB1054F96CFA',
        sd = 'ar_AR', td = '47FD4E1A34BCE9138FDA77C949A2A80A', ud = 'pt', vd = '494C94A4E8E172DB90776F75580E7BCC',
        wd = '4CCD4B5F525674621B9A9E9877839812', xd = 'es', yd = '4DB50B29D740A57B623DA7D8AA6B8615',
        zd = '4ECB34D48318D606D5C147FD543CC9FB', Ad = 'zh_CN', Bd = '5F4C7A417FDF2309429C5C5DBD1AD2BA',
        Cd = '61C001CB12281CA2CDB030DE5970CB6F', Dd = '61FFBFF256DC3E7E20AA0A4C040F4446',
        Ed = '627FB5D352841A5289907FB1C8CCED94', Fd = '65D0A7E4E7D912F70977F293FAC22B99',
        Gd = '66279C53DB218C47D0488E47956B266A', Hd = '675C829C1A394A7E42DB4A6567A34C38',
        Id = 'en_US', Jd = '681E8F80D4E1787CB291E440CFCF07B9', Kd = '682022400F9428C4A29558BE30D8E571',
        Ld = '69CFB892D64B91A2DA7EAA637FD71701', Md = '6B035E3A0EE23BB1CA994EE3C28A52FA',
        Nd = '6BB24C571804159BFDF7B8A00249F682', Od = 'it', Pd = '6E5123512AB1F9E521EF7D6A3315C6EB',
        Qd = 'es_ES', Rd = '72068FFD95F86EBF634777D2235CA1EB', Sd = '7C4CC32AB563BB01F5DEC8488618044E',
        Td = 'fr_FR', Ud = '7EE182441FBA806E00772889D0213F0E', Vd = '',
        Wd = '81AF0C99722C42AC4F24660E1C940243', Xd = '82CA9331EA0823FD00AC52F6B0678F2B',
        Yd = '8A6A6421E9C3CF65B501A262F845C020', Zd = '8AE5388B466BE20CF210931ABDDD0C83',
        $d = '8B0C30AE1AD2D2F9954DE63C5835867D', _d = '8B7BDFE83B74995A941539BCFD029CB2',
        ae = '8F71C02251741217A3EFBCBA45FE40D8', be = '9310ED88AD5624CB6ACD1A948BAC8B1D', ce = 'tl',
        de = 'A35FA15108A1A5F1494E30A70C542EA9', ee = 'tl_PH', fe = 'A720C651C330738C24C8438FCACF7629',
        ge = 'AA693F9D8CB93031E86856D34EE1784A', he = 'AAF8F2EDA3970CD5AF40B84750D22955',
        ie = 'AC4A89946CB123ED9D567AAB409007E4', je = 'ADDAB3AC5C095E4A19D0F91F69C58D68',
        ke = 'fr', le = 'B0D41B7657756E685CBCD0E2F59F69E0', me = 'B1503CBD92EBB55E4733616AE1964A31',
        ne = 'de_DE', oe = 'B55EFDC3C13C788728EFAF1E6B69A287', pe = 'B5A9BBB7926736A9E312186FD0541378',
        qe = 'B64D2FE0615E11BCD1FCA3EE5C375663', re = 'B9E7CE40A60D6EAEC1B843A4D6038A94', se = 'BB55032974F5F01F881AD0E508261C89',
        te = 'BC4E6911CDC682D83AC64CEBD24F53FF', ue = 'BE2569C3C6D71B149046E7E0AE3320BF', ve = 'CA803D4A4DC9304652E6E55F8CE8BE47',
        we = 'CE293F5B50650E06935E8C1B9EBEEDE4', xe = 'CF092C03D7F352E7C114234E5D2F9C6E', ye = 'D5F6F0932F7EDAED6A525FD91ECEEA32',
        ze = 'D6F01D78A1F633D10D92BD520FB8F90C', Ae = 'DA3E01A50432C6AFE509C5CB65EC0589', Be = 'DCDF18A01073318CA8CADBDE5F4FE807',
        Ce = 'DD575A3B270BAA3F456854D2BCEC3D49', De = 'DF0D7D187801A3ADBDAF5C21332CF19F', Ee = 'E03E0D8059195E1C154CF764EE40EF0B',
        Fe = 'E22430FEA6A7215B2C237A5C7193EEEC', Ge = 'E7405574A62C4D065D25381387B9110F', He = 'E836A2B88F2FBD0DAE40EF285E8C4F1F',
        Ie = 'EBD1831BF32794C541D770AEC61C16A6', Je = 'ED9738FFB28E34B88AC5ED35ABF68C05', Ke = 'EF5FE0CA1C20BC573B84EB0003EF9C8A',
        Le = 'F2F682A0BC2675BCD1520B084AE84813', Me = 'F314B64B6A3386B0E70ADCE27BB9CCF7',
        Ne = 'F54E6942501C49069058405FAFCFFCD3', Oe = 'FA47486721753E599C714FC0245FC402', Pe = 'FDEEC03A7930D5699FF35AB83E8A5385',
        Qe = 'FFE8EC8D07653B3B93F57B343C7736B8', Re = ':',
        Se = root_url+'public/assets/js/cache.js', Te = 'loadExternalRefs', Ue = 'end', Ve = 'http:', We = 'file:', Xe = '_gwt_dummy_', Ye = '__gwtDevModeHook:wayfinderHosted',
        Ze = 'Ignoring non-whitelisted Dev Mode URL: ', $e = ':moduleBase'; var q = window; var r = document; t(Q, R); function s() {
            var a = q.location.search;
            return a.indexOf(S) != -1 || a.indexOf(T) != -1
        }
    function t(a, b) {
        if (q.__gwtStatsEvent) {
            q.__gwtStatsEvent({ moduleName: U, sessionId: q.__gwtStatsSessionId, subSystem: V, evtGroup: a, millis: (new Date).getTime(), type: b })
        }
    }
    wayfinderHosted.__sendStats = t; wayfinderHosted.__moduleName = U; wayfinderHosted.__errFn = null; wayfinderHosted.__moduleBase = W;
    wayfinderHosted.__softPermutationId = X; wayfinderHosted.__computePropValue = null; wayfinderHosted.__getPropMap = null;
    wayfinderHosted.__installRunAsyncCode = function () { }; wayfinderHosted.__gwtStartLoadingFragment = function () { return null };
    wayfinderHosted.__gwt_isKnownPropertyValue = function () { return false }; wayfinderHosted.__gwt_getMetaProperty = function () { return null };
    var u = null; var v = q.__gwt_activeModules = q.__gwt_activeModules || {}; v[U] = { moduleName: U };
    wayfinderHosted.__moduleStartupDone = function (e) {
        var f = v[U].bindings; v[U].bindings = function () {
            var a = f ? f() : {};
            var b = e[wayfinderHosted.__softPermutationId]; for (var c = X; c < b.length; c++) { var d = b[c]; a[d[X]] = d[Y] } return a
        }
    }; var w; function A() { B(); return w }
    function B() {
        if (w) { return } var a = r.createElement(Z); a.id = U; a.style.cssText = $ + _; a.setAttribute(ab, bb); a.title = cb; a.tabIndex = -1;
        r.body.appendChild(a); w = a.contentWindow.document; w.open(); var b = document.compatMode == db ? eb : fb; w.write(b + gb); w.close()
    }
    function C(k) {
        function l(a) {
            function b() { if (typeof r.readyState == hb) { return typeof r.body != hb && r.body != null } return /loaded|complete/.test(r.readyState) }
            var c = b(); if (c) { a(); return } function d() { if (!c) { if (!b()) { return } c = true; a(); if (r.removeEventListener) { r.removeEventListener(ib, d, false) } if (e) { clearInterval(e) } } }
            if (r.addEventListener) { r.addEventListener(ib, d, false) } var e = setInterval(function () { d() }, jb)
        }
        function m(c) {
            function d(a, b) { a.removeChild(b) }
            var e = A(); var f = e.body; var g; if (navigator.userAgent.indexOf(kb) > -1 && window.JSON) {
                var h = e.createDocumentFragment();
                h.appendChild(e.createTextNode(lb)); for (var i = X; i < c.length; i++) {
                    var j = window.JSON.stringify(c[i]);
                    h.appendChild(e.createTextNode(j.substring(Y, j.length - Y)))
                } h.appendChild(e.createTextNode(mb)); g = e.createElement(nb); g.language = ob; g.appendChild(h);
                f.appendChild(g); d(f, g)
            } else {
                for (var i = X; i < c.length; i++) {
                    g = e.createElement(nb); g.language = ob; g.text = c[i];
                    f.appendChild(g); d(f, g)
                }
            }
        }
        wayfinderHosted.onScriptDownloaded = function (a) { l(function () { m(a) }) }; t(pb, qb);
        var n = r.createElement(nb); n.src = k; if (wayfinderHosted.__errFn) { n.onerror = function () { wayfinderHosted.__errFn(U, new Error(rb + code)) } } r.getElementsByTagName(sb)[X].appendChild(n)
    }
    wayfinderHosted.__startLoadingFragment = function (a) { return G(a) }; wayfinderHosted.__installRunAsyncCode = function (a) {
        var b = A(); var c = b.body; var d = b.createElement(nb); d.language = ob;
        d.text = a; c.appendChild(d); c.removeChild(d)
    }; function D() {
        var c = {}; var d; var e; var f = r.getElementsByTagName(tb);
        for (var g = X, h = f.length; g < h; ++g) {
            var i = f[g], j = i.getAttribute(ub), k; if (j) {
                j = j.replace(vb, fb);
                if (j.indexOf(wb) >= X) { continue } if (j == xb) {
                    k = i.getAttribute(yb); if (k) {
                        var l, m = k.indexOf(zb); if (m >= X) { j = k.substring(X, m); l = k.substring(m + Y) }
                        else { j = k; l = fb } c[j] = l
                    }
                } else if (j == Ab) { k = i.getAttribute(yb); if (k) { try { d = eval(k) } catch (a) { alert(Bb + k + Cb) } } } else if (j == Db) { k = i.getAttribute(yb); if (k) { try { e = eval(k) } catch (a) { alert(Bb + k + Eb) } } }
            }
        } __gwt_getMetaProperty = function (a) { var b = c[a]; return b == null ? null : b }; u = d; wayfinderHosted.__errFn = e
    }
    function F() {
        function e(a) { var b = a.lastIndexOf(Fb); if (b === -1) { b = a.length } var c = a.indexOf(Gb); if (c == -1) { c = a.length } var d = a.lastIndexOf(Hb, Math.min(c, b)); return d >= X ? a.substring(X, d + Y) : fb }
        function f(a) { if (a.match(/^\w+:\/\//)) { } else { var b = r.createElement(Ib); b.src = a + Jb; a = e(b.src) } return a }
        function g() { var a = __gwt_getMetaProperty(Kb); if (a != null) { return a } return fb }
        function h() { var a = r.getElementsByTagName(nb); for (var b = X; b < a.length; ++b) { if (a[b].src.indexOf(Lb) != -1) { return e(a[b].src) } } return fb }
        function i() { var a = r.getElementsByTagName(Mb); if (a.length > X) { return a[a.length - Y].href } return fb }
        function j() { var a = r.location; return a.href === a.protocol + Nb + a.host + a.pathname + a.search + a.hash }
        var k = g(); if (k === fb) { k = h() } if (k === fb) { k = i() } if (k == fb && j()) { k = e(r.location.href) } k = f(k); return k
    }
    function G(a) { if (a.match(/^\//)) { return a } if (a.match(/^[a-zA-Z]+:\/\//)) { return a } return wayfinderHosted.__moduleBase + a }
    function H() {
        var i = []; var j = X; function k(a, b) { var c = i; for (var d = X, e = a.length - Y; d < e; ++d) { c = c[a[d]] || (c[a[d]] = []) } c[a[e]] = b }
        var l = []; var m = []; function n(a) { var b = m[a](), c = l[a]; if (b in c) { return b } var d = []; for (var e in c) { d[c[e]] = e } if (u) { u(a, d, b) } throw null } m[Ob] = function () {
            var b = null; var c = Pb; try {
                if (!b) {
                    var d = location.search; var e = d.indexOf(Qb); if (e >= X) {
                        var f = d.substring(e + Rb); var g = d.indexOf(Sb, e); if (g < X) { g = d.length }
                        b = d.substring(e + Rb, g)
                    }
                } if (!b) { b = __gwt_getMetaProperty(Ob) } if (!b) { b = q[Tb] } if (b) { c = b } while (b && !__gwt_isKnownPropertyValue(Ob, b)) {
                    var h = b.lastIndexOf(Ub); if (h < X) { b = null; break }
                    b = b.substring(X, h)
                }
            } catch (a) { alert(Vb + a) } q[Tb] = c; return b || Pb
        }; l[Ob] = {
            'ar': X, 'ar_AR': Y, 'bg': Wb, 'bg_BG': Xb, 'de': Yb, 'de_DE': Zb, 'default': $b, 'en': Rb, 'en_GB': _b, 'en_US': ac, 'es': jb, 'es_ES': bc, 'fr': cc, 'fr_FR': dc, 'it': ec, 'it_IT': fc, 'nl': gc, 'nl_NL': hc,
            'pl': ic, 'pl_PL': jc, 'pt': kc, 'pt_BR': lc, 'pt_PT': mc, 'ru': nc, 'ru_RU': oc, 'tl': pc, 'tl_PH': qc, 'zh': rc, 'zh_CN': sc, 'zh_TW': tc
        }; m[uc] = function () {
            var a = navigator.userAgent.toLowerCase(); var b = r.documentMode;
            if (function () { return a.indexOf(vc) != -1 }()) return wc; if (function () { return a.indexOf(xc) != -1 && (b >= jb && b < bc) }()) return yc;
            if (function () { return a.indexOf(xc) != -1 && (b >= ac && b < bc) }()) return zc;
            if (function () { return a.indexOf(xc) != -1 && (b >= _b && b < bc) }()) return Ac;
            if (function () { return a.indexOf(Bc) != -1 || b >= bc }()) return Cc; return fb
        }; l[uc] = { 'gecko1_8': X, 'ie10': Y, 'ie8': Wb, 'ie9': Xb, 'safari': Yb }; __gwt_isKnownPropertyValue = function (a, b) { return b in l[a] }; wayfinderHosted.__getPropMap = function () {
            var a = {}; for (var b in l) {
                if (l.hasOwnProperty(b)) { a[b] = n(b) }
            } return a
        }; wayfinderHosted.__computePropValue = n;
        q.__gwt_activeModules[U].bindings = wayfinderHosted.__getPropMap; t(Q, Dc); if (s()) { return G(Ec) } var o; try {
            k([Fc, Cc], Gc); k([Hc, wc], Ic); k([Jc, wc], Kc); k([Lc, wc], Mc); k([Nc, Cc], Oc); k([Pc, yc], Qc); k([Pb, yc], Rc); k([Sc, yc], Tc); k([Uc, yc], Vc); k([Wc, wc], Xc); k([Yc, wc], Zc); k([$c, Cc], _c); k([Pc, Cc], ad);
            k([bd, Cc], cd); k([dd, wc], ed); k([Yc, Cc], fd); k([gd, yc], hd); k([jd, wc], kd); k([Lc, yc], ld); k([md, yc], nd); k([od, Cc], pd); k([od, yc], qd); k([Fc, yc], rd); k([sd, Cc], td); k([ud, wc], vd); k([bd, wc], wd);
            k([xd, wc], yd); k([Yc, yc], zd); k([Ad, yc], Bd); k([Sc, wc], Cd); k([Hc, yc], Dd); k([od, wc], Ed); k([Jc, Cc], Fd); k([Nc, wc], Gd); k([Lc, Cc], Hd); k([Id, Cc], Jd); k([ud, Cc], Kd); k([Wc, yc], Ld); k([Pc, wc], Md);
            k([gd, Cc], Nd); k([Od, yc], Pd); k([Qd, yc], Rd); k([sd, wc], Sd); k([Td, wc], Ud); k([Pb, wc], Vd); k([Nc, yc], Wd); k([$c, wc], Xd); k([jd, Cc], Yd); k([Jc, yc], Zd); k([xd, yc], $d); k([bd, yc], _d); k([Uc, wc], ae);
            k([Pb, Cc], be); k([ce, wc], de); k([ee, Cc], fe); k([Hc, Cc], ge); k([Td, Cc], he); k([gd, wc], ie); k([Qd, Cc], je); k([ke, wc], le); k([Wc, Cc], me); k([ne, yc], oe); k([Ad, Cc], pe); k([Od, Cc], qe); k([ud, yc], re);
            k([ee, wc], se); k([Id, yc], te); k([jd, yc], ue); k([ne, Cc], ve); k([ce, yc], we); k([Qd, wc], xe); k([Ad, wc], ye); k([ce, Cc], ze); k([ke, Cc], Ae); k([$c, yc], Be); k([md, wc], Ce); k([Id, wc], De); k([Td, yc], Ee);
            k([dd, Cc], Fe); k([xd, Cc], Ge);
            k([ee, yc], He); k([ne, wc], Ie); k([md, Cc], Je); k([Sc, Cc], Ke); k([Od, wc], Le); k([dd, yc], Me); k([ke, yc], Ne); k([Fc, wc], Oe); k([sd, yc], Pe); k([Uc, Cc], Qe); o = i[n(Ob)][n(uc)]; var p = o.indexOf(Re);
            if (p != -1) { j = parseInt(o.substring(p + Y), jb); o = o.substring(X, p) }
        } catch (a) { } wayfinderHosted.__softPermutationId = j; return G(o + Se)
    }
    function I() { if (!q.__gwt_stylesLoaded) { q.__gwt_stylesLoaded = {} } t(Te, R); t(Te, Ue) }
    D(); wayfinderHosted.__moduleBase = F(); v[U].moduleBase = wayfinderHosted.__moduleBase; var J = H(); if (q) {
        var K = !!(q.location.protocol === Ve || q.location.protocol === We); q.__gwt_activeModules[U].canRedirect = K; function L() { var b = Xe; try { q.sessionStorage.setItem(b, b); q.sessionStorage.removeItem(b); return true } catch (a) { return false } }
        if (K && L()) {
            var M = Ye; var N = q.sessionStorage[M]; if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/.*$/.test(N)) { if (N && (window.console && console.log)) { console.log(Ze + N) } N = fb } if (N && !q[M]) {
                q[M] = true; q[M + $e] = F(); var O =
                    r.createElement(nb); O.src = N; var P = r.getElementsByTagName(sb)[X]; P.insertBefore(O, P.firstElementChild || P.children[X]); return false
            }
        }
    } I(); t(Q, Ue); C(J); return true
}
wayfinderHosted.succeeded = wayfinderHosted();

const eCommerceGetOrderItemCountUrl = 'https://www.rsc.org/basket/shoppingcart/getorderitemcount';
const hideNotificationMessageUrl = '/en/home/HideNotificationMessage';
const brandingBarUrl = '/en/home/branding_New';