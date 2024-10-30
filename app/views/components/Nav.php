
   <?php $authClass = new \Session\UserSessionManager(); ?>
     <header role="banner" data-id="pnlGlobalHeader" class="pubs-header">
        <div class="viewport" style="display:flex">
            <div class="pubs-header__wrapper">
                <div class="pubs-header__cell pubs-header__cell--menu">
                    <a href="#" role="button" id="btnHamburgerMainNav" class="pubs-header__btn pubs-header__btn--open" aria-label="Open site menu">
                    <i class="fa fa-bars" aria-hidden="true"></i></a>
                </div>
                <div class="pubs-header__cell pubs-header__cell--home">
                    <a href="<?=(((isset($_SESSION['packageId'])) ? ROOT .'Default/libraries/'.$_SESSION['packageId'].'/subjects?sort=title' : 'javascript:void(0)' ))?>" class="pubs-header__link pubs-header__link--home" title="Publishing home page" aria-label="Publishing home page">SkyBase</a>
                </div>
                <div class="pubs-header__cell pubs-header__cell--nav">
                    <nav class="pubs-header__nav">
                        <ul>
                            <li class="pubs-header__nav-item"><a href="javascript:void(0)" class="pubs-header__link" >Journals</a></li>
                            <li class="pubs-header__nav-item"><a href="javascript:void(0)" class="pubs-header__link" >Books</a></li>
                            <li class="pubs-header__nav-item"><a href="javascript:void(0)" class="pubs-header__link" >Databases</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="pubs-header__cell pubs-header__cell--search-mobile">
                    <a href="#" class="pubs-header__btn" aria-label="Search" id="mobileSearchTrigger">
                   <i class="fa fa-search" aria-hidden="true"  id="mobileSearchIcon"></i></a>
                </div>
                <div class="pubs-header__cell pubs-header__cell--search">
                    <div class="pubs-search-control">
                        <form action="javascript:void(0)" aria-label="Sitewide" id="SimpleSearch-form" method="post"role="search"> 
                            <label for="SearchText" class="sr-only">Search</label>
                            <input autocomplete="off" class="pubs-search__input" id="SearchText" name="SearchText" type="search" value="" />
                            <div class="pubs-search__actions">
                                <button class="input__search-submit" type="submit" aria-label="Search" id="btnNavSearchInput">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </button>
                                <a class="pubs-search__adv-link" href="<?=ROOT?>/en/search/advancedsearch" aria-label="Advanced search" id="advancedLink">Advanced</a>
                            </div>
                            <span class="pubs-search__icon"></span>
                        </form>
                    </div>
                </div>
                <?php 
                    
                    $authenticateUser = $authClass->authCheck();
                    if($authenticateUser == false || $authenticateUser == ''):
                ?>
                    <div class="pubs-header__cell pubs-header__cell--login">
                        <a href="<?=ROOT?>auth/login" class="pubs-header__btn" aria-label="Log in or register">
                        <i class="fa fa-user" aria-hidden="true" id="userIcon"></i></a>
                    </div>
                <?php endif;?>
                <div class="pubs-header__cell pubs-header__cell--trolley">
                    <a href="<?=(((isset($_SESSION['packageId'])) ? ROOT .'Default/libraries/'.$_SESSION['packageId'].'/subjects?sort=title' : 'javascript:void(0)' ))?>" class="pubs-header__btn" aria-label="View your basket">
                    <i class="fa fa-cart-arrow-down" aria-hidden="true" id="trolleyIcon"></i></a>
                    <span class="badge badge--count" style="display: none;"></span>
                </div>
                <div class="pubs-header__cell pubs-header__cell--logo">
                    <a href="<?=(((isset($_SESSION['packageId'])) ? ROOT .'Default/libraries/'.$_SESSION['packageId'].'/subjects?sort=title' : 'javascript:void(0)' ))?>" class="">
                        <img src="<?=ASSETS?>images/rsc-logo-rev-pubs.svg" height="40" alt="Royal Society of Chemistry homepage">
                    </a>
                </div>
            </div>
        </div>
        <div class="mobile-search" id="mobileSearchPanel">
            <div class="viewport">
                <div class="">
                    <div class="autopad--h fixpadt--l">
                        <form action="javascript:void(0)" aria-label="Sitewide" id="SimpleSearch-formMobile" method="post" role="search"> <label for="SearchTextMobile" class="sr-only">Search</label>
                            <div class="input__search">
                                <i class="icon--search"></i>
                                <input autocomplete="off" placeholder="Search term, doi, title, author" type="search" class="input__field input__field--basic input__label--block" id="SearchTextMobile" name="SearchText">
                                <button class="input__search-submit" name="search" type="submit" aria-label="Search">
                                    <img src="<?=ASSETS?>icons/arrow-right.png" width="32" alt="" class="input__submit-icon">
                                </button>
                            </div>
                            <div class="input--error" id="errSimpleSearchMobileText">You must enter a search term</div>
                            <div class="fixpadv--m">
                                <a class="pubs-search__adv-link " href="/en/search/advancedsearch" aria-label="Advanced search" id="advancedLink">Advanced search</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
         <?php 
        
            $authenticateUser = $authClass->authCheck();
            if($authenticateUser == false):
        ?>
        <div class="auth-header" data-id="pnlAuthHeader">
             <div data-id="pnlSignIn"></div>
             <div class="viewport_header">
                 <div class="auth-header__institute-access">
                     <div class="auth-header__institute-messaging">
                        <?php 
                        $authenticateUser = $authClass->authCheck();
                        if($authenticateUser == true):?>
                             <span id="divWelcomeUser"></span>
                         <?php else:?>
                             <div class="login-institute auth_user_" id="instite_auth">
                                 <div class="auth-package">
                                     <div class="oc-auth-button">
                                         <i class="fa fa-home" aria-hidden="true"></i>
                                         <strong>Log in through your library</strong>
                                         <span>to access more features.</span>
                                     </div>
                                 </div>
                             </div>
                         <?php endif;?>
                     </div>
                 </div>
             </div>
         </div>
        <?php endif;?>

    </header>