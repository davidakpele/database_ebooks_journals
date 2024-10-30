import auth from './class/validate';
import chain from './class/SecurityFilterChain'; 

var myAuthObject, headers, obj, get_category, currentURL, url, dataList, headerName, protocol, hostname, port, pathname, search, hash, pathnameSegments, libraryPort, subjectPort, isLoading, currentPage, sidebar, content, checkPost_status, lib, sub, book, sh, csrf_token, data, read, response, pOSTurl, xhr, newData, obj;
// Get the current timestamp
const timestamp = new Date().getTime();
var security = new chain()
currentURL = window.location.href;
url = new URL(currentURL);
protocol = url.protocol;
hostname = url.hostname;
port = url.port;
pathname = url.pathname;
search = url.search;
hash = url.hash;
pathnameSegments = pathname.slice(1).split('/');
libraryPort = pathnameSegments[3];
subjectPort = pathnameSegments[5];
isLoading = false;
currentPage = 1;
sidebar = document.getElementById('Content_Sidebar');
content = document.querySelector('.bookshelf');
document.getElementById('spinnerLoad').style.display = 'block';
document.getElementById('loadMoreButton').textContent = 'Loading...';
document.getElementById('loading').style.display = 'block';

var xhr = new XMLHttpRequest();
function generateRandomToken() {
  // Generate a random token using the crypto API
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);
  const token = Array.from(randomBytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
  return `${token.substr(0, 6)}-${token.substr(8, 8)}-${token.substr(12, 4)}-${token.substr(12, 6)}-${token.substr(20)}`;

}
var Bearer = generateRandomToken();
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
const randomString = generateRandomString(25);
function generateToken(length) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
const secureToken = generateToken(16);

function logout() {
    xhr.open('POST', root_url + 'auth/logout');
    xhr.setRequestHeader('Authorization', 'Bearer ' + security.getCookie('token'));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            get_init = xhr.response;
            obj = JSON.parse(get_init).data;
            if (obj.status == 200) {
               window.location = root_url+'auth/login/'; 
            }
            return false;
        }
    }
    xhr.send();
}


 
function load_categories() {
    //fetch sidebar categories api/collect?action=search&v1=true&query=
    pOSTurl = "v1=true&action=getCategoryListOnparent&library=" + pathnameSegments[3] + "&subject=" + pathnameSegments[5]+'&getCategoryList=true';
    xhr.open('GET', root_url + 'api/collect?' + pOSTurl);
    xhr.setRequestHeader('Authorization', 'Bearer ' + security.getCookie('token'));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            get_category = xhr.response;
            obj = JSON.parse(get_category).data;
            headerName = obj.subject;
            dataList = obj.data;
        }
    }
    xhr.send();
}

function load_bookcases() {
    //fetch bookcases
    pOSTurl = "v1=true&action=getCategoryListOnparentChild&library=" + pathnameSegments[3] + "&subject=" + pathnameSegments[5] + '&bookcases=' + pathnameSegments[7] +'&getbookcaseList=true';
    xhr.open('GET', root_url + 'api/collect?' + pOSTurl);
    xhr.setRequestHeader('Authorization', 'Bearer ' + security.getCookie('token'));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var  get_bookcases = xhr.response;
            obj = JSON.parse(get_bookcases).data;
            headerName = obj.category;
        }
    }
    xhr.send();
}

