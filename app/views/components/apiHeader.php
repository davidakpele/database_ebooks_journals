<li class="filter-container" style="margin-top:-10px !important">
    <span class=" results-label-header">Results</span>
    <div class="filters">
        <div aria-label="See all Subjects and Journals" tabindex="0" class="filter all active tabindex view_All_Search" id="default_active">
            <div class="label icon flaticon solid article-2"> All Results</div>
        </div>
        <div aria-label="See all Subjects only" tabindex="0" class="filter subjects tabindex" id="subject_active">
            <div class="icon flaticon solid files-1"> Subjects</div>
        </div>
        <div aria-label="See all Journals only" tabindex="0" class="filter journals tabindex" id="journal_active">
            <div class="icon flaticon solid journal-2"> Journals</div>
        </div>
    </div>
</li> 
<!-- api result -->
<li class="result-container" style="margin-top:-10px !important">
    <ul>
        <div id="ember1093" class="ember-view"  style="overflow: scroll;">
            <div id="ember1871" class="infinite-scroller ember-view">
                <?php if (!empty($data['data'])):
                    foreach ($data['data'] as $key):?>
                        <?php 
                        if (array_key_exists('journals', $key)):
                            if (!empty($key['journals'])) :
                                foreach ($key['journals'] as $journalsValues) :?>
                                <li class="result journal first-result ">
                                    <div id="ember1872" class="ember-view">
                                        <a tabindex="0" href="<?=ROOT?>libraries/library/603/journals/<?=$journalsValues['journalid'];?>" id="ember1873" class="ember-view"  onclick="is_journal(<?php echo $journalsValues['journalid']?>)">
                                            <div title="<?php echo $journalsValues['journal_name']?>" class="text">
                                                 <?php echo $journalsValues['journal_name']?>
                                            </div>
                                            <div class="icon flaticon solid journal-2"></div>
                                        </a>
                                    </div>
                                </li>
                                <?php endforeach;?>
                            <?php endif;?>   
                        <?php endif;?>
                        <?php if (array_key_exists('subjects', $key)):
                            if (!empty($key['subjects'])):
                                foreach ($key['subjects'] as $subjectsValues):?>
                                    <li class="result subject ">
                                        <div id="ember1942" class="ember-view">
                                            <a tabindex="0" href="<?=ROOT?>libraries/library/<?=$subjectsValues['package_id']?>/subjects/<?=$subjectsValues['subjectid']?>/?sort=title&all=1" id="ember1943" class="ember-view">
                                                <div title="<?php echo $subjectsValues['subjects_name']?>" class="text">
                                                   View All Journals Under - <?php echo $subjectsValues['subjects_name']?>
                                                </div>
                                                <div class="icon flaticon solid files-1"></div>
                                            </a>
                                        </div>
                                    </li>
                                <?php endforeach;?>
                            <?php endif;?>   
                        <?php endif;?>
                        <?php 
                        if (array_key_exists('bookshelves', $key)):
                            if (!empty($key['bookshelves'])):
                                foreach ($key['bookshelves'] as $bookshelvesValues):?>
                                <li class="result subject">
                                    <div id="ember1942" class="ember-view">
                                        <a tabindex="0" href="<?php echo ROOT?>libraries/library/<?=$bookshelvesValues['packageid']?>/subjects/<?=$bookshelvesValues['subjectid']?>/bookcases/<?=$bookshelvesValues['categoriesid']?>/bookshelves/<?=$bookshelvesValues['bookshelvesid']?>" id="ember1943" class="ember-view">
                                            <div title="<?php echo $bookshelvesValues['bookshelves_name']?>" class="text">
                                            <?php echo $bookshelvesValues['bookshelves_name']?>
                                            </div>
                                            <div class="icon flaticon solid files-1"></div>
                                        </a>
                                    </div>
                                </li>
                                <?php endforeach;?>
                            <?php endif;?>   
                        <?php endif;?>
                    <?php endforeach;?>
                <?php endif;?>
            </div>
            <div id="ember1952" class="__0d2b3 ember-view">
                <div class="spinner align-center">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>
            </div>
        </div>
        <!---->
    </ul>
</li>
<script src="<?=ASSETS?>js/scriptAgent.js"></script>