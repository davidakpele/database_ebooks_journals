<?php $this->view('./components/Header');?>
<body id="pagetop" class="oxy-ui pubs-ui hp-page">
    <?php 
        $url=implode('',$_REQUEST);
        $urlParts = explode('/', $url);
    ?>
    <?php $this->view("./components/Nav"); ?>
    <div class="media-desktop locale-en-us">
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
                                    <header>Journal Issues</header>
                                </div>
                                <div class="back-issue-navigation">
                                    <div class="years">
                                        <?php 
                                            if(!empty($data['issue_years'])):
                                                foreach($data['issue_years'] as $index=>$issue):
                                                    if($data['urlPath'][5]=='current' && $index===0 && is_string($data['urlPath'][5])){
                                                        $class_os =' year selected os_active tabindex ';
                                                    }elseif(is_numeric($data['urlPath'][5]) && $issue['id']==$data['urlPath'][5]){
                                                        $class_os =' year selected os_active tabindex ';
                                                    }else{
                                                        $class_os =' year tabindex ';
                                                    }
                                                    $year = date("Y", strtotime($issue['date']))?>
                                                    <div class="<?=$class_os?>" onclick="loading_issue_year(<?=$issue['id']?>)"><?php echo $year?>
                                                        <span class="icon arrow flaticon solid right-2"></span>
                                                    </div>
                                            <?php endforeach;?>
                                        <?php endif;?>
          
<div id="ember1635" class="ember-view">            <a href="https://idiscover.lib.cam.ac.uk/primo-explore/search?query=any,exact,0161-5440,OR&amp;query=any,exact,(1940-1906),AND&amp;pfilter=pfilter,exact,journals,AND&amp;tab=cam_lib_coll&amp;search_scope=SCOP_CAM_ALL&amp;sortby=rank&amp;vid=44CAM_PROD&amp;mode=advanced&amp;offset=0" target="_blank" class="all-back-issues-link">
                See All
              <span class="icon fa fa-external-link"></span>
            </a>
</div>      </div>
      <div class="back-issue-items">
          <div id="ember1636" class="issue active-override ember-view"><a  href="/libraries/603/journals/17580/issues/518948601?sort=title" id="ember1637" class="active ember-view">  <span class="label"  data-ember-action-1638="1638">Vol 56 Issue 2</span>

  <div class="accessories">
<!---->
<!---->
<!---->
    <span class="icon arrow flaticon solid right-2"></span>
  </div>
</a></div>
          <div id="ember1639" class="issue ember-view"><a  href="/libraries/603/journals/17580/issues/514668158?sort=title" id="ember1640" class="ember-view">  <span class="label"  data-ember-action-1641="1641">Vol 56 Issue 1</span>

  <div class="accessories">
<!---->
<!---->
<!---->
    <span class="icon arrow flaticon solid right-2"></span>
  </div>
</a></div>
      </div>
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
                            <section aria-label="New Articles" class="articles-in-press issues">
                                <div class="header-container">
                                    <header >New Articles</header>
                                </div>
                                <div id="ember3135" class="issue ember-view">
                                    <a  href="/libraries/603/journals/17580/articles-in-press?sort=title" id="ember3136" class="ember-view">  
                                        <span class="label"  data-ember-action-3137="3137">Articles in Press</span>
                                        <div class="accessories">
                                            <span class="icon arrow flaticon solid right-2"></span>
                                        </div>
                                    </a>
                                </div>
                            </section>
                            <section aria-label="Publication Years" class="years">
                                <ul>
                                    <li  class="year selected tabindex"  data-ember-action-3138="3138">2023</li>
                                    <li  class="year  tabindex"  data-ember-action-3139="3139">2022</li>
                                    <li  class="year  tabindex"  data-ember-action-3140="3140">2021</li>
                                    <li  class="year  tabindex"  data-ember-action-3141="3141">2020</li>
                                   
                                    <li  class="year  tabindex"  data-ember-action-3156="3156">2005</li>
                                    <div id="ember3157" class="all-issues ember-view">          
                                        <li  class="all-back-issues-link tabindex">
                                            <a href="https://idiscover.lib.cam.ac.uk/primo-explore/search?query=any,exact,0161-5440,OR&amp;query=any,exact,(1940-1906),AND&amp;pfilter=pfilter,exact,journals,AND&amp;tab=cam_lib_coll&amp;search_scope=SCOP_CAM_ALL&amp;sortby=rank&amp;vid=44CAM_PROD&amp;mode=advanced&amp;offset=0" target="_blank">
                                                See All
                                                <span class="icon fa fa-external-link"></span>
                                            </a>
                                        </li>
                                    </div>    
                                </ul>
                            </section>
                            <section aria-label="Journal Issues" class="back-issues issues">
                                <div id="ember3158" class="issue active-override ember-view">
                                    <a  href="/libraries/603/journals/17580/issues/518948601?sort=title" id="ember3159" class="ember-view">  
                                        <span class="label"  data-ember-action-3160="3160">Vol. 56 Issue 2</span>
                                        <div class="accessories">
                                            <span class="icon arrow flaticon solid right-2"></span>
                                        </div>
                                    </a>
                                </div>
                                <div id="ember3161" class="issue ember-view">
                                    <a  href="/libraries/603/journals/17580/issues/514668158?sort=title" id="ember3162" class="ember-view">  
                                        <span class="label"  data-ember-action-3163="3163">Vol. 56 Issue 1</span>
                                        <div class="accessories">
                                            <span class="icon arrow flaticon solid right-2"></span>
                                        </div>
                                    </a>
                                </div>
                            </section>
                        </div>
                        <section aria-label="Browse Related Subjects" class="related-bookshelves Selectactive_hidden" id="OpenRelationShipList">
                          <header >Browse Related Subjects</header>
                          <div id="ember1984" class="ember-view">            
                            <div class="bookshelf">
                              <span class="icon flaticon solid files-1"></span>
                              <a  title="Food Science - General/Interdisciplinary" href="/libraries/603/subjects/60/bookcases/94/bookshelves/322?sort=title" id="ember1985" class="ember-view">                
                                <span class="label">Food Science - General/Interdisciplinary</span>
                              </a>     
                            </div>
                          </div>
                          <div id="ember1986" class="ember-view">            
                            <div class="bookshelf">
                              <span class="icon flaticon solid files-1"></span>
                              <a  title="Food Technology/Biotechnology" href="/libraries/603/subjects/60/bookcases/94/bookshelves/318?sort=title" id="ember1987" class="ember-view">                
                                <span class="label">Food Technology/Biotechnology</span>
                              </a>            
                            </div>
                                </div>      
                                </section>
                     
                        </aside>



                      <main>
                        <header id="main-content" class="issue  no-unread-articles">
  <div class="issue-info">
      <h4 class="date">2023</h4>
      <h3  class="title">Vol. 3 Issue 11</h3>
  </div>
  <div class="issue-buttons"></div>
</header>
  <div id="ember2741" class="article-list __1c09d ember-view article-list-padding">
    <div id="ember2742" class="infinite-scroller ember-view">      
      <div id="ember2744" class="article-list-item __6ba9e ember-view">
        <article aria-label="Issue Editorial Masthead" class="584267608   no-unread-articles  ">
          <table class="article-split-container">
        <tr>
          <td class="metadata-container">
            <section aria-label="Metadata for Issue Editorial Masthead" class="article-list-item-content-block ">
              <div class="title "  data-ember-action-2745="2745">
                <div id="ember2746" class="ember-view">
                  <a target="_blank"  href="/libraries/603/articles/595092488?sort=title" id="ember2747" class="ember-view">Issue Editorial Masthead</a>
                </div>                            
              </div>
              <div class="metadata"></div>
              <div class="content-overflow "  data-ember-action-2748="2748">
                <span class="chevron icon flaticon solid down-2"></span>
              </div>
              <div class="tools ">
                <div class="buttons noselect">
                  <div class="button invisible download-pdf"  data-ember-action-2749="2749">
                    <div id="ember2750" class="ember-view">
                      <a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/595092488/pdf?sort=title" id="ember2751" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                        <span class="aria-hidden">Download PDF - Issue Editorial Masthead</span>
                      </a>
                    </div>          
                  </div>
                  <div class="button invisible read-full-text"  data-ember-action-2752="2752">