document.addEventListener('DOMContentLoaded', () => {
    //Uncomment this section if you want to use javascript to load sidebar on subject page, [categories and bookcases]
    if (pathnameSegments[1] =="libraries" && pathnameSegments[1] !="" && pathnameSegments[4] =="subjects" && pathnameSegments[6] == "" || pathnameSegments[6] ==null && pathnameSegments[7] ==null && pathnameSegments[8] ==null && pathnameSegments[9] ==null) {
        load_categories();
    } else if (pathnameSegments[6] == "bookcases" && pathnameSegments[7] !=null && pathnameSegments[2] !=null && pathnameSegments[4] =="subjects" && pathnameSegments[8] =="" || pathnameSegments[8] ==null && pathnameSegments[9] ==null) {
        load_categories();
        setTimeout(load_bookcases, 1000); 
    } else if (pathnameSegments[6] == "bookcases" && pathnameSegments[7] != null && pathnameSegments[2] != null && pathnameSegments[4] == "subjects" && pathnameSegments[8] != null || pathnameSegments[8] != "" && pathnameSegments[8] == "bookshelves" && pathnameSegments[9] != null || pathnameSegments[9] !="") {
        load_categories();
        setTimeout(load_bookcases, 1000); 
    }
});

const get_journals = async () => {
    try {
        const crsf_token_fetch = async () => {
            csrf_token = "";
            if (pathnameSegments[1] =="libraries" && pathnameSegments[1] !="" && pathnameSegments[4] =="subjects" && pathnameSegments[6] == "" || pathnameSegments[6] ==null && pathnameSegments[7] ==null && pathnameSegments[8] ==null && pathnameSegments[9] ==null) {
                lib = pathnameSegments[3]; sub = pathnameSegments[5];
                checkPost_status = 1;
            } else if (pathnameSegments[6] == "bookcases" && pathnameSegments[7] !=null && pathnameSegments[1] !=null && pathnameSegments[4] =="subjects" && pathnameSegments[8] =="" || pathnameSegments[8] ==null && pathnameSegments[9] ==null) {
                lib = pathnameSegments[3]; sub = pathnameSegments[5]; book = pathnameSegments[7];                      
                checkPost_status = 2;
            } else {
                if (pathnameSegments[7] !== "") {
                    if (pathnameSegments[6] =="bookcases" && pathnameSegments[8] =="bookshelves" && pathnameSegments[6] !=null && pathnameSegments[8] !=null) {
                        lib = pathnameSegments[3]; sub = pathnameSegments[5]; book = pathnameSegments[7]; sh = pathnameSegments[9];                        
                        checkPost_status = 3;
                    }
                }
            }
                
            "getbookcases=true&library=603&subject=101&bookcases=1&token=jdDi4w1/al9W1k=QJej7I+M1A62+2idJcaJ0Lzp5Ftc65x9WmiIg0wYl1sc2JmYl4w9+cY1pJRDAYUYD232w0YclxY6AwaW8YoWng/d5fwmt7Mct4jY0/cMjYDDMadmtm9jsPAPaA79Wj7Y2FkaAj8xlphNAaJ6RMIMs83tte018L6w5LAojPvtRDoBAY2dR56095+SFsn9enOmiLF3MNcIwLcJACCYi7vhAAbbDs7ty13fAAN6U9wcUbm0+ncCY4b+nvenBzyjWqDlxwNkl1NwqAF1eIYFt57nbAe5banFN77+MfU4Lfw6wt92PwzOFM6ML9MpIhtaf2maM2MonWxoSWIW1WtnbwsjFS8eaxbWV2RA7cAZiXmhqRAAakfmnAx5oNFIlPg0IY5fwkDp3=8MI9MI+vWajJ4F2F1kd2lIwfqU6FRCWilRIIa+kABZ0hU7+Yl5wY7wzhIoWiDliw2eabJLRzbXj4k2d27B=5wxdhqo6eimt="
            pOSTurl =(checkPost_status ==1 ? "getall=true&library=" + lib + "&subject=" + sub + "&token=" + csrf_token + "" : (checkPost_status ==2) ? "getbookcases=true&library="+lib+"&subject="+sub+"&bookcases="+book+"&token=" + csrf_token +"" : "getcraft=true&library=" + lib + "&subject=" + sub + "&bookcases=" + book + "&bookshelves=" + sh + "&token=" + csrf_token + "");
            xhr.open('GET', root_url + 'api/collect?iat=sort&action=true&target=dataContext&' + pOSTurl + '&collect=' + timestamp + '&page=' + currentPage + '&v=1&_v=' + randomString + '&t=timing&en=' + secureToken, true);
            xhr.open('GET', root_url + 'api/collect?v1=true&action=dataContext&' + pOSTurl + '&collect=' + timestamp + '&page=' + currentPage + '&v=1&_v=' + randomString + '&t=timing&en=' + secureToken, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + security.getCookie('token'));
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    newData = xhr.responseText;
                    obj = JSON.parse(newData)._items;
                    $('.bookshelf').empty();
                    obj.data.journalList.forEach(function (CallRecieve) {
                        $('.bookshelf').append(`
                        <li class="bookshelf-journal-list-item">
                            <div id="ember8270" class="ember-view">
                                <a href="${root_url}libraries/library/${libraryPort}/journals/${CallRecieve.journalid}/issues/current/sort/title" id="ember8271" class="bookshelf-journal ember-view" tabindex="0">
                                    <div id="ember8272" class="journal-cover __771d8 ember-view">
                                        <div class="image-container">
                                            <img src="${root_url}${CallRecieve.imagedata}" alt="${CallRecieve.journal_name}" title="${CallRecieve.journal_name}">
                                            <!--<a target="_new" href="http://www.scimagojr.com/journalsearch.php?q=1548-7091&amp;tip=iss" id="ember950" class="scimago-rank ember-view">SJR: <span>14.358</span></a>-->
                                            </div>
                                    </div>
                                    <div title="${CallRecieve.journal_name}" class="bookshelf-journal-title">${CallRecieve.journal_name}</div>
                                </a>
                            </div>
                        </li>
                        `);
                    });
                    isLoading = false;
                    currentPage++;
                    document.getElementById('spinnerLoad').style.display = 'none';
                    document.getElementById('loadMoreButton').textContent = 'Load More';
                    // Get the element with the class "message"
                    const messageElement = document.querySelector('.message');
                    const ErrormessageElement = document.querySelector('.error-msg');
                    (obj.rowCount > 49 || obj.rowCount == 50 ? [document.getElementById('loading').style.display = 'block', ErrormessageElement.style.display = "none"] : obj.rowCount == 0 ? [currentPage = 1, ErrormessageElement.style.display = "block", document.getElementById('loadMoreButton').classList.add('primary'), document.getElementById('loadMoreButton').textContent = 'Try Again..!', document.getElementById('loading').style.display = 'block']: $('#loading').remove());  
                }
            };
        xhr.send();
            
        }
        crsf_token_fetch();
        
   
    } catch (error) {
        throw new Error(`Network response was not OK: ${error}`);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(get_journals, 2000); 
});

