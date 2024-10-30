import auth from './class/validate';
import SecurityFilterChain from './class/SecurityFilterChain'; 

var userDetailsToken = '';
var security = new SecurityFilterChain()

//on keyup, start the countdown
const interval = 100;
let filterValue = "";

// Asynchronous function to fetch data
$('document').ready(function () {
    userDetailsToken = security.getCookie('token');
    const fetchPackageData = async () => {
        try {
            fetch(root_url + 'api/collect?v1=active&action=package_items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userDetailsToken}`
                }
            })
            .then(response => response.json())
                .then(data => { 
                setTimeout(() => {
                    $('.custom-loader').hide()
                    $('#subjects-list').empty();
                    if (Array.isArray(data._items)) {
                        data._items.forEach(function(itemsList) {
                            $('#subjects-list').append(`<li><div id="ember654" class="ember-view"><a tabindex="0" href="${root_url}libraries/library/${itemsList.package_id}/subjects/${itemsList.subjectid}/?sort=title&all=1" id="ember655" class="subjects-list-subject ember-view"><span class="subjects-list-subject-name">${itemsList.subjects_name}</span><span class="subjects-list-subject-icon flaticon solid files"></span></a></div></li>`);
                        });
                    }
                }, 2000);
            })
        } catch (error) {
            throw new Error(`Error: ${error}`); 
        }
    }
    fetchPackageData();

    $(".hero-search").bind("keyup", logKeyPress);
   
    $('#logout_user').click(function (e) {
        var myAuthObject = new auth();
        e.preventDefault();
        myAuthObject.logout();
    })
})

function logKeyPress() {
    const lk = $(".hero-search").val()
    if (lk.trim() ===""){
        return false;
    }
    const now = new Date().getTime();
    const lastTime = this._keyPressedAt || now;
    this._keyPressedAt = now;
    if (!this._monitoringSearch) {
        this._monitoringSearch = true;
        const input = this;
        $('.magnifying-glass').hide();
        $('.clearer').hide();
        $('#ember1178').show();
        window.setTimeout(
            function () {
                search(input);
        }, 0);
    }
}

function search(input) {
    const now = new Date().getTime();
    const lastTime = input._keyPressedAt;
    if ((now - lastTime) > interval) {
        if (input.value !== filterValue) {
            filterValue = input.value;
            
            fetch(root_url + `api/collect?action=search&v1=true&query=` + encodeURIComponent(input.value) + '', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer '+security.getCookie('token'), 
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
               if (response.status!=200) {
                    $('#ember1178').hide();
                    $('.clearer').show();
                    $('.clone_result').removeClass('subjects-search-container').addClass("subjects-search-container complete")
                    $('#search_result').empty();
                    $('#search_result').append('<div class="error-search"><li tabindex="0" class="no-results-container in-progress" style="display:block"><span class="label">No matches for <span id="noFoundString">“'+input.value+'”</span>. Title may not be SkyBase Data Center enabled at this time, but still available at your library. <br/><a tabindex="0" href="javascript:void(0)" target="_new">Please click here to search for your title again at your library</a></span></li></div>');
                } else {
                    $.ajax({
                        url: root_url + `api/collect?action=search&v1=true&query=` + input.value + '',
                        type: "GET",
                        crossDomain: true,
                        dataType: 'html',
                        crossOrigin: true,
                        async: true,
                        cache: false,
                        processData: true,
                        headers: {
                            'Authorization': 'Bearer ' + security.getCookie('token') + '',
                        }
                    }).then((data) => {
                        const subject_span = document.getElementById('subj_holder');
                        if (window.innerWidth > 1025) {
                            if (subject_span.classList.contains('visibility-hidden')) {
                                subject_span.classList.remove('visibility-hidden');
                            }
                        } else {
                            if (!subject_span.classList.contains('visibility-hidden')) {
                                subject_span.classList.add('visibility-hidden');
                            }
                        }
                        $('#ember1178').hide();
                        $('.clearer').show();
                        $('.clone_result').removeClass('subjects-search-container').addClass("subjects-search-container complete")
                        $('#search_result').empty();
                        $('#search_result').append(data);
                    })
                }
            })
            
        }
        input._monitoringSearch = false;
    }else {
        window.setTimeout(
            function () {
                search(input);
            }, 0);
    }
}



