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
                        <div class="col-md-4">
                            <label for="author">Author</label>
                            <input type="text" name="author" id="author" class="form-control"/>
                        </div>
                        <div class="col-md-4">
                            <label for="apiWebInContextLink">Api Web In Context Link</label>
                            <input type="text" name="apiWebInContextLink" id="apiWebInContextLink" class="form-control"/>
                        </div>
                        <div class="col-md-2">
                            <label for="date">Date</label>
                            <input type="date" name="date" id="date" class="form-control"/>
                        </div>
                        <div class="col-md-2">
                            <label for="inPress">inPress</label>
                            <select type="text" name="inPress" id="inPress" class="form-control">
                                <option value="">-select-</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label for="openAccess">openAccess</label>
                            <select type="text" name="openAccess" id="openAccess" class="form-control">
                                <option value="">-select-</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label for="suppressed">suppressed</label>
                            <select type="text" name="suppressed" id="suppressed" class="form-control">
                                <option value="">-select-</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <!-- syncId id -->

                        <div class="col-md-6">
                            <label for="title">title</label>
                            <input type="text" name="title" id="title" class="form-control"/>
                        </div>
                        <div class="col-md-3">
                            <label for="unpaywallDataSuppressed">unpaywallDataSuppressed</label>
                            <select type="text" name="unpaywallDataSuppressed" id="unpaywallDataSuppressed" class="form-control">
                                <option value="">-select-</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label for="withinLibraryHoldings">withinLibraryHoldings</label>
                            <select type="text" name="withinLibraryHoldings" id="withinLibraryHoldings" class="form-control">
                                <option value="">-select-</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </section>
                </div>
                <div class="row">
                    <div class="col-md-12" style="margin-top:30px">
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
    </script>
    </body>
</body>
</html>