<div id="ember2753" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/595092488?sort=title" id="ember2754" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Issue Editorial Masthead</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-2755="2755">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Issue Editorial Masthead</span>
                    </a>
                  </div>

                  <div id="ember2756" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-2757="2757">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Issue Editorial Masthead</span>
  </a>
</div>
<!----></div>

                  <div id="ember2758" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-2759="2759">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Issue Editorial Masthead</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember2760" class="collection-modal __9c85b ember-view"><div id="ember2761" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-2762="2762">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-2763="2763">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-2764="2764">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-2765="2765">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2766" class="confirm-modal ember-view"><div id="ember2767" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2768" class="citation-modal __26b60 ember-view"><div id="ember2769" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-2770="2770">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-2771="2771">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-2772="2772">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-2773="2773">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-2774="2774">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-2775="2775">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-2776="2776">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2777" class="share-modal __96958 ember-view"><div id="ember2778" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li class="service">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-2780="2780">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-2781="2781">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-2782="2782">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-2783="2783">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2784" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember2785" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember2787" class="article-list-item __6ba9e ember-view"><article aria-label="Issue Publication Information" class="584267610   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Issue Publication Information" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-2788="2788">
<div id="ember2789" class="ember-view"><a target="_blank"  href="/libraries/603/articles/595092490?sort=title" id="ember2790" class="ember-view">                        Issue Publication Information
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
<!---->
<!---->
<!---->
<!---->            </div>

<!---->
            <div class="content-overflow "  data-ember-action-2791="2791">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-2792="2792">
<div id="ember2793" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/595092490/pdf?sort=title" id="ember2794" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Issue Publication Information</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-2795="2795">
<div id="ember2796" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/595092490?sort=title" id="ember2797" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Issue Publication Information</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-2798="2798">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Issue Publication Information</span>
                    </a>
                  </div>

                  <div id="ember2799" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-2800="2800">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Issue Publication Information</span>
  </a>
</div>
<!----></div>

                  <div id="ember2801" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-2802="2802">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Issue Publication Information</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember2803" class="collection-modal __9c85b ember-view"><div id="ember2804" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-2805="2805">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-2806="2806">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-2807="2807">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-2808="2808">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2809" class="confirm-modal ember-view"><div id="ember2810" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2811" class="citation-modal __26b60 ember-view"><div id="ember2812" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-2813="2813">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-2814="2814">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-2815="2815">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-2816="2816">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-2817="2817">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-2818="2818">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-2819="2819">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2820" class="share-modal __96958 ember-view"><div id="ember2821" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-2822="2822">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-2823="2823">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-2824="2824">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-2825="2825">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-2826="2826">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2827" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember2828" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember2830" class="article-list-item __6ba9e ember-view"><article aria-label="Pigeon Pea, An Emerging Source of Plant-Based Proteins" class="582985615   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Pigeon Pea, An Emerging Source of Plant-Based Proteins" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-2831="2831">
<div id="ember2832" class="ember-view"><a target="_blank"  href="/libraries/603/articles/593811164?sort=title" id="ember2833" class="ember-view">                        Pigeon Pea, An Emerging Source of Plant-Based Proteins
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1777–1799
                    </span>

<!---->
                <span class="authors"  data-ember-action-2834="2834">
                    <span  class="preview tabindex">
                      Locali-Pereira, Adilson Roberto; Boire, Adeline; Berton-Carabin, Claire; … Nicoletti, Vânia Regina
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-2835="2835">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-2836="2836">
<div id="ember2837" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/593811164/pdf?sort=title" id="ember2838" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Pigeon Pea, An Emerging Source of Plant-Based Proteins</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-2839="2839">
<div id="ember2840" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/593811164?sort=title" id="ember2841" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Pigeon Pea, An Emerging Source of Plant-Based Proteins</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-2842="2842">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Pigeon Pea, An Emerging Source of Plant-Based Proteins</span>
                    </a>
                  </div>

                  <div id="ember2843" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-2844="2844">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Pigeon Pea, An Emerging Source of Plant-Based Proteins</span>
  </a>
</div>
<!----></div>

                  <div id="ember2845" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-2846="2846">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Pigeon Pea, An Emerging Source of Plant-Based Proteins</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember2847" class="collection-modal __9c85b ember-view"><div id="ember2848" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-2849="2849">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-2850="2850">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-2851="2851">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-2852="2852">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2853" class="confirm-modal ember-view"><div id="ember2854" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2855" class="citation-modal __26b60 ember-view"><div id="ember2856" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-2857="2857">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-2858="2858">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-2859="2859">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-2860="2860">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-2861="2861">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-2862="2862">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-2863="2863">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2864" class="share-modal __96958 ember-view"><div id="ember2865" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-2866="2866">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-2867="2867">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-2868="2868">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-2869="2869">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-2870="2870">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2871" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember2872" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember2874" class="article-list-item __6ba9e ember-view"><article aria-label="Impact of Antimicrobial Composite Coatings Based on Arabinoxylan and Cellulose/Starch Stearic Acid Ester on Improving the Post-Harvest Quality of Guava ( Psidium guajava )" class="579407075   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Impact of Antimicrobial Composite Coatings Based on Arabinoxylan and Cellulose/Starch Stearic Acid Ester on Improving the Post-Harvest Quality of Guava ( Psidium guajava )" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-2875="2875">
<div id="ember2876" class="ember-view"><a target="_blank"  href="/libraries/603/articles/590240582?sort=title" id="ember2877" class="ember-view">                        Impact of Antimicrobial Composite Coatings Based on Arabinoxylan and Cellulose/Starch Stearic Acid Ester on Improving the Post-Harvest Quality of Guava ( Psidium guajava )
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1800–1814
                    </span>

<!---->
                <span class="authors"  data-ember-action-2878="2878">
                    <span  class="preview tabindex">
                      Kanwar, Swati; Gumber, Sakshi; Mazumder, Koushik
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow "  data-ember-action-2879="2879">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-2880="2880">
<div id="ember2881" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/590240582/pdf?sort=title" id="ember2882" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Impact of Antimicrobial Composite Coatings Based on Arabinoxylan and Cellulose/Starch Stearic Acid Ester on Improving the Post-Harvest Quality of Guava ( Psidium guajava )</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-2883="2883">
<div id="ember2884" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/590240582?sort=title" id="ember2885" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Impact of Antimicrobial Composite Coatings Based on Arabinoxylan and Cellulose/Starch Stearic Acid Ester on Improving the Post-Harvest Quality of Guava ( Psidium guajava )</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-2886="2886">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Impact of Antimicrobial Composite Coatings Based on Arabinoxylan and Cellulose/Starch Stearic Acid Ester on Improving the Post-Harvest Quality of Guava ( Psidium guajava )</span>
                    </a>
                  </div>

                  <div id="ember2887" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-2888="2888">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Impact of Antimicrobial Composite Coatings Based on Arabinoxylan and Cellulose/Starch Stearic Acid Ester on Improving the Post-Harvest Quality of Guava ( Psidium guajava )</span>
  </a>
</div>
<!----></div>

                  <div id="ember2889" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-2890="2890">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Impact of Antimicrobial Composite Coatings Based on Arabinoxylan and Cellulose/Starch Stearic Acid Ester on Improving the Post-Harvest Quality of Guava ( Psidium guajava )</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember2891" class="collection-modal __9c85b ember-view"><div id="ember2892" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-2893="2893">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-2894="2894">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-2895="2895">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-2896="2896">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2897" class="confirm-modal ember-view"><div id="ember2898" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2899" class="citation-modal __26b60 ember-view"><div id="ember2900" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-2901="2901">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-2902="2902">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-2903="2903">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-2904="2904">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-2905="2905">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-2906="2906">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-2907="2907">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2908" class="share-modal __96958 ember-view"><div id="ember2909" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-2910="2910">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-2911="2911">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-2912="2912">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-2913="2913">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-2914="2914">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2915" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember2916" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember2918" class="article-list-item __6ba9e ember-view"><article aria-label="Development of Nanoencapsulated Curcumin-Based Photoactive Edible Packaging and Its Application on Strawberry Preservation" class="575314240   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Development of Nanoencapsulated Curcumin-Based Photoactive Edible Packaging and Its Application on Strawberry Preservation" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-2919="2919">
