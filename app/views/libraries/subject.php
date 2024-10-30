
<html lang="en-us" class=" flexbox flexboxlegacy">
    <head>
        <meta charset="UTF-8" />
        <meta name="robots" content="index,follow"/>
        <meta name="theme-color" content="#ffffff"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="format-detection" content="telephone=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="msapplication-TileColor" content="#2d89ef">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Security-Policy" content="">
        <meta name="description" content="This platform provides access to journals, books and databases from RSC Publishing, linking over 1 million chemical science articles and chapters. You can access the latest research of interest using the custom eAlerts, RSS feeds and blogs or you can explore content using the quick and advanced searches. Discover the highest quality integrated scientific research today - search faster, navigate smarter and connect more." />
        <meta name="fragment" content="!" />
        <title><?php if(isset($data['page_title'])){echo $data['page_title'];}else{echo App_Title;}?></title>
        <link integrity="" rel="stylesheet" href="<?=ASSETS?>css/vendor-ad5216ee7b612b341da6d25cd4b0fc69.css">
        <link integrity="" rel="stylesheet" href="<?=ASSETS?>css/skybaseStyles.css">
        <link rel="alternate stylesheet" href="<?=ASSETS?>css/skybaseStyles-web-high-contrast.css" title="High contrast">
        <link rel="stylesheet" href="<?=ASSETS?>css/solid-5eee6c7e389b3c4c3158e39527c96df0.css">
        <link rel="stylesheet" href="<?=ASSETS?>css/stroke-a84c5e9e7b0557f4f01f25f6c80d4dd0.css">
        <link rel="stylesheet" href="<?=ASSETS?>css/font-awesome-pro-a7aae632ca5638e21daf1bae4d8fc816.css">
        <link rel="stylesheet" href="<?=ASSETS?>css/gotham-book-d843147ba335769cb632440139fb7609.css">
        <link rel="stylesheet" href="<?=ASSETS?>css/gotham-medium-bcfd69a5918ece923032101524ac2357.css">
        <link rel="stylesheet" href="<?=ASSETS?>css/gotham-bold-f3d6afe450ac576b4d3cf9e9903f8db8.css">
        <link rel="stylesheet" href="<?=ASSETS?>css/sentinel-medium-67b2d56ea8d4b43369e0fa853963633b.css">
        <link rel="stylesheet" href="<?=ASSETS?>css/sentinel-semibold-cc063e6c2f3b67c5ebdf05c2ce4e0f2c.css">
        <link rel="stylesheet" href="<?=ASSETS?>css/fonts.min.css" type="text/css" />
         <link rel="stylesheet" href="<?=ASSETS?>fontawesome/css/all.min.css" type="text/css" />
        <link rel="stylesheet" href="<?=ASSETS?>css/pubs-ui.min.css" type="text/css" />
        <link rel="stylesheet" type="text/css" href="<?=ASSETS?>css/style.css">
        <script src="<?=ASSETS?>js/vendor-55566347b8eb7cb5a2e40b5c0177bc16.js"></script>
        <script async="" src="<?=ASSETS?>js/analytics.js"></script>
        <script>
            const root_url="<?=ROOT?>";
            let brandingBarUrl ="";
        </script> 
    </head>
