<?php $this->view('./components/Header');?>
<body id="pagetop" class="oxy-ui pubs-ui hp-page spin-loaded">
    <?php 
        $url=implode('',$_REQUEST);
        $urlParts = explode('/', $url);
    ?>
    <?php $this->view("./components/Nav"); ?>
    
    <div class="media-desktop locale-en-us content-container" id="mainContent" style="display:none">
      <div class="canvas">
        <div id="library-content" class="container js">
          <section aria-label="Journal" class="journal-toc">
            <aside>
              <section aria-label="<?=(isset($data['render_journal']['results']) ?$data['render_journal']['results']->journal_name : '')?>" class="journal">
                  <div class="backdrop"></div>
                  <section aria-label="Journal Header" class="rest">
                      <div id="ember1431" class="journal-cover __771d8 ember-view">
                          <div class="image-container">
                              <img src="<?=(isset($data['render_journal']['results']) ? ROOT.$data['render_journal']['results']->imagedata : '')?>"
                                  alt="<?=(isset($data['render_journal']['results']) ? $data['render_journal']['results']->journal_name : '')?>"
                                  title="<?=(isset($data['render_journal']['results']) ? $data['render_journal']['results']->journal_name : '')?>">
                              <div class="article-meta-data">
                                  <h1 ><?=(isset($data['render_journal']['results']) ? $data['render_journal']['results']->journal_name : '')?></h1>
                                  <a target="_new" href="http://www.scimagojr.com/journalsearch.php?q=1062-4783&amp;tip=iss" id="ember6563" class="scimago-rank ember-view">SJR: <span>0.12</span></a>
                              </div>
                              <div class="back-button back"  data-ember-action-2413="2413">
                                  <a href="#" ><span class="left-2 flaticon stroke"></span>Back to Journals</a>
                              </div>
                          </div>
                      </div>
                      <h1  class="journal-title"><?=(isset($data['render_journal']['results']) ?$data['render_journal']['results']->journal_name : '')?></h1>
                      <button aria-label="Add to my bookshelf"  class="my-bookshelf button outline tabindex">
                          <span class="icon-and-text">
                          <span class="icon flaticon solid plus-2"></span>
                          <span class="label">Add to my bookshelf</span>
                          </span>
                      </button>
                  </section>
              </section>
              <div id="ember1612" class="__fc988 ember-view sidebar_yearlisting">
                <section aria-label="Journal Issues" class="back-issues issues ">
                  <div class="header-container">
                    <header tabindex="0">Journal Issues</header>
                  </div>
                  <div class="back-issue-navigation">
                    <!-- load year of published data -->
                    <div class="years year-item-list"></div>
                    <!-- load the volume  -->
                    <div class="back-issue-items"></div>
                  </div>
                </section>
              </div>
              <ul class="controls">
                  <li  class="back back-button tabindex"  data-ember-action-2446="2446">
                      <span aria-hidden="true" class="icon flaticon solid left-2"></span> Back
                  </li>
                  <li  class="issues tabindex"  data-ember-action-2447="2447" id="ViewYearsListInMobileVersion">
                      Issues <span aria-hidden="true" class="icon flaticon solid down-2"></span>
                  </li>
                  <li  class="related  tabindex"  data-ember-action-2448="2448" id="RelationShipList">
                      Related <span aria-hidden="true" class="icon flaticon solid down-2"></span>
                  </li>
              </ul>
              <div id="ember3134" class="invisible_yrsList __fc988 ember-view hiddenyearlist active_hidden">
                <section aria-label="Publication Years" class="years mobile-year-listing" id="mobile-year-listing">
                    <ul></ul>
                </section>

                <section aria-label="Journal Issues" class="back-issues issues" id="mobile-volume-listing">
                </section>
              </div>

              <section aria-label="Browse Related Subjects" class="related-bookshelves Selectactive_hidden" id="OpenRelationShipList">
                <header >Browse Related Subjects</header>
                  <div id="ember1984" class="ember-view">            
                  <div class="bookshelf" id="related_journal"></div>
                </div>
              </section>
            </aside>
            <main>
              <header id="main-content" class="issue  no-unread-articles" style="display:block">
                <div class="issue-info" style="display:flex; gap:3">
                  <h4 class="date" id="active-article-year"></h4>
                  <h3  class="title" id="active-article-volume"></h3>
                </div>
                <div id="loading-more" style="display:none;">
                  <div class="loading-text">
                      Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
                  </div>
                </div>
                <div class="issue-buttons"></div>
              </header>

              <div class="article-list __1c09d ember-view article-list-padding">
                <div id="ember2742" class="infinite-scroller ember-view">
                        
                  <div id="main-body-section" class="article-list-item __6ba9e ember-view article-list-container">
                  </div>
                <div class="bz-modal-backdrop"></div>
              </div>
            </main>
          </section>
                <?php $this->view('./components/NavDrawe');?>
            </div>
        </div>
      </div>
    </div>

    <div style="margin-bottom:60px">
      <div class="bookshelf-loading-indicator" id="loading" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999;">
        <div id="ember1952" class="__0d2b3 ember-view">
            <div class="spinner align-center" style="display: none;" id="spinnerLoad">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
        </div>
        <div class="error-screen" style="text-align: center; display: grid; margin: 0 auto;">
            <div class="message" style="display:none">
                <p>An error occurred while contacting the Skybase database center.</p>
                <p>Third Iron support has been notified.</p>
            </div>
            <div class="error-msg" style="display:none">
                <p>This Journal is not available at the moment.</p>
            </div>
        </div>
        <div class="mt-5" style="margin-top:15px">
            <button class="button" id="loadMoreButton" style="place-items: center; display: grid; margin: 0 auto;">Load More</button>
        </div>
      </div>
    </div>
        <script src="<?=ASSETS?>js/vendor.min.js"></script>
        <script src="<?=ASSETS?>js/pubs-ui.min.js"></script>
        <script  type="module" src="<?=ASSETS?>js/script.js"></script>
        <script type="module" src="<?=ASSETS?>js/ev.js"></script>
    </body>

</html>