<div id="ember2920" class="ember-view"><a target="_blank"  href="/libraries/603/articles/586147873?sort=title" id="ember2921" class="ember-view">                        Development of Nanoencapsulated Curcumin-Based Photoactive Edible Packaging and Its Application on Strawberry Preservation
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1815–1823
                    </span>

<!---->
                <span class="authors"  data-ember-action-2922="2922">
                    <span  class="preview tabindex">
                      Arboleda-Murillo, J. Alejandro; Sanchez, Leidy T.; Villa, Cristian C.
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow "  data-ember-action-2923="2923">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-2924="2924">
<div id="ember2925" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/586147873/pdf?sort=title" id="ember2926" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Development of Nanoencapsulated Curcumin-Based Photoactive Edible Packaging and Its Application on Strawberry Preservation</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-2927="2927">
<div id="ember2928" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/586147873?sort=title" id="ember2929" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Development of Nanoencapsulated Curcumin-Based Photoactive Edible Packaging and Its Application on Strawberry Preservation</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-2930="2930">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Development of Nanoencapsulated Curcumin-Based Photoactive Edible Packaging and Its Application on Strawberry Preservation</span>
                    </a>
                  </div>

                  <div id="ember2931" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-2932="2932">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Development of Nanoencapsulated Curcumin-Based Photoactive Edible Packaging and Its Application on Strawberry Preservation</span>
  </a>
</div>
<!----></div>

                  <div id="ember2933" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-2934="2934">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Development of Nanoencapsulated Curcumin-Based Photoactive Edible Packaging and Its Application on Strawberry Preservation</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember2935" class="collection-modal __9c85b ember-view"><div id="ember2936" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-2937="2937">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-2938="2938">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-2939="2939">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-2940="2940">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2941" class="confirm-modal ember-view"><div id="ember2942" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2943" class="citation-modal __26b60 ember-view"><div id="ember2944" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-2945="2945">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-2946="2946">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-2947="2947">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-2948="2948">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-2949="2949">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-2950="2950">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-2951="2951">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2952" class="share-modal __96958 ember-view"><div id="ember2953" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-2954="2954">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-2955="2955">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-2956="2956">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-2957="2957">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-2958="2958">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2959" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember2960" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember2962" class="article-list-item __6ba9e ember-view"><article aria-label="Dual-Mode Plasmonic and Paper-Based Colorimetric Assays for the Determination of Riboflavin in Green Leafy Vegetables and Whole Grains" class="582392141   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Dual-Mode Plasmonic and Paper-Based Colorimetric Assays for the Determination of Riboflavin in Green Leafy Vegetables and Whole Grains" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-2963="2963">
<div id="ember2964" class="ember-view"><a target="_blank"  href="/libraries/603/articles/593217739?sort=title" id="ember2965" class="ember-view">                        Dual-Mode Plasmonic and Paper-Based Colorimetric Assays for the Determination of Riboflavin in Green Leafy Vegetables and Whole Grains
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1824–1834
                    </span>

<!---->
                <span class="authors"  data-ember-action-2966="2966">
                    <span  class="preview tabindex">
                      Tikeshwari; Shrivas, Kamlesh; Patel, Sanyukta; … Ghosh, Kallol K.
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-2967="2967">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-2968="2968">
<div id="ember2969" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/593217739/pdf?sort=title" id="ember2970" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Dual-Mode Plasmonic and Paper-Based Colorimetric Assays for the Determination of Riboflavin in Green Leafy Vegetables and Whole Grains</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-2971="2971">
<div id="ember2972" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/593217739?sort=title" id="ember2973" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Dual-Mode Plasmonic and Paper-Based Colorimetric Assays for the Determination of Riboflavin in Green Leafy Vegetables and Whole Grains</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-2974="2974">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Dual-Mode Plasmonic and Paper-Based Colorimetric Assays for the Determination of Riboflavin in Green Leafy Vegetables and Whole Grains</span>
                    </a>
                  </div>

                  <div id="ember2975" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-2976="2976">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Dual-Mode Plasmonic and Paper-Based Colorimetric Assays for the Determination of Riboflavin in Green Leafy Vegetables and Whole Grains</span>
  </a>
</div>
<!----></div>

                  <div id="ember2977" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-2978="2978">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Dual-Mode Plasmonic and Paper-Based Colorimetric Assays for the Determination of Riboflavin in Green Leafy Vegetables and Whole Grains</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember2979" class="collection-modal __9c85b ember-view"><div id="ember2980" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-2981="2981">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-2982="2982">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-2983="2983">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-2984="2984">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2985" class="confirm-modal ember-view"><div id="ember2986" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2987" class="citation-modal __26b60 ember-view"><div id="ember2988" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-2989="2989">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-2990="2990">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-2991="2991">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-2992="2992">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-2993="2993">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-2994="2994">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-2995="2995">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember2996" class="share-modal __96958 ember-view"><div id="ember2997" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-2998="2998">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-2999="2999">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3000="3000">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3001="3001">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3002="3002">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3003" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3004" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3006" class="article-list-item __6ba9e ember-view"><article aria-label="Impact of Cooking and Extrusion Processing on Nutritional, Antinutritional, and Techno-Functional Characteristics of Indigenous Bean ( Phaseolus coccineus )" class="581841610   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Impact of Cooking and Extrusion Processing on Nutritional, Antinutritional, and Techno-Functional Characteristics of Indigenous Bean ( Phaseolus coccineus )" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3007="3007">
<div id="ember3008" class="ember-view"><a target="_blank"  href="/libraries/603/articles/592667208?sort=title" id="ember3009" class="ember-view">                        Impact of Cooking and Extrusion Processing on Nutritional, Antinutritional, and Techno-Functional Characteristics of Indigenous Bean ( Phaseolus coccineus )
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1835–1853
                    </span>

<!---->
                <span class="authors"  data-ember-action-3010="3010">
                    <span  class="preview tabindex">
                      Osuna-Gallardo, Evelyn I.; Cuevas-Rodríguez, Edith O.; Sepúlveda-García, Carlos I.; … Hernández-Álvarez, Alan J.
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-3011="3011">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3012="3012">
<div id="ember3013" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/592667208/pdf?sort=title" id="ember3014" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Impact of Cooking and Extrusion Processing on Nutritional, Antinutritional, and Techno-Functional Characteristics of Indigenous Bean ( Phaseolus coccineus )</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3015="3015">
<div id="ember3016" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/592667208?sort=title" id="ember3017" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Impact of Cooking and Extrusion Processing on Nutritional, Antinutritional, and Techno-Functional Characteristics of Indigenous Bean ( Phaseolus coccineus )</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3018="3018">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Impact of Cooking and Extrusion Processing on Nutritional, Antinutritional, and Techno-Functional Characteristics of Indigenous Bean ( Phaseolus coccineus )</span>
                    </a>
                  </div>

                  <div id="ember3019" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3020="3020">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Impact of Cooking and Extrusion Processing on Nutritional, Antinutritional, and Techno-Functional Characteristics of Indigenous Bean ( Phaseolus coccineus )</span>
  </a>