<body id="pagetop" class="oxy-ui pubs-ui hp-page hidden bd_sklsdl">
    <?php 
        $url=implode('',$_REQUEST);
        $urlParts = explode('/', $url);
    ?>
    <?php $this->view('./components/Nav'); ?>
    <div id="ember-basic-dropdown-wormhole"></div>
    <div id="loom-companion-mv3" ext-id="liecbddmkiiihnedobmlmillhodjkdmb">
        <section id="shadow-host-companion"></section>
    </div>
    <div id="ember404" class="ember-view">
        <aside class="route-announcer">
            <div aria-live="polite" id="ember432" class="screen-reader ember-view">Loaded SkyBase Data</div>
        </aside> 
        <div class="media-desktop locale-en-us" style="margin-top:-20px" id="locale-en-us">
            <div class="canvas">
                <div id="library-content" class="container ">
                    <main class="holdings-container">
                        <div class="subject" >
                            <a href="<?=ROOT?>" id="ember1122" class="subject-back-button ember-view" style="color:red"> 
                                <img src="<?=ASSETS?>images/change-subject-chevron-b0613c2c2576dc880a792874777e52b3.png" alt="Change Subject"> 
                                Change Subject
                            </a> 
                            <h1 class="subject-name category-name"><?=(isset($data['data']['subject'])?$data['data']['subject']->subjects_name:'')?></h1>
                            <h4 class="subject-bookcase-list-header">Categories</h4>
                            <ul class="subject-bookcase-list"> 
                                <li class="subject-bookcase-list-item categoryList">
                                    <a href="<?php echo ROOT?>libraries/library/603/subjects/<?=(!empty($data['data']['subject']))? $data['data']['subject']->subjectid.'/?sort=title&all=1':''?>" id="ember1123" class="<?=((isset($urlParts[4]) && !isset($urlParts[6]) && isset($_REQUEST['all']))? 'active': '')?> ember-view"> All Journals</a></li>
                                    <div class="category_list">
                                          <?php if($data['data']['data'] !=null):?>
                                        <?php foreach($data['data']['data'] as $categoriesList):?>
                                        <li class="subject-bookcase-list-item"> 
                                            <a href="<?php echo ROOT?>libraries/library/603/subjects/<?php echo $data['data']['subject']->subjectid?>/bookcases/<?php echo $categoriesList['categoriesid'];?>/?sort=title" id="ember1124" 
                                            class="<?=((isset($urlParts[4]) && isset($urlParts[6]) && $categoriesList['categoriesid']==$urlParts[6])? 'active': '')?> ember-view"><?php echo $categoriesList['categories_name'];?></a> 
                                        </li>
                                    <?php endforeach;?>
                                <?php endif;?>
                                    </div>
                            </ul>
                        </div>
                        <?php if($data['sideline']==true):?>
                            <div class="bookcase">
                                <h3  class="bookcase-name"><?=(($data['header_'] !=null) ? $data['header_'] : '')?></h3>
                                <ul class="bookcase-bookshelf-list" >
                                    <li class="bookcase-bookshelf-list-item" style="font-size: 18px;color: #666;">
                                        <a href="<?php echo ROOT?>libraries/library/603/subjects/<?=(!empty($data['data']['subject']))? $data['data']['subject']->subjectid.'/bookcases/'.$urlParts[6].'/?sort=title&all=1':''?>"  id="ember1115" class="<?=((isset($urlParts[4]) && isset($urlParts[6]) && !isset($urlParts[8]))? 'active': '')?> ember-view" ><span>All Journals</span></a>
                                    </li>
                                    <div class="bookcaseList">
                                        <?php if(isset($data['activate_bookshalves'])) :?>
                                        <?php if($data['activate_bookshalves']['bookcases'] !=null):?>
                                            <?php foreach($data['activate_bookshalves']['bookcases'] as $bookcasesList):?>
                                                <li class="bookcase-bookshelf-list-item" >
                                                    <a href="<?php echo ROOT?>libraries/library/<?=$data['data']['subject']->package_id?>/subjects/<?=$data['activate_bookshalves']['category']->subjectid?>/bookcases/<?=$data['activate_bookshalves']['category']->categoriesid?>/bookshelves/<?=$bookcasesList['bookshelvesid']?>/?sort=title" id="ember1119" 
                                                    class="<?=((isset($urlParts[4]) && isset($urlParts[6]) && $bookcasesList['bookshelvesid']==$urlParts[8])? 'active': '')?> ember-view"  style="font-size:18px;color: #666;">
                                                        <span><?=$bookcasesList['bookshelves_name']?></span>
                                                    </a>
                                                    <div id="ember1126" class="ember-view"></div>
                                                </li>
                                            <?php endforeach;?>
                                        <?php endif;?>
                                    <?php endif;?>
                                    </div>
                                </ul> 
                            </div>
                        <?php endif;?>
                        <div id="Content_Sidebar" class="journals-container infinite-scroller ember-view" style="margin-top:40px">
                            <div class="controls-container" id="case1">
                                <ul class="controls">
                                    <li  id="returnHome" class="back subject-back-button tabindex" data-ember-action="" data-ember-action-6914="6914">
                                        <span aria-hidden="true" class="icon flaticon solid left-2"></span> Back
                                    </li>
                                    <li  class="categories  tabindex" data-ember-action="" data-ember-action-6915="6915" id="view_mobile_toggle_subject">
                                        Refine <span aria-hidden="true" class="icon flaticon solid down-2"></span>
                                    </li>
                                    <li  class="sort  tabindex" data-ember-action="" data-ember-action-6916="6916" id="view_sort_toggle">
                                        Sort <span aria-hidden="true" class="icon flaticon solid down-2"></span>
                                    </li>
                                </ul>
                                <ul class="subject-bookcase-list bookcase-bookshelf-list" style="display:none" id="hidden_subject_list">
                                    <li id="ember7338" class="subject-bookcase-list-item all-journals <?=((isset($urlParts[4]) && !isset($urlParts[6]) && isset($_REQUEST['all']))? 'active': '')?> ember-view">
                                        <a  href="<?php echo ROOT?>libraries/library/603/subjects/<?php if(!empty($data['data']['subject']))echo $data['data']['subject']->subjectid.'/?sort=title&all=1';?>"" id="ember7339" class="active ember-view">
                                            <div class="text">All Journals - <?=(!empty($data['data']['subject']))? $data['data']['subject']->subjects_name:''?></div>
                                        </a>
                                        <span aria-hidden="true" class="icon flaticon solid down-2"></span>
                                    </li>
                            <?php if($data['data']['data'] !=null):?>
                                <?php foreach($data['data']['data'] as $categoriesList):?>
                                    <li class="subject-bookcase-list-item <?=((isset($urlParts[4]) && isset($urlParts[5]) && $categoriesList['categoriesid']==$urlParts[6])? 'active': '')?>" data-ember-action="" data-ember-action-7340="7340">
                                        <a  href="<?php echo ROOT?>libraries/library/603/subjects/<?php echo $data['data']['subject']->subjectid?>/bookcases/<?php echo $categoriesList['categoriesid'];?>/?sort=title" id="ember7341" class="ember-view">
                                            <div class="text"><?php echo $categoriesList['categories_name'];?></div>
                                        </a> <span aria-hidden="true" class="icon flaticon solid down-2"></span>
                                    </li>
                            <?php endforeach;?>
                        <?php endif;?>
                                </ul>
                                <ul class="sort-controls" style="display:none" id="hidden_sort">
                                    <li id="ember8453" class="sort-control active ember-view">
                                        <a  href="javascript:void(0)" id="ember8454" class="sort-control sort-by-title active ember-view">                
                                            <div class="text">Journals By Title (A-Z)</div>
                                        </a>             
                                        <span aria-hidden="true" class="icon flaticon solid"></span>
                                    </li>
                                    <li id="ember8455" class="sort-control ember-view">
                                        <a  href="libraries/library/603/subjects/63?sort=rank" id="ember8456" class="sort-control sort-by-scimago ember-view">                
                                            <div class="text">Journals By Scimago Rank</div>
                                        </a>              
                                        <span aria-hidden="true" class="icon flaticon solid"></span>
                                    </li>         
                                </ul>
                    
                            </div>
                            <div style="margin-right: 47.200000000000045px" id="ember791" class="sort-options-container __eccf5 ember-view">
                                <div class="sort-options">
                                    <span class="active"> 
                                        <a aria-label="A-Z" href="javascript:void(0)" id="ember792" class="sort-control sort-by-title hide-underline active ember-view" > 
                                            SORT <span class="show-underline">A-Z /</span>
                                        </span>
                                    </span>
                                    <span>
                                        <a aria-label="Journal Rank" href="javascript:void(0)" id="ember793" class="sort-control sort-by-scimago ember-view" >JOURNAL RANK</a>
                                    </span>
                                </div>
                            </div>
                                <ul class="bookshelf">
                                    <!-- Books Container-->
                                    <div id="child_container"></div>
                                </ul>
                                <div style="margin-bottom:60px">
                                    <div class="bookshelf-loading-indicator" id="loading" style="display: none;">
                                        <div id="ember1952" class="__0d2b3 ember-view">
                                            <div class="spinner align-center" style="display: none;" id="spinnerLoad">
                                                <div class="bounce1"></div>
                                                <div class="bounce2"></div>
                                                <div class="bounce3"></div>
                                            </div>
                                        </div>
                                        <div class="error-screen" style="text-align: center;display: grid;margin: 0 auto;">
                                            <div  class="message" style="display:none">
                                                <p>An error occurred while contacting the Skybase database center.</p>
                                                <p>Third Iron support has been notified.</p>
                                            </div>
                                            <div class="error-msg" style="display:none">
                                                <p>No journals found on this or related to this subject.!</p>
                                            </div>
                                        </div>
                                        <div class="mt-5" style="margin-top:15px">
                                            <button class="button" id="loadMoreButton" style="place-items: center;display: grid;margin: 0 auto;">Load More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    <div id="ember797" class="ember-view"></div>
                    <ul class="responsive-menu"></ul>
                </div>
            </div>
        </div>
        <?php $this->view('./components/NavDrawe');?>
    </div>
        <script src="<?=ASSETS?>js/vendor.min.js"></script>
        <script src="<?=ASSETS?>js/pubs-ui.min.js"></script>
        <script type="module" src="<?=ASSETS?>js/script.js"></script>
        <script type="module" src="<?=ASSETS?>js/el.js"></script>
    </body>

</html>