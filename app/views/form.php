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
            <form name="frmImage" enctype="multipart/form-data" method="post" autocomplete="off" action="javascript:void(0)">
                <div class="col-md-3">
                    <label for="categorieid">Categories</label>
                    <select name="categorieid" id="categorieid" class="form-control">
                        <option value="">-Select-</option>
                        <?php foreach ($data['cat'] as $key): ?>
                        <option <?=($key['categoriesid'] == 24) ? 'selected' : ''?> value="<?=$key['categoriesid']?>"><?=$key['categories_name']?></option>
                        <?php endforeach; ?>
                    </select>
                    <div id="categorieid-error" class="error-message"></div>
                </div>
                <div class="col-md-3">
                    <label for="bookshelvesid">Bookshelves</label>
                    <select name="bookshelvesid" id="bookshelvesid" class="form-control">   
                        <option value="">-Select-</option> 
                        <?php foreach ($data['book'] as $key): ?>
                        <option <?=($key['bookshelvesid'] == 167) ? 'selected' : ''?> value="<?=$key['bookshelvesid']?>"><?=$key['bookshelves_name']?></option>
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
        <div class="section" id="issueSection">
            <div class="section-title">Issue Section</div>
            <button type="button" onclick="addIssue()" class="btn btn-primary btn-sm">Add Issue</button>
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

        function addIssue() {
            issueCount++;
            const issueContainer = document.getElementById('issueContainer');

            // Create a new Issue form
            const issueDiv = document.createElement('div');
            issueDiv.classList.add('nested-section');
            issueDiv.innerHTML = `
                <fieldset><legend>ISSUE Section:</legend>
                    <div class="col-md-4">
                        <label for="issueDate${issueCount}">Date:</label>
                        <input type="date" id="issueDate${issueCount}" name="issueDate${issueCount}" class="form-control">
                        <div id="issueDate${issueCount}-error" class="error-message"></div>
                    </div>
                    <div class="col-md-4">
                        <label for="issueTitle${issueCount}">Title:</label>
                        <input type="text" id="issueTitle${issueCount}" name="issueTitle${issueCount}" class="form-control">
                        <div id="issueTitle${issueCount}-error" class="error-message"></div>
                    </div>
                    <div class="col-md-4">
                        <label for="issueVolume${issueCount}">Volume:</label>
                        <input type="text" id="issueVolume${issueCount}" name="issueVolume${issueCount}" class="form-control">
                        <div id="issueVolume${issueCount}-error" class="error-message"></div>
                    </div>
                    <button type="button" onclick="addArticleSection(this)" class="btn btn-primary btn-sm mt-2">Add Article Section</button>
                    <button type="button" onclick="removeIssueSection(this)" class="remove_button btn btn-danger btn-sm mt-2" title="Remove Issue Section">
                        Remove Issue Section
                    </button>
                    <div class="articleContainer"></div>
                </fieldset>
            `;

            issueContainer.appendChild(issueDiv);
        }

        function addArticleSection(issueElement) {
            // Find the article container for this specific issue
            const articleContainer = issueElement.nextElementSibling.nextElementSibling; // Adjusted to get the correct articleContainer
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article-section'); // Ensure proper class for section
            articleDiv.innerHTML = `<div class="container">
                <fieldset><legend>Article Section:</legend>
                    <div class="col-md-4">
                        <label for="author${issueCount}">Author</label>
                        <input type="text" id="author${issueCount}" name="author${issueCount}" class="form-control"/>
                        <div id="author${issueCount}-error" class="error-message"></div>
                    </div>
                    <div class="col-md-4">
                        <label for="apiWebInContextLink${issueCount}">Api Web In Context Link</label>
                        <input type="text" id="apiWebInContextLink${issueCount}" name="apiWebInContextLink${issueCount}" class="form-control"/>
                        <div id="apiWebInContextLink${issueCount}-error" class="error-message"></div>
                    </div>
                    <div class="col-md-4">
                        <label for="date${issueCount}">Date</label>
                        <input type="date" id="date${issueCount}" name="date${issueCount}" class="form-control"/>
                        <div id="date${issueCount}-error" class="error-message"></div>
                    </div>
                    <div class="col-md-4">
                        <label for="openAccess${issueCount}">Open Access</label>
                        <select id="openAccess${issueCount}" name="openAccess${issueCount}" class="form-control">
                            <option value="">-select-</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                        <div id="openAccess${issueCount}-error" class="error-message"></div>
                    </div>
                    <div class="col-md-4">
                        <label for="title${issueCount}">Title</label>
                        <input type="text" id="title${issueCount}" name="title${issueCount}" class="form-control"/>
                        <div id="title${issueCount}-error" class="error-message"></div>
                    </div>
                    <button type="button" onclick="removeArticleSection(this)" class="btn btn-danger btn-sm mt-4">Remove Article Section</button>
                </fieldset></div>
            `;

            articleContainer.appendChild(articleDiv);
        }

        function removeArticleSection(button) {
            // Find the parent article section and remove it
            const articleDiv = button.closest('.article-section');
            if (articleDiv) {
                articleDiv.remove();
            }
        }

        function removeIssueSection(button) {
            // Find the parent issue section and remove it
            const issueDiv = button.closest('.nested-section');
            if (issueDiv) {
                issueDiv.remove();
            }
        }

        function validateForm() {
            // Clear previous errors
            $('.error-message').text('');

            let isValid = true;

            // Validate the static fields
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

            // Validate dynamically added issues
            $('#issueContainer .nested-section').each(function () {
                const issueIndex = $(this).index();
                const issueDate = $(this).find(`#issueDate${issueIndex + 1}`).val();
                if (!issueDate) {
                    $(this).find(`#issueDate${issueIndex + 1}-error`).text('Please enter an issue date.');
                    isValid = false;
                }

                const issueTitle = $(this).find(`#issueTitle${issueIndex + 1}`).val();
                if (!issueTitle) {
                    $(this).find(`#issueTitle${issueIndex + 1}-error`).text('Please enter an issue title.');
                    isValid = false;
                }

                const issueVolume = $(this).find(`#issueVolume${issueIndex + 1}`).val();
                if (!issueVolume) {
                    $(this).find(`#issueVolume${issueIndex + 1}-error`).text('Please enter an issue volume.');
                    isValid = false;
                }

                // Validate articles within the current issue
                $(this).find('.article-section').each(function () {
                    const author = $(this).find(`#author${issueIndex + 1}`).val();
                    if (!author) {
                        $(this).find(`#author${issueIndex + 1}-error`).text('Please enter an author.');
                        isValid = false;
                    }

                    const apiWebInContextLink = $(this).find(`#apiWebInContextLink${issueIndex + 1}`).val();
                    if (!apiWebInContextLink) {
                        $(this).find(`#apiWebInContextLink${issueIndex + 1}-error`).text('Please enter an API Web In Context Link.');
                        isValid = false;
                    }

                    const date = $(this).find(`#date${issueIndex + 1}`).val();
                    if (!date) {
                        $(this).find(`#date${issueIndex + 1}-error`).text('Please enter a date.');
                        isValid = false;
                    }

                    const openAccess = $(this).find(`#openAccess${issueIndex + 1}`).val();
                    if (!openAccess) {
                        $(this).find(`#openAccess${issueIndex + 1}-error`).text('Please select an open access option.');
                        isValid = false;
                    }

                    const title = $(this).find(`#title${issueIndex + 1}`).val();
                    if (!title) {
                        $(this).find(`#title${issueIndex + 1}-error`).text('Please enter a title.');
                        isValid = false;
                    }
                });
            });
           if (isValid) {
                const form = document.querySelector('form[name="frmImage"]');
                const formData = new FormData(form);

                // Manually serialize dynamic sections
                document.querySelectorAll('#issueContainer .nested-section').forEach((issueDiv, index) => {
                    const issueDate = issueDiv.querySelector('input[name^="issueDate"]').value;
                    const issueTitle = issueDiv.querySelector('input[name^="issueTitle"]').value;
                    const issueVolume = issueDiv.querySelector('input[name^="issueVolume"]').value;

                    formData.append(`issueDate${index}`, issueDate);
                    formData.append(`issueTitle${index}`, issueTitle);
                    formData.append(`issueVolume${index}`, issueVolume);

                    issueDiv.querySelectorAll('.article-section').forEach((articleDiv, articleIndex) => {
                        const author = articleDiv.querySelector('input[name^="author"]').value;
                        const apiWebInContextLink = articleDiv.querySelector('input[name^="apiWebInContextLink"]').value;
                        const date = articleDiv.querySelector('input[name^="date"]').value;
                        const openAccess = articleDiv.querySelector('select[name^="openAccess"]').value;
                        const title = articleDiv.querySelector('input[name^="title"]').value;

                        formData.append(`author${index}-${articleIndex}`, author);
                        formData.append(`apiWebInContextLink${index}-${articleIndex}`, apiWebInContextLink);
                        formData.append(`date${index}-${articleIndex}`, date);
                        formData.append(`openAccess${index}-${articleIndex}`, openAccess);
                        formData.append(`title${index}-${articleIndex}`, title);
                    });
                });

                // Log the content of FormData
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
                const endpointUrl = 'form'; // Replace with your endpoint URL

                // Send the POST request
                fetch(endpointUrl, {
                    method: 'POST',
                    body: formData,
                    // Optional: add headers if needed
                    headers: {
                        'Accept': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }


        }
    </script>
</body>
</html>
