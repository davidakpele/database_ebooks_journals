import auth from './class/validate';

var ViewYearsList = document.getElementById('ViewYearsListInMobileVersion');
var ViewRelationShipList = document.getElementById('RelationShipList');
var OpenHiddenYearList = document.getElementById('ember3134');
var OpenHiddenRelationShipList = document.getElementById('OpenRelationShipList');

$('document').ready(function () {
    $('.back-button').click(function (e) {
        e.preventDefault();
        window.history.go(-1)
    });
    $('#logout_user').click(function (e) {
        var myAuthObject = new auth();
        e.preventDefault();
        myAuthObject.logout();
    });
    $(ViewYearsList).click(function () {
        if (OpenHiddenYearList.classList.contains('active_hidden')) {
            if (OpenHiddenRelationShipList.classList.contains('SelectDeactive_hidden')) {
                OpenHiddenRelationShipList.classList.remove('SelectDeactive_hidden');
                OpenHiddenRelationShipList.classList.add('Selectactive_hidden');
                ViewRelationShipList.classList.remove('activateBorder');
            }
            if (ViewRelationShipList.classList.contains('active')) {
                ViewRelationShipList.classList.remove('active');
                ViewYearsList.classList.add('active');
                OpenHiddenYearList.classList.remove('active_hidden');
                OpenHiddenYearList.classList.add('deactive_hidden');
                OpenHiddenYearList.classList.add('visible');
                ViewYearsList.classList.add('activateBorder');
            } else {
                ViewYearsList.classList.add('active');
                OpenHiddenYearList.classList.remove('active_hidden');
                OpenHiddenYearList.classList.add('deactive_hidden');
                OpenHiddenYearList.classList.add('visible');
                ViewYearsList.classList.add('activateBorder');
            }
            OpenHiddenYearList.classList.remove('active_hidden');
            OpenHiddenYearList.classList.add('deactive_hidden');
            OpenHiddenYearList.classList.add('visible');
            ViewYearsList.classList.add('activateBorder');
        } else {
            document.getElementById("ViewYearsListInMobileVersion").classList.remove('active');
            OpenHiddenYearList.classList.remove('deactive_hidden');
            OpenHiddenYearList.classList.remove('visible');
            ViewYearsList.classList.remove('activateBorder');
            OpenHiddenYearList.classList.add('active_hidden');
        }
    });

    $(ViewRelationShipList).click(function () {
        if (OpenHiddenRelationShipList.classList.contains('Selectactive_hidden')) {
            if (OpenHiddenYearList.classList.contains('deactive_hidden')) {
                OpenHiddenYearList.classList.remove('deactive_hidden');
                ViewYearsList.classList.remove('activateBorder');
                OpenHiddenYearList.classList.add('visible');
                OpenHiddenYearList.classList.add('active_hidden');
            }
            if (ViewYearsList.classList.contains('active')) {
                ViewYearsList.classList.remove('active');
                ViewRelationShipList.classList.add('active');
                OpenHiddenRelationShipList.classList.remove('Selectactive_hidden')
                OpenHiddenRelationShipList.classList.add('SelectDeactive_hidden')
                ViewRelationShipList.classList.add('activateBorder');
            }else {
                ViewRelationShipList.classList.add('active');
                OpenHiddenRelationShipList.classList.remove('Selectactive_hidden');
                OpenHiddenRelationShipList.classList.add('SelectDeactive_hidden');
                OpenHiddenRelationShipList.classList.add('visible');
                ViewRelationShipList.classList.add('activateBorder');
            }
            OpenHiddenRelationShipList.classList.remove('Selectactive_hidden');
            OpenHiddenRelationShipList.classList.add('SelectDeactive_hidden');
            OpenHiddenRelationShipList.classList.add('visible');
        } else {
            document.getElementById("RelationShipList").classList.remove('active');
            OpenHiddenRelationShipList.classList.remove('SelectDeactive_hidden');
            OpenHiddenRelationShipList.classList.remove('visible');
            ViewRelationShipList.classList.remove('activateBorder');
            OpenHiddenRelationShipList.classList.add('Selectactive_hidden');
        }
    });

})


function loading_issue_year(id) {
    var currentURL = window.location.href;
    var url = new URL(currentURL);
    var protocol = url.protocol;
    var hostname = url.hostname;
    var port = url.port;
    var pathname = url.pathname;
    var search = url.search;
    var hash = url.hash;
    var pathnameSegments = pathname.slice(1).split('/');
    var libraryPort = pathnameSegments[2];
    var journalPort = pathnameSegments[4];
    var issuedYearPort = pathnameSegments[6];
    var issueURL = protocol + "//" + hostname + "/" + pathnameSegments[0]+'/'+pathnameSegments[1]+'/'+libraryPort+'/'+pathnameSegments[3]+'/'+ journalPort + "/" +pathnameSegments[5]+'/'+id+'/?sort=title';
    window.location.replace(issueURL);
    
}