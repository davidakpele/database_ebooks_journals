import chain from './class/SecurityFilterChain'; 
const Http = new XMLHttpRequest();
$("document").ready(function (e) {
    $('#returnHome').click(function () {
        window.location.replace(root_url);
    });
   
    $(".clearer").hide();
    $('.clearer').click(function () {
        const subject_span = document.getElementById('subj_holder');
        if (subject_span.classList.contains('visibility-hidden')) {
            subject_span.classList.remove('visibility-hidden');
        } 
         
        $('.hero-search').val('');
        $(".magnifying-glass").show();
        $(".clearer").hide();
        $("#search_result").empty();
        $(".clone_result").removeClass('subjects-search-container').addClass("subjects-search-container")
        $(".clone_result").removeClass('subjects-search-container complete').addClass("subjects-search-container")
    });
    $(".hero-search").keyup(function (e) {
        e.preventDefault()
        var input = $(this);
        if ((input).val().length == 0) {
            const subject_span = document.getElementById('subj_holder');
            if (subject_span.classList.contains('visibility-hidden')) {
                subject_span.classList.remove('visibility-hidden');
            }
            input.val('');
            $('.magnifying-glass').show();
            $('.clearer').hide();
            $('#search_result').empty();
            $('.clone_result').removeClass('subjects-search-container').addClass("subjects-search-container")
            $('.clone_result').removeClass('subjects-search-container complete').addClass("subjects-search-container")
        }
    });

})

//on keyup, start the countdown
const interval = 100;
let filterValue = "";



