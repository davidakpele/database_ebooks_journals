<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?=ASSETS?>dist/css/bootstrap.css">
    <script src="<?=ASSETS?>js/jquery2.js"></script>
    <style>
        .mt-2 { margin-top: 20px !important; }
        .mt-4 { margin-top: 30px !important; }
        .error-message { color: red; }
        .d-flex { display: flex !important; }
        .align-items-center { align-items: center !important; }
        .gap-3 { gap: 1rem !important; }
        .field_wrapper > div { display: flex; align-items: center; margin-bottom: 10px; }
        .field_wrapper > div input { flex-grow: 1; margin-right: 10px; }
        .field_wrapper > div a { display: inline-flex; align-items: center; }
        .field_wrapper { display: flex; flex-direction: column; }
        .article-section { margin-bottom: 20px; } 
        .full-width { width: 100%; } /* Define .full-width if needed */
    </style>
    <title>Document</title>
</head>
<body>
    <div class="container"> 
        <h3>Stop at "Human Systems : Therapy, Culture and Attachments"</h3>
        <div class="row">
            <form name="frmImage" enctype="multipart/form-data" method="post" autocomplete="on" action="javascript:void(0)">
                <div class="col-md-3">
                    <label for="categorieid">Categories</label>
                    <select name="categorieid" id="categorieid" class="form-control">
                        <option value="">-Select-</option>
                        <?php foreach ($data['cat'] as $key): ?>
                        <option <?=($key['categoriesid'] == 1) ? 'selected' : ''?> value="<?=$key['categoriesid']?>"><?=$key['categories_name']?></option>
                        <?php endforeach; ?>
                    </select>
                    <div id="categorieid-error" class="error-message"></div>
                </div>
                <div class="col-md-3">
                    <label for="bookshelvesid">Bookshelves</label>
                    <select name="bookshelvesid" id="bookshelvesid" class="form-control">   
                        <option value="">-Select-</option> 
                        <?php foreach ($data['book'] as $key): ?>
                        <option <?=($key['bookshelvesid'] == 1) ? 'selected' : ''?> value="<?=$key['bookshelvesid']?>"><?=$key['bookshelves_name']?></option>
                        <?php endforeach; ?>
                    </select>
                    <div id="bookshelvesid-error" class="error-message"></div>
                </div>
                <div class="col-md-3">
                    <label for="journal_name">Journal name</label>
                    <input type="text" name="journal_name" id="journal_name" class="form-control"/>
                    <div id="journal_name-error" class="error-message"></div>
                </div>
                <div class="col-md-3">
                    <label>Upload Image File:</label>
                    <input name="file" type="file" class="full-width form-control"/>
                </div>
            </form> <!-- Closing form tag moved here -->
        </div>
        <div class="section" id="issueSection"><br />
            <div class="section-title">
                <h4>Issue Section</h3>
            </div>
            <button type="button" onclick="addIssueYear()" class="btn btn-primary btn-sm">Add Year</button>
            <div id="issueContainer"></div>
        </div>                
        <!-- articles -->
        <div class="row">
            <div class="col-md-12">
                <input type="button" value="Submit" name="submit" class="btn btn-primary mt-4" style="width:100%; margin-top:20px" onclick="validateForm()"/>
            </div>
        </div>
    </div>

    <script>
        let issueCount = 0;
        let yearCount = 0;
        let volumeCount = 0;

        function addIssueYear() {
            yearCount++;
            const issueContainer = document.getElementById('issueContainer');
            
            // Create Year Section
            const yearDiv = document.createElement('div');
            yearDiv.classList.add('nested-section');
            yearDiv.innerHTML = `
                <fieldset>
                    <legend>Year ${yearCount}</legend>
                    <label>Date:</label>
                    <input type="date" id="issueDate${yearCount}" name="issueDate${yearCount}" class="form-control mb-2"/>
                    <div class="issueDate-error${yearCount} error-message"></div>
                    <button type="button" onclick="addVolumeSection(this)" class="btn btn-primary btn-sm mt-2">Add Volume</button>
                    <button type="button" onclick="removeIssueSection(this)" class="remove_button btn btn-danger btn-sm mt-2" title="Remove Volume Section">Remove Volume Section</button>
                    <div class="volumeContainer mt-2"></div>
                </fieldset>
            `;
            issueContainer.appendChild(yearDiv);
        }

        function addVolumeSection(volumeElement){
            volumeCount++;
            const volumeContainer = volumeElement.nextElementSibling.nextElementSibling; 
            const volumeDiv = document.createElement('div');
            volumeDiv.classList.add('volume-section');
            volumeDiv.innerHTML = `
                <fieldset>
                    <legend>ISSUE Volume Section:</legend>
                    <div class="col-md-6">
                        <label for="issueTitle${volumeCount}">Title:</label>
                        <input type="text" id="issueTitle${volumeCount}" name="issueTitle${volumeCount}" class="form-control">
                        <div id="issueTitle-error${volumeCount}" class="error-message"></div>
                    </div>
                    <div class="col-md-6">
                        <label for="issueVolume${volumeCount}">Volume:</label>
                        <input type="number" id="issueVolume${volumeCount}" name="issueVolume${volumeCount}" class="form-control">
                        <div id="issueVolume-error${volumeCount}" class="error-message"></div>
                    </div>
                    <button type="button" onclick="addArticleSection(this)" class="btn btn-primary btn-sm mt-2">Add Article Section</button>
                    <button type="button" onclick="removeIssueSection(this)" class="remove_button btn btn-danger btn-sm mt-2" title="Remove Issue Section">
                        Remove Issue Section
                    </button>
                    <div class="articleContainer"></div>
                </fieldset>
            `;
            volumeContainer.appendChild(volumeDiv); // Append volumeDiv to volumeContainer
        }

        function addArticleSection(issueElement) {
            issueCount++; // Increment to ensure unique ids for each article section
            
            // Find the article container for this specific issue
            const articleContainer = issueElement.nextElementSibling.nextElementSibling; 
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article-section');
            articleDiv.innerHTML = `
            <div class="container">
                <fieldset><legend>Article Section:</legend>
                    <div class="col-md-4">
                        <label for="author${issueCount}">Author</label>
                        <input type="text" id="author${issueCount}" name="author${issueCount}" class="form-control"/>
                        <div id="author-error${issueCount}" class="error-message"></div>
                    </div>
                    <div class="col-md-4">
                        <label for="apiWebInContextLink${issueCount}">Api Web In Context Link</label>
                        <input type="text" id="apiWebInContextLink${issueCount}" name="apiWebInContextLink${issueCount}" class="form-control"/>
                        <div id="apiWebInContextLink-error${issueCount}" class="error-message"></div>
                    </div>
                    <div class="col-md-4">
                        <label for="date${issueCount}">Date</label>
                        <input type="date" id="date${issueCount}" name="date${issueCount}" class="form-control"/>
                        <div id="date-error${issueCount}" class="error-message"></div>
                    </div>
                    <div class="col-md-4">
                        <label for="openAccess${issueCount}">Open Access</label>
                        <select id="openAccess${issueCount}" name="openAccess${issueCount}" class="form-control">
                            <option value="">-select-</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                        <div id="openAccess-error${issueCount}" class="error-message"></div>
                    </div>
                    <div class="col-md-4">
                        <label for="title${issueCount}">Title</label>
                        <input type="text" id="title${issueCount}" name="title${issueCount}" class="form-control"/>
                        <div id="title-error${issueCount}" class="error-message"></div>
                    </div>
                    <button type="button" onclick="removeArticleSection(this)" class="btn btn-danger btn-sm mt-4">Remove Article Section</button>
                </fieldset></div>
            `;

            articleContainer.appendChild(articleDiv);
        }

        function removeIssueSection(button) {
            const section = button.closest('fieldset');
            section.remove();
            reindexSections();
    
        }

        function removeArticleSection(button) {
            const articleSection = button.closest('.article-section');
            articleSection.remove();
            reindexSections();
        }

        function reindexSections() {
            $('#issueContainer .nested-section').each(function () {
                issueCount++;
                $(this).find(`legend`).text(`Year ${issueCount}`);
                $(this).find(`input[name^="issueDate"]`).attr('name', `issueDate${issueCount}`).attr('id', `issueDate${issueCount}`);
                $(this).find(`.issueDate-error`).attr('class', `issueDate-error${issueCount}`);
                
                $(this).find('.volumeContainer .volume-section').each(function () {
                    volumeCount++;
                    $(this).find(`legend`).text(`ISSUE Volume Section`);
                    $(this).find(`input[name^="issueTitle"]`).attr('name', `issueTitle${volumeCount}`).attr('id', `issueTitle${volumeCount}`);
                    $(this).find(`#issueTitle-error`).attr('id', `issueTitle-error${volumeCount}`);
                    $(this).find(`input[name^="issueVolume"]`).attr('name', `issueVolume${volumeCount}`).attr('id', `issueVolume${volumeCount}`);
                    $(this).find(`#issueVolume-error${volumeCount}`).attr('id', `issueVolume-error${volumeCount}`);
                    
                    $(this).find('.articleContainer .article-section').each(function () {
                        articleCount++;
                        $(this).find(`label[for^="author"]`).attr('for', `author${articleCount}`);
                        $(this).find(`input[name^="author"]`).attr('name', `author${articleCount}`).attr('id', `author${articleCount}`);
                        $(this).find(`#author-error`).attr('id', `author-error${articleCount}`);
                        $(this).find(`input[name^="apiWebInContextLink"]`).attr('name', `apiWebInContextLink${articleCount}`).attr('id', `apiWebInContextLink${articleCount}`);
                        $(this).find(`#apiWebInContextLink-error`).attr('id', `apiWebInContextLink-error${articleCount}`);
                        $(this).find(`input[name^="date"]`).attr('name', `date${articleCount}`).attr('id', `date${articleCount}`);
                        $(this).find(`#date-error`).attr('id', `date-error${articleCount}`);
                        $(this).find(`select[name^="openAccess"]`).attr('name', `openAccess${articleCount}`).attr('id', `openAccess${articleCount}`);
                        $(this).find(`#openAccess-error`).attr('id', `openAccess-error${articleCount}`);
                        $(this).find(`input[name^="title"]`).attr('name', `title${articleCount}`).attr('id', `title${articleCount}`);
                        $(this).find(`#title-error`).attr('id', `title-error${articleCount}`);
                    });
                });
            });

            // Reindex all error-message divs in the DOM
            let errorCount = 1;
            $('.error-message[id^="author-error"]').each(function () {
                $(this).attr('id', `author-error${errorCount}`);
                errorCount++;
            });
        }


        function validateForm() {
            $('.error-message').text(''); // Clear previous errors
            let isValid = true;

            // Basic Field Validation
            const categorieid = $('#categorieid').val();
            if (!categorieid) {
                $('#categorieid-error').text('Please select a category.');
                isValid = false;
            }

            const bookshelvesid = $('#bookshelvesid').val();
            if (!bookshelvesid) {
                $('#bookshelvesid-error').text('Please select a bookshelf.');
                isValid = false;
            }

            const journal_name = $('#journal_name').val();
            if (!journal_name) {
                $('#journal_name-error').text('Please enter a journal name.');
                isValid = false;
            }

            // Nested Section Validation for Issues
            $('#issueContainer .nested-section').each(function (issueIndex) {
                const issueDate = $(this).find(`input[name="issueDate${issueIndex + 1}"]`).val();
                if (!issueDate) {
                    $(this).find(`.issueDate-error${issueIndex + 1}`).text('Please enter an issue date.');
                    isValid = false;
                }
            });


            $('.volumeContainer .volume-section').each(function (issueIndex) {
                const issueTitle = $(this).find(`input[name^="issueTitle${issueIndex + 1}"]`).val();
                
                if (!issueTitle) {
                    $(this).find(`#issueTitle-error${issueIndex + 1}`).text('Please enter an issue title.');
                    isValid = false;
                }

                const issueVolume = $(this).find(`input[name^="issueVolume${issueIndex + 1}"]`).val();
                if (!issueVolume) {
                    $(this).find(`#issueVolume-error${issueIndex + 1}`).text('Please enter an issue volume.');
                    isValid = false;
                }
        
                // Validation for Articles within Each Issue
            $('.articleContainer .article-section').each(function (articleIndex) {
                    const author = $(this).find(`input[name^="author${articleIndex + 1}"]`).val();
                    if (!author) {
                        $(this).find(`#author-error${articleIndex + 1}`).text('Please enter an author.');
                        isValid = false;
                    }

                    const apiWebInContextLink = $(this).find(`input[name^="apiWebInContextLink${articleIndex + 1}"]`).val();
                    if (!apiWebInContextLink) {
                        $(this).find(`#apiWebInContextLink-error${articleIndex + 1}`).text('Please enter an API Web In Context Link.');
                        isValid = false;
                    }

                    const date = $(this).find(`input[name^="date${articleIndex + 1}"]`).val();
                    if (!date) {
                        $(this).find(`#date-error${articleIndex + 1}`).text('Please enter a date.');
                        isValid = false;
                    }

                    const openAccess = $(this).find(`select[name^="openAccess${articleIndex + 1}"]`).val();
                    if (!openAccess) {
                        $(this).find(`#openAccess-error${articleIndex + 1}`).text('Please select an open access option.');
                        isValid = false;
                    }

                    const title = $(this).find(`input[name^="title${articleIndex + 1}"]`).val();
                    if (!title) {
                        $(this).find(`#title-error${articleIndex + 1}`).text('Please enter a title.');
                        isValid = false;
                    }
                });
            });


            if (isValid) {
                submitForm(); 
            } 
        }

     function submitForm() {
            const formElement = document.querySelector('form[name="frmImage"]');
            const fileFormData = new FormData(formElement);

            // Initialize the base structure of formDataJson
            const formDataJson = {
                categorieid: fileFormData.get('categorieid') || '',
                bookshelvesid: fileFormData.get('bookshelvesid') || '',
                journal_name: fileFormData.get('journal_name') || '',
                issues: {}
            };

            // Loop over each issue
            $('#issueContainer .nested-section').each(function () {
                const issueDiv = $(this);
                const issueDate = issueDiv.find('input[name^="issueDate"]').val() || '';

                // If the date does not exist in issues, initialize it
                if (!formDataJson.issues[issueDate]) {
                    formDataJson.issues[issueDate] = {
                        volumes: {}
                    };
                }

                // Loop over volumes within the current issue
                issueDiv.find('.volumeContainer .volume-section').each(function () {
                    const volumeDiv = $(this);
                    const volumeTitle = volumeDiv.find('input[name^="issueTitle"]').val() || '';
                    const volumeNumber = volumeDiv.find('input[name^="issueVolume"]').val() || '';

                    // Initialize the volume with its own articles array
                    if (!formDataJson.issues[issueDate].volumes[volumeTitle]) {
                        formDataJson.issues[issueDate].volumes[volumeTitle] = {
                            title: volumeTitle,
                            volume: volumeNumber,
                            articles: []
                        };
                    }

                    // Loop over articles within the current volume
                    volumeDiv.find('.article-section').each(function () {
                        const articleDiv = $(this);
                        const article = {
                            author: articleDiv.find('input[name^="author"]').val() || '',
                            apiWebInContextLink: articleDiv.find('input[name^="apiWebInContextLink"]').val() || '',
                            date: articleDiv.find('input[name^="date"]').val() || '',
                            openAccess: articleDiv.find('select[name^="openAccess"]').val() === 'true',
                            title: articleDiv.find('input[name^="title"]').val() || ''
                        };

                        // Add the article to the current volume's articles array
                        formDataJson.issues[issueDate].volumes[volumeTitle].articles.push(article);
                    });
                });
            });

            console.log(formDataJson);

            // Append JSON data as a string to FormData
            fileFormData.append('data', JSON.stringify(formDataJson));

            const fileInput = formElement.querySelector('input[name="file"]');
            if (fileInput && fileInput.files.length > 0) {
                fileFormData.append('file', fileInput.files[0]);
            }

            fetch('form', {
                method: 'POST',
                body: fileFormData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
        }

    </script>
</body>
</html>