</div>
<!----></div>

                  <div id="ember3021" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3022="3022">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Impact of Cooking and Extrusion Processing on Nutritional, Antinutritional, and Techno-Functional Characteristics of Indigenous Bean ( Phaseolus coccineus )</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3023" class="collection-modal __9c85b ember-view"><div id="ember3024" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3025="3025">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3026="3026">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3027="3027">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3028="3028">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3029" class="confirm-modal ember-view"><div id="ember3030" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3031" class="citation-modal __26b60 ember-view"><div id="ember3032" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3033="3033">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3034="3034">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3035="3035">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3036="3036">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3037="3037">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3038="3038">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3039="3039">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3040" class="share-modal __96958 ember-view"><div id="ember3041" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3042="3042">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3043="3043">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3044="3044">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3045="3045">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3046="3046">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3047" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3048" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3050" class="article-list-item __6ba9e ember-view"><article aria-label="Biocompatible PVC Derivatives with Some Natural Substances for Potential Active Food Packaging Materials" class="582781101   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Biocompatible PVC Derivatives with Some Natural Substances for Potential Active Food Packaging Materials" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3051="3051">
<div id="ember3052" class="ember-view"><a target="_blank"  href="/libraries/603/articles/593606650?sort=title" id="ember3053" class="ember-view">                        Biocompatible PVC Derivatives with Some Natural Substances for Potential Active Food Packaging Materials
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1854–1863
                    </span>

<!---->
                <span class="authors"  data-ember-action-3054="3054">
                    <span  class="preview tabindex">
                      Hazer, Baki; Karahaliloğlu, Zeynep
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow "  data-ember-action-3055="3055">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3056="3056">
<div id="ember3057" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/593606650/pdf?sort=title" id="ember3058" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Biocompatible PVC Derivatives with Some Natural Substances for Potential Active Food Packaging Materials</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3059="3059">
<div id="ember3060" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/593606650?sort=title" id="ember3061" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Biocompatible PVC Derivatives with Some Natural Substances for Potential Active Food Packaging Materials</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3062="3062">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Biocompatible PVC Derivatives with Some Natural Substances for Potential Active Food Packaging Materials</span>
                    </a>
                  </div>

                  <div id="ember3063" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3064="3064">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Biocompatible PVC Derivatives with Some Natural Substances for Potential Active Food Packaging Materials</span>
  </a>
</div>
<!----></div>

                  <div id="ember3065" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3066="3066">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Biocompatible PVC Derivatives with Some Natural Substances for Potential Active Food Packaging Materials</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3067" class="collection-modal __9c85b ember-view"><div id="ember3068" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3069="3069">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3070="3070">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3071="3071">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3072="3072">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3073" class="confirm-modal ember-view"><div id="ember3074" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3075" class="citation-modal __26b60 ember-view"><div id="ember3076" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3077="3077">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3078="3078">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3079="3079">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3080="3080">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3081="3081">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3082="3082">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3083="3083">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3084" class="share-modal __96958 ember-view"><div id="ember3085" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3086="3086">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3087="3087">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3088="3088">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3089="3089">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3090="3090">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3091" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3092" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3094" class="article-list-item __6ba9e ember-view"><article aria-label="Metabolic Profiling, Antioxidant Activity, and Alpha-Glucosidase Inhibitory Activity of the Roasted Beans of Luwak (Civet) Coffee" class="581170585   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Metabolic Profiling, Antioxidant Activity, and Alpha-Glucosidase Inhibitory Activity of the Roasted Beans of Luwak (Civet) Coffee" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3095="3095">
<div id="ember3096" class="ember-view"><a target="_blank"  href="/libraries/603/articles/591996184?sort=title" id="ember3097" class="ember-view">                        Metabolic Profiling, Antioxidant Activity, and Alpha-Glucosidase Inhibitory Activity of the Roasted Beans of Luwak (Civet) Coffee
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1864–1876
                    </span>

<!---->
                <span class="authors"  data-ember-action-3098="3098">
                    <span  class="preview tabindex">
                      Febrina, Lizma; Happyana, Nizar; Syah, Yana Maolana
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow "  data-ember-action-3099="3099">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3100="3100">
<div id="ember3101" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/591996184/pdf?sort=title" id="ember3102" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Metabolic Profiling, Antioxidant Activity, and Alpha-Glucosidase Inhibitory Activity of the Roasted Beans of Luwak (Civet) Coffee</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3103="3103">
<div id="ember3104" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/591996184?sort=title" id="ember3105" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Metabolic Profiling, Antioxidant Activity, and Alpha-Glucosidase Inhibitory Activity of the Roasted Beans of Luwak (Civet) Coffee</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3106="3106">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Metabolic Profiling, Antioxidant Activity, and Alpha-Glucosidase Inhibitory Activity of the Roasted Beans of Luwak (Civet) Coffee</span>
                    </a>
                  </div>

                  <div id="ember3107" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3108="3108">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Metabolic Profiling, Antioxidant Activity, and Alpha-Glucosidase Inhibitory Activity of the Roasted Beans of Luwak (Civet) Coffee</span>
  </a>
</div>
<!----></div>

                  <div id="ember3109" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3110="3110">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Metabolic Profiling, Antioxidant Activity, and Alpha-Glucosidase Inhibitory Activity of the Roasted Beans of Luwak (Civet) Coffee</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3111" class="collection-modal __9c85b ember-view"><div id="ember3112" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3113="3113">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3114="3114">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3115="3115">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3116="3116">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3117" class="confirm-modal ember-view"><div id="ember3118" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3119" class="citation-modal __26b60 ember-view"><div id="ember3120" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3121="3121">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3122="3122">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3123="3123">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3124="3124">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3125="3125">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3126="3126">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3127="3127">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3128" class="share-modal __96958 ember-view"><div id="ember3129" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3130="3130">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3131="3131">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3132="3132">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3133="3133">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3134="3134">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3135" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3136" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3138" class="article-list-item __6ba9e ember-view"><article aria-label="Current Status of Marine Animal Derived Polysaccharides in Sustainable Food Packaging" class="578982765   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Current Status of Marine Animal Derived Polysaccharides in Sustainable Food Packaging" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3139="3139">
<div id="ember3140" class="ember-view"><a target="_blank"  href="/libraries/603/articles/589816272?sort=title" id="ember3141" class="ember-view">                        Current Status of Marine Animal Derived Polysaccharides in Sustainable Food Packaging
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1877–1889
                    </span>

<!---->
                <span class="authors"  data-ember-action-3142="3142">
                    <span  class="preview tabindex">
                      Sarkar, Saurav; Manna, Sreejan; Das, Stabak; … Nandi, Gouranga
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-3143="3143">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3144="3144">
<div id="ember3145" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/589816272/pdf?sort=title" id="ember3146" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Current Status of Marine Animal Derived Polysaccharides in Sustainable Food Packaging</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3147="3147">
<div id="ember3148" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/589816272?sort=title" id="ember3149" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Current Status of Marine Animal Derived Polysaccharides in Sustainable Food Packaging</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3150="3150">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Current Status of Marine Animal Derived Polysaccharides in Sustainable Food Packaging</span>
                    </a>
                  </div>

                  <div id="ember3151" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3152="3152">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Current Status of Marine Animal Derived Polysaccharides in Sustainable Food Packaging</span>
  </a>
</div>
<!----></div>

                  <div id="ember3153" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3154="3154">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Current Status of Marine Animal Derived Polysaccharides in Sustainable Food Packaging</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3155" class="collection-modal __9c85b ember-view"><div id="ember3156" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3157="3157">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3158="3158">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3159="3159">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3160="3160">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3161" class="confirm-modal ember-view"><div id="ember3162" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3163" class="citation-modal __26b60 ember-view"><div id="ember3164" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3165="3165">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3166="3166">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3167="3167">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3168="3168">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3169="3169">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3170="3170">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3171="3171">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3172" class="share-modal __96958 ember-view"><div id="ember3173" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3174="3174">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3175="3175">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3176="3176">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3177="3177">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3178="3178">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3179" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3180" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3182" class="article-list-item __6ba9e ember-view"><article aria-label="Impact of Roasting Temperature and Seed Presence on Carob Flour ( Ceratonia siliqua L.): Physical, Chemical, and Functional Properties" class="578444136   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Impact of Roasting Temperature and Seed Presence on Carob Flour ( Ceratonia siliqua L.): Physical, Chemical, and Functional Properties" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3183="3183">