function search(input) {
    var tokenChain = new chain();
    tokenChain.getHeader().then((e) => {
        var userDetailsToken = e.v;
        const now = new Date().getTime();
        const lastTime = input._keyPressedAt;
        if ((now - lastTime) > interval) {
            if (input.value !== filterValue) {
                filterValue = input.value;
                //trigger a post here
                
                $.ajax({
                    type: 'POST', 
                    dataType: 'JSON',
                    contentType: "application/json; charset=utf-8",
                    data: 'encrypted', 
                    url: root_url+'api/collect?iat=sort&action=true&target=csrf&v=1&tokenType=micro', 
                    processData: false,
                    encode: true,
                    crossOrigin: true,
                    async: true,
                    crossDomain: true,
                    headers: {
                        'Authorization': 'Bearer '+userDetailsToken+'',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    console.log(response);
                    
                    // if (response.status === 200) {
                    //     if (input.value ==="") {
                    //         return false;
                    //     }

                    //     const postData = { "data": response._token, "_data": input.value }
                    //     Http.open("POST", root_url+'api/collect?iat=sort&action=true&target=search&requestField='+postData+'', true);
                    //     Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    //     Http.setRequestHeader("Access-Control-Allow-Credentials", true);
                    //     Http.setRequestHeader("cache-control", "no-cache");
                    //     Http.setRequestHeader("X-Requested-With",'xmlhttprequest');
                    //     Http.setRequestHeader('Authorization', 'Bearer ' + userDetailsToken);
                    //     Http.send(JSON.stringify(postData));
                    //     Http.onreadystatechange = function (e) {
                    //     if (Http.readyState === 4 && Http.status === 200 && Http.responseText) {
                    //         const result = JSON.parse(Http.responseText);
                    //         const strjson = { "data": result.data, "encrypted": response._token };
                    //         if (result.inc === true) {
                    //             $.ajax({
                    //                 url: root_url+'api/collect?iat=sort&action=true&target=renderresults',
                    //                 type: "GET",
                    //                 data: strjson,
                    //                 crossDomain: true,
                    //                 dataType: 'html',
                    //                 crossOrigin: true,
                    //                 async: true,
                    //                 cache: false,
                    //                 processData: true,
                    //                 headers: {
                    //                     'Authorization': 'Bearer '+userDetailsToken+'',
                    //                 }
                    //             }).then((data) => {
                    //                 const subject_span = document.getElementById('subj_holder');
                    //                 if(window.innerWidth > 1025) {
                    //                 if (subject_span.classList.contains('visibility-hidden')) {
                    //                         subject_span.classList.remove('visibility-hidden');
                    //                         //$('#browser_hf').show();
                    //                     } 
                    //                 } 
                    //                 else {
                    //                     if (!subject_span.classList.contains('visibility-hidden')) {
                    //                         subject_span.classList.add('visibility-hidden');
                    //                     }
                    //                 }
                    //                 $('#ember1178').hide();
                    //                 $('.clearer').show();
                    //                 $('.clone_result').removeClass('subjects-search-container').addClass("subjects-search-container complete")
                    //                 $('#search_result').empty();
                    //                 $('#search_result').append(data);
                    //             })
                    //         } else {
                    //             $('#ember1178').hide();
                    //             $('.clearer').show();
                    //             $('.clone_result').removeClass('subjects-search-container').addClass("subjects-search-container complete")
                    //             $('#search_result').empty();
                    //             $('#search_result').append('<div class="error-search"><li tabindex="0" class="no-results-container in-progress" style="display:block"><span class="label">No matches for <span id="noFoundString">“'+input.value+'”</span>. Title may not be SkyBase Data Center enabled at this time, but still available at your library. <br/><a tabindex="0" href="javascript:void(0)" target="_new">Please click here to search for your title again at your library</a></span></li></div>');
                    //         }
                    //     } 
                    // }
                    // } else {
                    //     return false;
                    // }
                }).fail((xhr, error) => {
                    console.log(error);
                });
            }
            input._monitoringSearch = false;
        }else {
            window.setTimeout(
                function () {
                    search(input);
                }, 0);
        }
    });
    
}

function is_journal (id){
    //request connection links
    const input = $('#ember650').val();
    let data = {"data": 'encrypted'}
    Http.open("POST", root_url+'api/csrf_token', true);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.setRequestHeader("X-Requested-With", 'xmlhttprequest');
    Http.setRequestHeader('Authorization', 'Bearer ' + tsrpc);
    Http.send(JSON.stringify(data));
    Http.onreadystatechange = function (e) {
        if (Http.readyState === 4 && Http.status === 200 && Http.responseText) {
            const csrfToken = JSON.parse(Http.responseText)._token;
            $.ajaxSetup({
                headers: { 'X-CSRF-TOKEN': csrfToken },
            });
            $.post('api/is_connect/?id='+ id + '&token='+csrfToken, { _method: 'get' }, function () {})
                .done((response) => {
                    const packageid = JSON.parse(response).data.packageid;
                    //redirect
                    setTimeout(function () {
                        window.location.href = root_url + 'libraries/'+packageid+'/journals/'+id+'/query='+input+'&sort=title&storeQuery=true';
                    }, 3000);
                });
        
        }
    }
}

function is_subject(id) {
    const data = { "data": 'encrypted' }
    Http.open("POST", root_url+'api/csrf_token', true);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.setRequestHeader("X-Requested-With", 'xmlhttprequest');
    Http.setRequestHeader('Authorization', 'Bearer ' + tsrpc);
    Http.send(JSON.stringify(data));
    Http.onreadystatechange = function (e) {
        if (Http.readyState == 4 && Http.status == 200 && Http.responseText) { 
            var csrfToken = JSON.parse(Http.responseText)._token
            $.ajaxSetup({
                headers: { 'X-CSRF-TOKEN': csrfToken },
            });
            $.post('api/is_connect/?id=' + id + '&token=' + csrfToken, { _method: 'get' }, function () { })
                .done((response) => {
                    var packageid = JSON.parse(response).data.packageid;
                    //redirect
                    setTimeout(function () {
                        window.location.href = root_url + 'libraries/' + packageid + '/subjects/' + id + '/issues/current?sort=title';
                    }, 3000);
                   
                });
        }
    }
}
 
const toggleSubject = document.getElementById('view_mobile_toggle_subject');
const toggleSort_controls = document.getElementById('view_sort_toggle');
const hiddenDiv = document.getElementById('hidden_subject_list');
const hiddenSortDiv = document.getElementById('hidden_sort');

$('document').ready(function (e) {
    $(toggleSubject).click(function () {
        if (hiddenDiv.style.display === 'none') {
            if (hiddenSortDiv.style.display === 'block') {
                hiddenSortDiv.style.display = 'none';
            }
            if (toggleSort_controls.classList.contains('active')) {
                toggleSort_controls.classList.remove('active');
                toggleSubject.classList.add('active');
            } else {
                toggleSubject.classList.add('active');
            }
            hiddenDiv.style.display = 'block';
        } else {
            document.getElementById("view_mobile_toggle_subject").classList.remove('active');
            hiddenDiv.style.display = 'none';
        }
    });

    //
    $(toggleSort_controls).click(function () {
        if (hiddenSortDiv.style.display === 'none') {
            if (hiddenDiv.style.display === 'block') {
                hiddenDiv.style.display = 'none';
            }
            if (toggleSubject.classList.contains('active')) {
                toggleSubject.classList.remove('active');
                toggleSort_controls.classList.add('active');
            } else {
                toggleSort_controls.classList.add('active');
            }
            hiddenSortDiv.style.display = 'block';
        } else {
            toggleSort_controls.classList.remove('active');
            hiddenSortDiv.style.display = 'none';
        }
    })
});

