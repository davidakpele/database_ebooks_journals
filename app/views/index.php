<?php $this->view("./components/Header");?>
 <?php $authClass = new \Session\UserSessionManager(); ?>
    <body id="pagetop" class="oxy-ui pubs-ui hp-page">
        <?php $this->view("./components/Nav"); ?>
        <div class="media-desktop locale-en-us" id="locale-en-us">
            <div class="canvas">
                <div id="library-content" class="container ">
                <div id="ember620" class="splash-panel __f1079 hide-header ember-view">
                    <div class="content" id="o_cok_pl">
                        <div class="subjects-container" >
                            <ul class="responsive-menu"></ul>
                            <div id="ember625" class="__fbe9a ember-view">
                                <div>
                                    <?php 
                                        $authenticateUser = $authClass->authCheck();
                                    ?>
                                    <h3 class="subjects-library-attribution" style="<?=((($authenticateUser == false) ? 'margin-top:10px' : 'margin-top:-20px'))?> ">Access Provided By</h3>
                                    <!-- logo -->
                                    <?php $this->view("./components/Logo"); ?>
                                </div>
                            </div>
                            <div class="subjects-search-container clone_result">
                                <h3 class="subjects-search-sub-head">Find Journal By Title, Subject, or ISSN</h3>
                                <div id="ember637" class="search-pane-container __bd7a3 subjects ember-view">
                                    <ul role="dialog" class="search-pane complete">
                                        <li class="search-field-container" data-ember-action="" data-ember-action-640="640" data-ember-action-641="641">
                                            <div id="ember644" class="search-field __991a0 ember-view">
                                                <input aria-label="Find Journal By Title, Subject, or ISSN" type="text" autocomplete="off" title="Find Journal By Title, Subject, or ISSN" id="ember650" class="hero-search ember-text-field ember-view">
                                                <div class="icon" id="clear_icon">
                                                    <div class="magnifying-glass flaticon stroke magnifying-glass-2"></div>
                                                    <div tabindex="0" aria-label="Hit enter to clear search input or Hit tab to continue to library search result" class="clearer flaticon stroke x-2" data-ember-action="" data-ember-action-8304="8304" style="display:none"></div>
                                                    <div id="ember1178" class="__0d2b3 ember-view" style="display:none">
                                                        <div class="spinner align-right">
                                                            <div class="bounce1"></div>
                                                            <div class="bounce2"></div>
                                                            <div class="bounce3"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <div id="search_result"></div>
                                    </ul>
                                    <ul class="responsive-menu"></ul>
                                </div>
                            </div>
                            <div class="subjects-search-placeholder"></div>
                            <div id="ember651" class="search-pane-container __bd7a3 subjects ember-view">
                                <ul role="dialog" class="search-pane">
                                    <li class="exit" data-ember-action="" data-ember-action-652="652"></li>
                                </ul>
                                <ul class="responsive-menu"></ul>
                            </div>
                            <div class="subject-holder " id="subj_holder">
                                <h3 tabindex="0" class="subjects-sub-head" id="browser_hf">Browse Subjects</h3>
                                <div class="custom-loader" style="margin-top:10rem"></div>
                                <ul id="subjects-list"></ul>
                            </div>
                        </div>
                    </div>
                    <div class="banner" id="banner">
                        <div class="shadow-top"></div>
                        <div class="shadow-bottom"></div>
                    </div>
                </div>
            </div>
            </div>
        </div>
            
        </div>
        <div class="flash-messages">
        </div>
    </div>
</div>

 <?php $this->view('components/NavDrawe');?>
 <?php $this->view('components/Footer');?>