<div id="ember3184" class="ember-view"><a target="_blank"  href="/libraries/603/articles/589277643?sort=title" id="ember3185" class="ember-view">                        Impact of Roasting Temperature and Seed Presence on Carob Flour ( Ceratonia siliqua L.): Physical, Chemical, and Functional Properties
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1890–1902
                    </span>

<!---->
                <span class="authors"  data-ember-action-3186="3186">
                    <span  class="preview tabindex">
                      Brassesco, María Emilia; Martins Vilas-Boas, Ana; Brandão, Teresa R. S.; … Pintado, Manuela
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-3187="3187">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3188="3188">
<div id="ember3189" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/589277643/pdf?sort=title" id="ember3190" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Impact of Roasting Temperature and Seed Presence on Carob Flour ( Ceratonia siliqua L.): Physical, Chemical, and Functional Properties</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3191="3191">
<div id="ember3192" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/589277643?sort=title" id="ember3193" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Impact of Roasting Temperature and Seed Presence on Carob Flour ( Ceratonia siliqua L.): Physical, Chemical, and Functional Properties</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3194="3194">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Impact of Roasting Temperature and Seed Presence on Carob Flour ( Ceratonia siliqua L.): Physical, Chemical, and Functional Properties</span>
                    </a>
                  </div>

                  <div id="ember3195" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3196="3196">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Impact of Roasting Temperature and Seed Presence on Carob Flour ( Ceratonia siliqua L.): Physical, Chemical, and Functional Properties</span>
  </a>
</div>
<!----></div>

                  <div id="ember3197" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3198="3198">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Impact of Roasting Temperature and Seed Presence on Carob Flour ( Ceratonia siliqua L.): Physical, Chemical, and Functional Properties</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3199" class="collection-modal __9c85b ember-view"><div id="ember3200" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3201="3201">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3202="3202">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3203="3203">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3204="3204">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3205" class="confirm-modal ember-view"><div id="ember3206" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3207" class="citation-modal __26b60 ember-view"><div id="ember3208" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3209="3209">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3210="3210">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3211="3211">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3212="3212">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3213="3213">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3214="3214">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3215="3215">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3216" class="share-modal __96958 ember-view"><div id="ember3217" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3218="3218">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3219="3219">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3220="3220">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3221="3221">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3222="3222">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3223" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3224" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3226" class="article-list-item __6ba9e ember-view"><article aria-label="Tannins from Different Parts of the Chestnut Trunk ( Castanea Sativa Mill.): a Green and Effective Extraction Method and Their Profiling by High-Performance Liquid Chromatography-Diode Array Detector-Mass Spectrometry" class="578153547   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Tannins from Different Parts of the Chestnut Trunk ( Castanea Sativa Mill.): a Green and Effective Extraction Method and Their Profiling by High-Performance Liquid Chromatography-Diode Array Detector-Mass Spectrometry" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3227="3227">
<div id="ember3228" class="ember-view"><a target="_blank"  href="/libraries/603/articles/588987075?sort=title" id="ember3229" class="ember-view">                        Tannins from Different Parts of the Chestnut Trunk ( Castanea Sativa Mill.): a Green and Effective Extraction Method and Their Profiling by High-Performance Liquid Chromatography-Diode Array Detector-Mass Spectrometry
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1903–1912
                    </span>

<!---->
                <span class="authors"  data-ember-action-3230="3230">
                    <span  class="preview tabindex">
                      Khatib, Mohamad; Campo, Margherita; Bellumori, Maria; … Mulinacci, Nadia
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-3231="3231">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3232="3232">
<div id="ember3233" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/588987075/pdf?sort=title" id="ember3234" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Tannins from Different Parts of the Chestnut Trunk ( Castanea Sativa Mill.): a Green and Effective Extraction Method and Their Profiling by High-Performance Liquid Chromatography-Diode Array Detector-Mass Spectrometry</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3235="3235">
<div id="ember3236" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/588987075?sort=title" id="ember3237" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Tannins from Different Parts of the Chestnut Trunk ( Castanea Sativa Mill.): a Green and Effective Extraction Method and Their Profiling by High-Performance Liquid Chromatography-Diode Array Detector-Mass Spectrometry</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3238="3238">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Tannins from Different Parts of the Chestnut Trunk ( Castanea Sativa Mill.): a Green and Effective Extraction Method and Their Profiling by High-Performance Liquid Chromatography-Diode Array Detector-Mass Spectrometry</span>
                    </a>
                  </div>

                  <div id="ember3239" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3240="3240">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Tannins from Different Parts of the Chestnut Trunk ( Castanea Sativa Mill.): a Green and Effective Extraction Method and Their Profiling by High-Performance Liquid Chromatography-Diode Array Detector-Mass Spectrometry</span>
  </a>
</div>
<!----></div>

                  <div id="ember3241" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3242="3242">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Tannins from Different Parts of the Chestnut Trunk ( Castanea Sativa Mill.): a Green and Effective Extraction Method and Their Profiling by High-Performance Liquid Chromatography-Diode Array Detector-Mass Spectrometry</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3243" class="collection-modal __9c85b ember-view"><div id="ember3244" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3245="3245">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3246="3246">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3247="3247">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3248="3248">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3249" class="confirm-modal ember-view"><div id="ember3250" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3251" class="citation-modal __26b60 ember-view"><div id="ember3252" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3253="3253">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3254="3254">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3255="3255">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3256="3256">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3257="3257">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3258="3258">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3259="3259">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3260" class="share-modal __96958 ember-view"><div id="ember3261" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3262="3262">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3263="3263">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3264="3264">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3265="3265">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3266="3266">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3267" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3268" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3270" class="article-list-item __6ba9e ember-view"><article aria-label="Lipid-Based Nanoparticles as Targeted Delivery System in Korat Chicken" class="582781100   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Lipid-Based Nanoparticles as Targeted Delivery System in Korat Chicken" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3271="3271">
<div id="ember3272" class="ember-view"><a target="_blank"  href="/libraries/603/articles/593606649?sort=title" id="ember3273" class="ember-view">                        Lipid-Based Nanoparticles as Targeted Delivery System in Korat Chicken
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1913–1919
                    </span>

<!---->
                <span class="authors"  data-ember-action-3274="3274">
                    <span  class="preview tabindex">
                      Wangngae, Sirilak; Homyok, Piyaradtana; Chansaenpak, Kantapat; … Kamkaew, Anyanee
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-3275="3275">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3276="3276">
<div id="ember3277" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/593606649/pdf?sort=title" id="ember3278" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Lipid-Based Nanoparticles as Targeted Delivery System in Korat Chicken</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3279="3279">
<div id="ember3280" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/593606649?sort=title" id="ember3281" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Lipid-Based Nanoparticles as Targeted Delivery System in Korat Chicken</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3282="3282">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Lipid-Based Nanoparticles as Targeted Delivery System in Korat Chicken</span>
                    </a>
                  </div>

                  <div id="ember3283" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3284="3284">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Lipid-Based Nanoparticles as Targeted Delivery System in Korat Chicken</span>
  </a>
</div>
<!----></div>

                  <div id="ember3285" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3286="3286">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Lipid-Based Nanoparticles as Targeted Delivery System in Korat Chicken</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3287" class="collection-modal __9c85b ember-view"><div id="ember3288" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3289="3289">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3290="3290">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3291="3291">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3292="3292">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3293" class="confirm-modal ember-view"><div id="ember3294" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3295" class="citation-modal __26b60 ember-view"><div id="ember3296" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3297="3297">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3298="3298">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3299="3299">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3300="3300">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3301="3301">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3302="3302">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3303="3303">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3304" class="share-modal __96958 ember-view"><div id="ember3305" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3306="3306">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3307="3307">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3308="3308">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3309="3309">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3310="3310">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3311" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3312" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3314" class="article-list-item __6ba9e ember-view"><article aria-label="Blueberry Cell Wall Polysaccharide Composition of Three Distinct Fruit Firmness Phenotypes" class="583151968   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Blueberry Cell Wall Polysaccharide Composition of Three Distinct Fruit Firmness Phenotypes" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3315="3315">
