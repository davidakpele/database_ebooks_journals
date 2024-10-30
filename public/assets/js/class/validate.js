import chain from './SecurityFilterChain'; 

class auth {
  
  constructor(UserEmail) {
    this.UserEmail = UserEmail;
  }
  generateRandomString = (length)=> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
  }

  generateToken= (length)=> {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  generateRandomToken() {
    // Generate a random token using the crypto API
    const randomBytes = new Uint8Array(16);
    crypto.getRandomValues(randomBytes);

    // Convert the random bytes to a hexadecimal string
    const token = Array.from(randomBytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');

    // Insert dashes at specific positions to match the desired format
    return `${token.substr(0, 8)}-${token.substr(8, 4)}-${token.substr(12, 4)}-${token.substr(12, 4)}-${token.substr(20)}`;
  }
  authToken() {
    return this.generateRandomToken();
  }

  deleteAllCookies() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const cookieName = cookie.split('=')[0].trim();
        document.cookie = `${cookieName}=; Max-Age=0; path=/`; 
    }
  }
  logout() {
    var security = new chain()
    let xhr = new XMLHttpRequest();
     sessionStorage.clear();
          this.deleteAllCookies()
    xhr.open('POST', root_url + 'auth/logout');
    xhr.setRequestHeader('Authorization', 'Bearer ' + security.getCookie('token'));
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
         
          window.location = root_url+'auth/login/';
      }
    }
    xhr.send();
  }

  regex = () =>{
    const ValidateEmailFilter = (/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    const emailBlockReg = /^([\w-\.]+@(?!uk.com)(?!sail.com)([\w-]+\.)+[\w-]{2,4})?$/;
    if (!ValidateEmailFilter.test(this.UserEmail)){
      return 303;
    }else  if (!emailBlockReg.test(this.UserEmail)){
      return  401;
    }else {
      return 200;
    }
  }

  login = async ({ ...data }) => {
      fetch(root_url + 'auth/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status == 'error') {
            $('.loader').hide()
            $(".text").text("Login");
            $('#alert__message').empty()
            $('.base_error_msg_container').show();
            $('#alert__message').show().html("<span>" + data.message + "*</span>");
          } else {
              if (data.token) {
                document.cookie = `token=${data.token}; path=/;`; 
              }
              if (data.acessToken) {
                  sessionStorage.setItem('acessToken', data.acessToken); 
              }
              if (data.id) {
                  sessionStorage.setItem('userId', data.id); 
              }
              window.location.reload();
          }
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors here
      });
  }

  reloadJournalContainer = async () => {
    var tokenChain = new chain();
    tokenChain.getHeader().then((e) => { 
      var userDetailsToken = e.v;
      var subjectSideBar = '',currentURL, url, dataList, headerName, protocol, hostname, port, pathname, search, hash, pathnameSegments, libraryPort, subjectPort, isLoading, currentPage, sidebar, content, checkPost_status, lib, sub, book, sh, csrf_token, data, read, response, pOSTurl, xhr, newData, obj;
      const crsf_token_fetch = async () => {
        const timestamp = new Date().getTime();
        currentURL = window.location.href; url = new URL(currentURL); protocol = url.protocol; hostname = url.hostname; port = url.port; pathname = url.pathname; search = url.search; hash = url.hash;pathnameSegments = pathname.slice(1).split('/'); libraryPort = pathnameSegments[2]; subjectPort = pathnameSegments[4]; isLoading = false; currentPage = 1; sidebar = document.getElementById('Content_Sidebar');content = document.querySelector('.bookshelf');
        const randomString = this.generateRandomString(25);
        const secureToken = this.generateToken(16);
        sidebar = document.getElementById('Content_Sidebar'); content = document.querySelector('.bookshelf');
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        headers.append("X-CSRF-TOKEN", userDetailsToken);
        headers.append('Authorization', 'Bearer ' + userDetailsToken + '');
        var response = await fetch(root_url + "api/collect?iat=sort&action=true&target=csrf&v=1&tokenType=micro", { headers: headers });
        // Check if the response status is OK
        if (!response.ok) {
          throw new Error(`Network response was not OK: ${response.status}`);
        } else {
          // Parse the response as text
          var data = await response.text();
          var read = JSON.parse(data);
          var csrf_token = read._token;
          if (pathnameSegments[1] =="libraries" && pathnameSegments[1] !="" && pathnameSegments[3] =="subjects" && pathnameSegments[5] == "" || pathnameSegments[5] ==null && pathnameSegments[6] ==null && pathnameSegments[7] ==null && pathnameSegments[8] ==null) {
            lib = pathnameSegments[2]; sub = pathnameSegments[4];
            checkPost_status = 1;
          } else if (pathnameSegments[5] == "bookcases" && pathnameSegments[6] !=null && pathnameSegments[1] !=null && pathnameSegments[3] =="subjects" && pathnameSegments[7] =="" || pathnameSegments[7] ==null && pathnameSegments[8] ==null) {
              lib = pathnameSegments[2]; sub = pathnameSegments[4]; book = pathnameSegments[6];                      
              checkPost_status = 2;
          } else {
              if (pathnameSegments[6] !== "") {
                  if (pathnameSegments[5] =="bookcases" && pathnameSegments[7] =="bookshelves" && pathnameSegments[5] !=null && pathnameSegments[7] !=null) {
                      lib = pathnameSegments[2]; sub = pathnameSegments[4]; book = pathnameSegments[6]; sh = pathnameSegments[8];                        
                      checkPost_status = 3;
                  }
              }
          }
          headers.append("X-CSRF-TOKEN", csrf_token);
          pOSTurl =(checkPost_status ==1 ? "getall=true&library=" + lib + "&subject=" + sub + "&token=" + csrf_token + "" : (checkPost_status ==2) ? "getbookcases=true&library="+lib+"&subject="+sub+"&bookcases="+book+"&token=" + csrf_token +"" : "getcraft=true&library=" + lib + "&subject=" + sub + "&bookcases=" + book + "&bookshelves=" + sh + "&token=" + csrf_token + "");
          var getFinalLoad = await fetch(root_url + 'api/collect?iat=sort&action=true&target=dataContext&' + pOSTurl + '&collect=' + timestamp + '&page=' + currentPage + '&v=1&_v=' + randomString + '&t=timing&en=' + secureToken, { headers: headers });
          if (!getFinalLoad.ok) {
            throw new Error(`Network response was not OK: ${response.status}`);
          } else {
            // Parse the response as text
            data = await getFinalLoad.text();
            obj = JSON.parse(data)._items;
            $('.bookshelf').empty();
            obj.data.journalList.forEach(function (CallRecieve) {
                $('.bookshelf').append(`
                <li class="bookshelf-journal-list-item">
                    <div id="ember8270" class="ember-view">
                        <a href="${root_url}libraries/${libraryPort}/journals/${CallRecieve.journalid}/?sort=title" id="ember8271" class="bookshelf-journal ember-view" tabindex="0">
                            <div id="ember8272" class="journal-cover __771d8 ember-view">
                                <div class="image-container">
                                  <img src="${root_url}${CallRecieve.imagedata}" alt="${CallRecieve.journal_name}" title="${CallRecieve.journal_name}">
                                </div>
                            </div>
                            <div title="${CallRecieve.journal_name}" class="bookshelf-journal-title">${CallRecieve.journal_name}</div>
                        </a>
                    </div>
                </li>
                `);
            });
            if (obj.rowCount == '50' || obj >= '50') {
              isLoading = false;
              currentPage++;
              $('#loadMoreButton').hide();
              document.getElementById('invisibleButton').style.display = 'block';
              const messageElement = document.querySelector('.message');
              const ErrormessageElement = document.querySelector('.error-msg');
              (obj.rowCount > 49 || obj.rowCount == 50 ? [document.getElementById('loading').style.display = 'block', ErrormessageElement.style.display = "none"] : obj.rowCount == 0 ? [currentPage = 1, ErrormessageElement.style.display = "block", document.getElementById('loadMoreButton').classList.add('primary'), document.getElementById('loadMoreButton').textContent = 'Try Again..!', document.getElementById('loading').style.display = 'block']: document.getElementById('loading').style.display = 'none');  
            } else {
              currentPage = 1;
              $('#loading').remove()
            }
                    
          }
        }
    
      }
      crsf_token_fetch();
    })
  }

  loadermorejournal = async () => {
    var currentPage = 1;
    if (currentPage ==1) {
      console.log(currentPage++);
    } else {
      console.log("currentPage is 1");
    }
    
  }
  
}



// Export the class, so it can be imported in other files
export default auth;
