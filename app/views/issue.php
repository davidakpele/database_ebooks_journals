<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?=ASSETS?>dist/css/bootstrap.css">
    <script src="<?=ASSETS?>js/jquery2.js"></script>
    <title>Document</title>
</head>
    <body style="background-color:rgb(128,128,128)" >
    <div class="container">
        <div class="row">
             <form name="issuejournaldetailsform" class="mt-5" enctype="multipart/form-data"method="post" autocomplete="on">
                <div class="row">
                    <section class="section">
                        <div class="col-md-12">
                            <h4>ISSUE Section</h4>
                        </div>
                        <div class="col-md-2">
                            <label for="id">Journal</label>
                            <input type="hidden" name="journalId" id="journalId" value="<?=((!empty($data['data']->journalid)) ? $data['data']->journalid : '')?>" class="form-control hidden"/>
                            <input type="text" name="journal_name" id="journal_name" value="<?=((!empty($data['data']->journal_name)) ? $data['data']->journal_name : '')?>" class="form-control"/>
                        </div>
                        <div class="col-md-2">
                            <label for="date">Date</label>
                            <input type="date" name="issuedate" id="issuedate" class="form-control"/>
                        </div>
                        <div class="col-md-3">
                            <label for="isValidIssue">isValid Issue</label>
                            <select type="text" name="isValidIssue" id="isValidIssue" class="form-control">
                                <option value="">-select-</option>
                                <option selected value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <!-- journal id -->

                        <div class="col-md-2">
                            <label for="number">number</label>
                            <input type="number" name="number" id="number" class="form-control"/>
                        </div>
                        <div class="col-md-3">
                            <label for="suppressed">suppresse</label>
                            <select type="text" name="suppressed" id="suppressed" class="form-control">
                                <option value="">-select-</option>
                                <option value="true">True</option>
                                <option value="false" selected>False</option>
                            </select>
                        </div>
                        <div class="col-md-4">
                            <label for="title">title</label>
                            <input type="text" name="title" id="title"  class="form-control"/>
                        </div>
                        <div class="col-md-3">
                            <label for="type">type</label>
                            <input type="text" name="type" id="type" class="form-control" value="issues"/>
                        </div>
                        <div class="col-md-2">
                            <label for="volume">volume</label>
                            <div id="container">
                                <input type="number" name="volume" id="volume" class="form-control option-input"/>
                                <button type="button" onclick="addOption()">Add more option</button>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label for="withinSubscription">withinSubscription</label>
                            <select type="text" name="withinSubscription" id="withinSubscription" class="form-control">
                                <option value="">-select-</option>
                                <option selected value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </section>
                </div>
                <hr/>
                    <div class="row">
                        <section class="section mt-5">
                            <div class="col-md-12">
                                <h4>Articles Request Details</h4>
                            </div>
                        </section>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <input type="submit" value="Submit" name="submit" class="btn btn-primary mt-4" style="width:100%"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    <script>
    let startYear = 1300;
    let endYear = new Date().getFullYear();
    $('#issuedate').append('<option value="">--select--</option>')
    for (i = endYear; i > startYear; i--)
    {
      $('#issuedate').append($('<option />').val(i).html(i));
    }

    function addOption() {
        var container = document.getElementById("container");
        var input = document.createElement("input");
        input.type = "text";
        input.className = "option-input"+container.children.length;
        input.placeholder = "Option " + (container.children.length);
        container.insertBefore(input, container.lastChild);
    }
    'https://crypo.netlify.app/exchange-dark'
    </script>
    </body>
</body>
</html>