<div id="ember3316" class="ember-view"><a target="_blank"  href="/libraries/603/articles/593976937?sort=title" id="ember3317" class="ember-view">                        Blueberry Cell Wall Polysaccharide Composition of Three Distinct Fruit Firmness Phenotypes
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1920–1930
                    </span>

<!---->
                <span class="authors"  data-ember-action-3318="3318">
                    <span  class="preview tabindex">
                      Trandel-Hayse, Marlee; Johanningsmeier, Suzanne; Oh, Heeduk; … Perkins-Veazie, Penelope
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-3319="3319">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3320="3320">
<div id="ember3321" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/593976937/pdf?sort=title" id="ember3322" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Blueberry Cell Wall Polysaccharide Composition of Three Distinct Fruit Firmness Phenotypes</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3323="3323">
<div id="ember3324" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/593976937?sort=title" id="ember3325" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Blueberry Cell Wall Polysaccharide Composition of Three Distinct Fruit Firmness Phenotypes</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3326="3326">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Blueberry Cell Wall Polysaccharide Composition of Three Distinct Fruit Firmness Phenotypes</span>
                    </a>
                  </div>

                  <div id="ember3327" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3328="3328">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Blueberry Cell Wall Polysaccharide Composition of Three Distinct Fruit Firmness Phenotypes</span>
  </a>
</div>
<!----></div>

                  <div id="ember3329" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3330="3330">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Blueberry Cell Wall Polysaccharide Composition of Three Distinct Fruit Firmness Phenotypes</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3331" class="collection-modal __9c85b ember-view"><div id="ember3332" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3333="3333">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3334="3334">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3335="3335">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3336="3336">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3337" class="confirm-modal ember-view"><div id="ember3338" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3339" class="citation-modal __26b60 ember-view"><div id="ember3340" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3341="3341">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3342="3342">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3343="3343">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3344="3344">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3345="3345">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3346="3346">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3347="3347">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3348" class="share-modal __96958 ember-view"><div id="ember3349" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3350="3350">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3351="3351">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3352="3352">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3353="3353">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3354="3354">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3355" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3356" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3358" class="article-list-item __6ba9e ember-view"><article aria-label="Theoretical Insights into Flavonol Solubilization by Deep Eutectic Solvents" class="578982766   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Theoretical Insights into Flavonol Solubilization by Deep Eutectic Solvents" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3359="3359">
<div id="ember3360" class="ember-view"><a target="_blank"  href="/libraries/603/articles/589816273?sort=title" id="ember3361" class="ember-view">                        Theoretical Insights into Flavonol Solubilization by Deep Eutectic Solvents
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1931–1947
                    </span>

<!---->
                <span class="authors"  data-ember-action-3362="3362">
                    <span  class="preview tabindex">
                      Aguilar, Nuria; Bol-Arreba, Alfredo; Atilhan, Mert; … Aparicio, Santiago
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow "  data-ember-action-3363="3363">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3364="3364">
<div id="ember3365" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/589816273/pdf?sort=title" id="ember3366" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Theoretical Insights into Flavonol Solubilization by Deep Eutectic Solvents</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3367="3367">
<div id="ember3368" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/589816273?sort=title" id="ember3369" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Theoretical Insights into Flavonol Solubilization by Deep Eutectic Solvents</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3370="3370">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Theoretical Insights into Flavonol Solubilization by Deep Eutectic Solvents</span>
                    </a>
                  </div>

                  <div id="ember3371" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3372="3372">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Theoretical Insights into Flavonol Solubilization by Deep Eutectic Solvents</span>
  </a>
</div>
<!----></div>

                  <div id="ember3373" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3374="3374">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Theoretical Insights into Flavonol Solubilization by Deep Eutectic Solvents</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3375" class="collection-modal __9c85b ember-view"><div id="ember3376" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3377="3377">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3378="3378">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3379="3379">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3380="3380">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3381" class="confirm-modal ember-view"><div id="ember3382" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3383" class="citation-modal __26b60 ember-view"><div id="ember3384" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3385="3385">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3386="3386">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3387="3387">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3388="3388">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3389="3389">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3390="3390">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3391="3391">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3392" class="share-modal __96958 ember-view"><div id="ember3393" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3394="3394">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3395="3395">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3396="3396">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3397="3397">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3398="3398">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3399" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3400" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3402" class="article-list-item __6ba9e ember-view"><article aria-label="Preparation and Characterization of a Zeolite/Chitosan-Based Magnetic Microparticle with Incorporated Ligustrum robustum (Rxob.) Blume Polyphenols for Oil Quality Control" class="578108407   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Preparation and Characterization of a Zeolite/Chitosan-Based Magnetic Microparticle with Incorporated Ligustrum robustum (Rxob.) Blume Polyphenols for Oil Quality Control" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3403="3403">
<div id="ember3404" class="ember-view"><a target="_blank"  href="/libraries/603/articles/588941935?sort=title" id="ember3405" class="ember-view">                        Preparation and Characterization of a Zeolite/Chitosan-Based Magnetic Microparticle with Incorporated Ligustrum robustum (Rxob.) Blume Polyphenols for Oil Quality Control
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1948–1956
                    </span>

<!---->
                <span class="authors"  data-ember-action-3406="3406">
                    <span  class="preview tabindex">
                      Gao, Hao-Xiang; Chen, Nan; He, Qiang; … Zeng, Wei-Cai
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-3407="3407">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3408="3408">
<div id="ember3409" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/588941935/pdf?sort=title" id="ember3410" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Preparation and Characterization of a Zeolite/Chitosan-Based Magnetic Microparticle with Incorporated Ligustrum robustum (Rxob.) Blume Polyphenols for Oil Quality Control</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3411="3411">
<div id="ember3412" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/588941935?sort=title" id="ember3413" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Preparation and Characterization of a Zeolite/Chitosan-Based Magnetic Microparticle with Incorporated Ligustrum robustum (Rxob.) Blume Polyphenols for Oil Quality Control</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3414="3414">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Preparation and Characterization of a Zeolite/Chitosan-Based Magnetic Microparticle with Incorporated Ligustrum robustum (Rxob.) Blume Polyphenols for Oil Quality Control</span>
                    </a>
                  </div>

                  <div id="ember3415" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3416="3416">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Preparation and Characterization of a Zeolite/Chitosan-Based Magnetic Microparticle with Incorporated Ligustrum robustum (Rxob.) Blume Polyphenols for Oil Quality Control</span>
  </a>
</div>
<!----></div>

                  <div id="ember3417" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3418="3418">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Preparation and Characterization of a Zeolite/Chitosan-Based Magnetic Microparticle with Incorporated Ligustrum robustum (Rxob.) Blume Polyphenols for Oil Quality Control</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3419" class="collection-modal __9c85b ember-view"><div id="ember3420" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3421="3421">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3422="3422">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3423="3423">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3424="3424">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3425" class="confirm-modal ember-view"><div id="ember3426" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3427" class="citation-modal __26b60 ember-view"><div id="ember3428" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3429="3429">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3430="3430">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3431="3431">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3432="3432">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3433="3433">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3434="3434">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3435="3435">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3436" class="share-modal __96958 ember-view"><div id="ember3437" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3438="3438">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3439="3439">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3440="3440">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3441="3441">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3442="3442">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3443" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3444" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3446" class="article-list-item __6ba9e ember-view"><article aria-label="Precursors and Formation Pathways of Trimethylamine in the Processing of Fragrant Rapeseed Oils" class="582016874   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Precursors and Formation Pathways of Trimethylamine in the Processing of Fragrant Rapeseed Oils" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3447="3447">
<div id="ember3448" class="ember-view"><a target="_blank"  href="/libraries/603/articles/592842472?sort=title" id="ember3449" class="ember-view">                        Precursors and Formation Pathways of Trimethylamine in the Processing of Fragrant Rapeseed Oils
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1957–1964
                    </span>