function fetchMoreData() {
    var tokenChain = new chain();
        if (isLoading) return;
        isLoading = true;
        document.getElementById('spinnerLoad').style.display = 'block';
        document.getElementById('loadMoreButton').textContent = 'Loading...';
        document.getElementById('loading').style.display = 'block';
        document.querySelector('.error-msg').style.display = 'none';
        var button=   document.getElementById('loadMoreButton');
        if (button.classList.contains('primary')) {
            button.classList.remove('primary');
        }
        setTimeout(() => {
            if (pathnameSegments[1] =="libraries" && pathnameSegments[1] !="" && pathnameSegments[4] =="subjects" && pathnameSegments[6] == "" || pathnameSegments[6] ==null && pathnameSegments[7] ==null && pathnameSegments[8] ==null && pathnameSegments[9] ==null) {
                lib = pathnameSegments[3]; sub = pathnameSegments[5];
                checkPost_status = 1;
            } else if (pathnameSegments[6] == "bookcases" && pathnameSegments[7] !=null && pathnameSegments[1] !=null && pathnameSegments[4] =="subjects" && pathnameSegments[8] =="" || pathnameSegments[8] ==null && pathnameSegments[9] ==null) {
                lib = pathnameSegments[3]; sub = pathnameSegments[5]; book = pathnameSegments[7];                      
                checkPost_status = 2;
            }else {
                if (pathnameSegments[7] !== "") {
                    if (pathnameSegments[6] =="bookcases" && pathnameSegments[8] =="bookshelves" && pathnameSegments[6] !=null && pathnameSegments[8] !=null) {
                        lib = pathnameSegments[3]; sub = pathnameSegments[5]; book = pathnameSegments[7]; sh = pathnameSegments[9];                        
                        checkPost_status = 3;
                    }
                } 
            }
        csrf_token = Bearer;
        pOSTurl =(checkPost_status ==1 ? "getall=true&library=" + lib + "&subject=" + sub + "&token=" + csrf_token + "" : (checkPost_status ==2) ? "getbookcases=true&library="+lib+"&subject="+sub+"&bookcases="+book+"&token=" + csrf_token +"" : "getcraft=true&library=" + lib + "&subject=" + sub + "&bookcases=" + book + "&bookshelves=" + sh + "&token=" + csrf_token + "");
        // Make an AJAX request to fetch new data from the server
        xhr.open('GET', root_url + 'api/collect?v1=true&action=getAllJournal&' + pOSTurl + '&page=' + currentPage, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + security.getCookie('token'));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                newData = xhr.responseText;
                obj = JSON.parse(newData)._items;
                document.getElementById('loading').style.display = 'none';
                document.getElementById('spinnerLoad').style.display = 'none';
                var dataContainer = document.querySelector('.bookshelf');
                // ✅ Create element
                var itemElement = document.createElement('li');
                // ✅ Add classes to element
                itemElement.classList.add('bookshelf-journal-list-item');
                itemElement.id = 'newjournal';
                obj.data.journalList.forEach(function (CallRecieve) {
                    itemElement=`<li class="bookshelf-journal-list-item"><div id="ember8270" class="ember-view">
                                <a href="${root_url}libraries/${libraryPort}/journals/${CallRecieve.journalid}/?sort=title" id="ember8271" class="bookshelf-journal ember-view" tabindex="0">
                                    <div id="ember8272" class="journal-cover __771d8 ember-view">
                                        <div class="image-container">
                                            <img src="${root_url}${CallRecieve.imagedata}" alt="${CallRecieve.journal_name}" title="${CallRecieve.journal_name}">
                                        </div>
                                    </div>
                                    <div title="${CallRecieve.journal_name}" class="bookshelf-journal-title">${CallRecieve.journal_name}</div>
                                </a>
                            </div></li>`
                    dataContainer.insertAdjacentHTML('beforeend', itemElement)
                });
                isLoading = false;
                currentPage++;
                document.getElementById('loadMoreButton').textContent = 'Load More';
                // Get the element with the class "error-msg"
                const messageElement = document.querySelector('.message');
                const ErrormessageElement = document.querySelector('.error-msg');
                (obj.rowCount > 49 || obj.rowCount == 50 ? [document.getElementById('loading').style.display = 'block', ErrormessageElement.style.display = "none"] : obj.rowCount==0 ? [currentPage=1, ErrormessageElement.style.display = "block", document.getElementById('loadMoreButton').classList.add('primary'), document.getElementById('loadMoreButton').textContent = 'Try Again..!', document.getElementById('loading').style.display = 'block']: $('#loading').remove());
            }
        };
        xhr.send();
    }, 1000);
}
// Add a scroll event listener to trigger fetching new data when the user scrolls to the bottom
sidebar.addEventListener('scroll', function() {
    if (sidebar.scrollTop + sidebar.clientHeight >= content.scrollHeight) {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('spinnerLoad').style.display = 'none';
    }
});

// Add a click event listener to the "Load More" button
document.getElementById('loadMoreButton').addEventListener('click', fetchMoreData);

$('document').ready(function () {
    $('#logout_user').click(function (e) {
        myAuthObject = new auth();
        e.preventDefault();
        myAuthObject.logout();
    });
    $('.refresh-Journal-Container').click(function () {
        const loader = new auth();
        loader.reloadJournalContainer();
    });
})