<!---->
                <span class="authors"  data-ember-action-3450="3450">
                    <span  class="preview tabindex">
                      Xiong, Xinjie; Ding, Caixia; Shi, Haiming; … Xu, Xuebing
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-3451="3451">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3452="3452">
<div id="ember3453" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/592842472/pdf?sort=title" id="ember3454" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Precursors and Formation Pathways of Trimethylamine in the Processing of Fragrant Rapeseed Oils</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3455="3455">
<div id="ember3456" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/592842472?sort=title" id="ember3457" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Precursors and Formation Pathways of Trimethylamine in the Processing of Fragrant Rapeseed Oils</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3458="3458">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Precursors and Formation Pathways of Trimethylamine in the Processing of Fragrant Rapeseed Oils</span>
                    </a>
                  </div>

                  <div id="ember3459" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3460="3460">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Precursors and Formation Pathways of Trimethylamine in the Processing of Fragrant Rapeseed Oils</span>
  </a>
</div>
<!----></div>

                  <div id="ember3461" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3462="3462">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Precursors and Formation Pathways of Trimethylamine in the Processing of Fragrant Rapeseed Oils</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3463" class="collection-modal __9c85b ember-view"><div id="ember3464" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3465="3465">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3466="3466">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3467="3467">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3468="3468">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3469" class="confirm-modal ember-view"><div id="ember3470" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3471" class="citation-modal __26b60 ember-view"><div id="ember3472" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3473="3473">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3474="3474">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3475="3475">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3476="3476">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3477="3477">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3478="3478">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3479="3479">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3480" class="share-modal __96958 ember-view"><div id="ember3481" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3482="3482">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3483="3483">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3484="3484">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3485="3485">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3486="3486">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3487" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3488" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3490" class="article-list-item __6ba9e ember-view"><article aria-label="Noni ( Morinda citrifolia L.) Fruit Polysaccharide Attenuated Inflammatory Bowel Disease Mice: Association of STAT3/NLRP3 Signaling Pathways" class="582781102   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Noni ( Morinda citrifolia L.) Fruit Polysaccharide Attenuated Inflammatory Bowel Disease Mice: Association of STAT3/NLRP3 Signaling Pathways" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3491="3491">
<div id="ember3492" class="ember-view"><a target="_blank"  href="/libraries/603/articles/593606651?sort=title" id="ember3493" class="ember-view">                        Noni ( Morinda citrifolia L.) Fruit Polysaccharide Attenuated Inflammatory Bowel Disease Mice: Association of STAT3/NLRP3 Signaling Pathways
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1965–1974
                    </span>

<!---->
                <span class="authors"  data-ember-action-3494="3494">
                    <span  class="preview tabindex">
                      Jin, Ming-Yu; Wu, Xiao-Yong; Li, Mei-Ying; … Xu, Zhen-Lin
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-3495="3495">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3496="3496">
<div id="ember3497" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/593606651/pdf?sort=title" id="ember3498" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Noni ( Morinda citrifolia L.) Fruit Polysaccharide Attenuated Inflammatory Bowel Disease Mice: Association of STAT3/NLRP3 Signaling Pathways</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3499="3499">
<div id="ember3500" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/593606651?sort=title" id="ember3501" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Noni ( Morinda citrifolia L.) Fruit Polysaccharide Attenuated Inflammatory Bowel Disease Mice: Association of STAT3/NLRP3 Signaling Pathways</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3502="3502">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Noni ( Morinda citrifolia L.) Fruit Polysaccharide Attenuated Inflammatory Bowel Disease Mice: Association of STAT3/NLRP3 Signaling Pathways</span>
                    </a>
                  </div>

                  <div id="ember3503" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3504="3504">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Noni ( Morinda citrifolia L.) Fruit Polysaccharide Attenuated Inflammatory Bowel Disease Mice: Association of STAT3/NLRP3 Signaling Pathways</span>
  </a>
</div>
<!----></div>

                  <div id="ember3505" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3506="3506">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Noni ( Morinda citrifolia L.) Fruit Polysaccharide Attenuated Inflammatory Bowel Disease Mice: Association of STAT3/NLRP3 Signaling Pathways</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3507" class="collection-modal __9c85b ember-view"><div id="ember3508" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3509="3509">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3510="3510">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3511="3511">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3512="3512">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3513" class="confirm-modal ember-view"><div id="ember3514" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3515" class="citation-modal __26b60 ember-view"><div id="ember3516" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3517="3517">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3518="3518">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3519="3519">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3520="3520">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3521="3521">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3522="3522">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3523="3523">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3524" class="share-modal __96958 ember-view"><div id="ember3525" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3526="3526">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3527="3527">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3528="3528">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3529="3529">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3530="3530">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3531" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3532" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3534" class="article-list-item __6ba9e ember-view"><article aria-label="In Silico and In Vitro Evaluation of Antiobesogenic and Osteoprotective Effect of Pomegranate Juice Fermented by Tannin Acyl Hydrolase and Lactobacillus vespulae DCY75 via the Wnt/β-Catenin Pathway" class="578687306   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for In Silico and In Vitro Evaluation of Antiobesogenic and Osteoprotective Effect of Pomegranate Juice Fermented by Tannin Acyl Hydrolase and Lactobacillus vespulae DCY75 via the Wnt/β-Catenin Pathway" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3535="3535">
<div id="ember3536" class="ember-view"><a target="_blank"  href="/libraries/603/articles/589520813?sort=title" id="ember3537" class="ember-view">                        In Silico and In Vitro Evaluation of Antiobesogenic and Osteoprotective Effect of Pomegranate Juice Fermented by Tannin Acyl Hydrolase and Lactobacillus vespulae DCY75 via the Wnt/β-Catenin Pathway
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1975–1987
                    </span>

<!---->
                <span class="authors"  data-ember-action-3538="3538">
                    <span  class="preview tabindex">
                      Akter, Reshmi; Boopathi, Vinothini; Awais, Muhammad; … Yang, Deok Chun
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-3539="3539">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3540="3540">
<div id="ember3541" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/589520813/pdf?sort=title" id="ember3542" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - In Silico and In Vitro Evaluation of Antiobesogenic and Osteoprotective Effect of Pomegranate Juice Fermented by Tannin Acyl Hydrolase and Lactobacillus vespulae DCY75 via the Wnt/β-Catenin Pathway</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3543="3543">
<div id="ember3544" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/589520813?sort=title" id="ember3545" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - In Silico and In Vitro Evaluation of Antiobesogenic and Osteoprotective Effect of Pomegranate Juice Fermented by Tannin Acyl Hydrolase and Lactobacillus vespulae DCY75 via the Wnt/β-Catenin Pathway</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3546="3546">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - In Silico and In Vitro Evaluation of Antiobesogenic and Osteoprotective Effect of Pomegranate Juice Fermented by Tannin Acyl Hydrolase and Lactobacillus vespulae DCY75 via the Wnt/β-Catenin Pathway</span>
                    </a>
                  </div>

                  <div id="ember3547" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3548="3548">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - In Silico and In Vitro Evaluation of Antiobesogenic and Osteoprotective Effect of Pomegranate Juice Fermented by Tannin Acyl Hydrolase and Lactobacillus vespulae DCY75 via the Wnt/β-Catenin Pathway</span>
  </a>
</div>
<!----></div>

                  <div id="ember3549" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3550="3550">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - In Silico and In Vitro Evaluation of Antiobesogenic and Osteoprotective Effect of Pomegranate Juice Fermented by Tannin Acyl Hydrolase and Lactobacillus vespulae DCY75 via the Wnt/β-Catenin Pathway</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3551" class="collection-modal __9c85b ember-view"><div id="ember3552" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3553="3553">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3554="3554">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3555="3555">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3556="3556">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3557" class="confirm-modal ember-view"><div id="ember3558" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3559" class="citation-modal __26b60 ember-view"><div id="ember3560" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3561="3561">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3562="3562">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3563="3563">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3564="3564">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3565="3565">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3566="3566">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3567="3567">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3568" class="share-modal __96958 ember-view"><div id="ember3569" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3570="3570">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3571="3571">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3572="3572">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3573="3573">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3574="3574">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3575" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3576" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
      <div id="ember3578" class="article-list-item __6ba9e ember-view"><article aria-label="Enhancing the Rheological, Gelation, and Functional Properties of Camel Milk Yogurt with Pea Extract" class="582781099   no-unread-articles  ">
<!---->
<!---->
<!----><!---->    <table class="article-split-container">
      <tr>
<!---->
<!---->
        <td class="metadata-container">
          <section aria-label="Metadata for Enhancing the Rheological, Gelation, and Functional Properties of Camel Milk Yogurt with Pea Extract" class="article-list-item-content-block ">
<!----><!---->            <div class="title "  data-ember-action-3579="3579">
<div id="ember3580" class="ember-view"><a target="_blank"  href="/libraries/603/articles/593606648?sort=title" id="ember3581" class="ember-view">                        Enhancing the Rheological, Gelation, and Functional Properties of Camel Milk Yogurt with Pea Extract
</a></div>                            </div>

<!---->
            <div class="metadata">
<!---->
                    <span  class="pages ">
                        pp. 1988–2000
                    </span>

<!---->
                <span class="authors"  data-ember-action-3582="3582">
                    <span  class="preview tabindex">
                      Olaimat, Amin; Tarique, Mohammed; Al Nabulsi, Anas; … Ayyash, Mutamed
                    </span>
                </span>

<!---->            </div>

<!---->
            <div class="content-overflow show-content-overflow-chevron"  data-ember-action-3583="3583">
                <span class="chevron icon flaticon solid down-2"></span>
            </div>

            <div class="tools ">
              <div class="buttons noselect">
                    <div class="button invisible download-pdf"  data-ember-action-3584="3584">
<div id="ember3585" class="ember-view"><a aria-label="Download PDF" target="_blank"  href="/libraries/603/articles/593606648/pdf?sort=title" id="ember3586" class="tooltip ember-view">                            <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                            <span class="aria-hidden">Download PDF - Enhancing the Rheological, Gelation, and Functional Properties of Camel Milk Yogurt with Pea Extract</span>
</a></div>                                          </div>

                  <div class="button invisible read-full-text"  data-ember-action-3587="3587">
<div id="ember3588" class="ember-view"><a aria-label="Link to Article" target="_blank"  href="/libraries/603/articles/593606648?sort=title" id="ember3589" class="tooltip ember-view">                          <span aria-hidden="true" class="icon fal fa-link"></span>
                          <span class="aria-hidden">Link to Article - Enhancing the Rheological, Gelation, and Functional Properties of Camel Milk Yogurt with Pea Extract</span>
</a></div>                                      </div>

                  <div class="button invisible add-to-my-articles"  data-ember-action-3590="3590">
                    <a  aria-label="Save to My Articles" class="tabindex tooltip">
                      <span aria-hidden="true" class="icon fal fa-folder"></span>
                      <span class="aria-hidden">Save to My Articles - Enhancing the Rheological, Gelation, and Functional Properties of Camel Milk Yogurt with Pea Extract</span>
                    </a>
                  </div>

                  <div id="ember3591" class="__194b5 ember-view"><div class="button invisible  citation-services"  data-ember-action-3592="3592">
  <a  aria-label="Export Citation" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
    <span class="aria-hidden">Export Citation - Enhancing the Rheological, Gelation, and Functional Properties of Camel Milk Yogurt with Pea Extract</span>
  </a>
</div>
<!----></div>

                  <div id="ember3593" class="__194b5 ember-view"><div class="button invisible  social-media-services"  data-ember-action-3594="3594">
  <a  aria-label="Share" class="tabindex tooltip">
    <span aria-hidden="true" class="icon fal fa-share-alt"></span>
    <span class="aria-hidden">Share - Enhancing the Rheological, Gelation, and Functional Properties of Camel Milk Yogurt with Pea Extract</span>
  </a>
</div>
<!----></div>
              </div>
            </div>
          </section>
        </td>
      </tr>
    </table>
</article>

<div id="ember3595" class="collection-modal __9c85b ember-view"><div id="ember3596" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="collection-modal-select">
    <div class="bz-modal-title">
        Save to My Articles
    </div>
    <div class="bz-modal-content">
        <ul class="collection-select-container">
<!---->
          <li  class="new-collection-container tabindex">
              <span class="label new-collection"  data-ember-action-3597="3597">Create a new Collection</span>
              <span class="collection-select-icon"  data-ember-action-3598="3598">
                <span class="fa fa-plus-circle"></span>
              </span>
          </li>
        </ul>
    </div>

    <div class="bz-modal-footer">
        <span  class="button primary tabindex"  data-ember-action-3599="3599">
          Done
        </span>

      <span  class="button secondary tabindex"  data-ember-action-3600="3600">
        Cancel
      </span>
    </div>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3601" class="confirm-modal ember-view"><div id="ember3602" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Delete Article
  </div>
  <div  class="bz-modal-content tabindex">
    Are you sure you want to delete this article?
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      OK
    </span>

    <span  class="button secondary tabindex">
      Cancel
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3603" class="citation-modal __26b60 ember-view"><div id="ember3604" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Export Citation
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3605="3605">
        <span class="label">Zotero</span>
      </li>
      <li  class="service"  data-ember-action-3606="3606">
        <span class="label">Mendeley</span>
      </li>
      <li  class="service"  data-ember-action-3607="3607">
        <span class="label">BibTeX</span>
      </li>
      <li  class="service"  data-ember-action-3608="3608">
        <span class="label">RefWorks</span>
      </li>
      <li  class="service"  data-ember-action-3609="3609">
        <span class="label">Endnote RIS</span>
      </li>
      <li  class="service"  data-ember-action-3610="3610">
        <span class="label">Citavi RIS</span>
      </li>
      <li  class="service"  data-ember-action-3611="3611">
        <span class="label">Universal RIS</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3612" class="share-modal __96958 ember-view"><div id="ember3613" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Share
  </div>
  <div class="bz-modal-content">
    <ul class="services">
      <li  class="service"  data-ember-action-3614="3614">
        <span class="label">Copy Link to Article</span>
      </li>
      <li  class="service"  data-ember-action-3615="3615">
        <span class="label">Twitter</span>
      </li>
      <li  class="service"  data-ember-action-3616="3616">
        <span class="label">Facebook</span>
      </li>
      <li  class="service"  data-ember-action-3617="3617">
        <span class="label">LinkedIn</span>
      </li>
      <li  class="service"  data-ember-action-3618="3618">
        <span class="label">Email</span>
      </li>
    </ul>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>

<div id="ember3619" class="copy-link-to-article-modal __0f194 ember-view"><div id="ember3620" class="__f9d01 ember-view"><div role="dialog" class="bz-modal-container">
  <div class="bz-modal">
    <span class="bz-modal-cancel-button">
      <span aria-hidden="true" class="icon x-1 flaticon stroke"></span>
    </span>
      <div class="bz-modal-title">
    Copy Link to Article
  </div>
  <div class="bz-modal-content">
    <textarea readonly="" aria-label="Copy Link to Article" rows="5" class="article-in-context-link"></textarea>
  </div>
  <div class="bz-modal-footer">
    <span  class="button primary tabindex">
      Copy To Clipboard
    </span>

    <span  class="button secondary tabindex">
      Close
    </span>
  </div>

  </div>
  <div class="bz-modal-backdrop">
  </div>
</div>
</div></div>
</div>
<!----></div>
<!----></div>

  </main>
                    </section>
                <?php $this->view('./components/NavDrawe');?>
            </div>
        </div>
    </div>
    
        <script src="<?=ASSETS?>js/vendor.min.js"></script>
        <script src="<?=ASSETS?>js/pubs-ui.min.js"></script>
        <script  type="module" src="<?=ASSETS?>js/script.js"></script>
        <script type="module" src="<?=ASSETS?>js/ev.js"></script>
    </body>

</html>