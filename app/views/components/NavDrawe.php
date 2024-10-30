<?php $authClass = new \Session\UserSessionManager(); ?>
<div class="pubs-nav-drawer" aria-hidden="true">
    <nav class="pubs-nav-control" aria-label="Site menu">
        <div class="pubs-nav__header" style="display:flex">
            <a href="javascript:void(0)" role="button" class="pubs-header__btn pubs-nav__close nav-item-first" tabindex="-1" aria-label="Close site menu">
                <i class="fa fa-times" aria-hidden="true"></i>
            </a>
            <a href="javascript:void(0)" class="pubs-header__link--home pubs-nav__title" tabindex="-1" title="Publishing home page"aria-label="Publishing home page">Publishing</a>
        </div>
            <div class="pubs-nav__body scrollbar--slim">
                <div class="pubs-nav__list autopad--h">
                    <h2 class="pubs-nav__heading">Journals</h2>
                    <ul class="pubs-nav__ul">
                        <li class="pubs-nav__item pubs-nav__indent">
                            <a href="javascript:void(0)" class="pubs-nav__link" tabindex="-1">Current Journals</a>
                        </li>
                        <li class="pubs-nav__item pubs-nav__indent">
                            <a href="javascript:void(0)" class="pubs-nav__link"
                                tabindex="-1">Archive Journals</a>
                        </li>
                        <li class="pubs-nav__item pubs-nav__indent">
                            <a href="javascript:void(0)" class="pubs-nav__link" tabindex="-1">All Journals</a>
                        </li>
                    </ul>
                </div>
                <div class="pubs-nav__list autopad--h">
                    <h2 class="pubs-nav__heading">Books</h2>
                    <ul class="pubs-nav__ul">
                        <li class="pubs-nav__item pubs-nav__indent">
                            <a href="<?=ROOT?>en/ebooks/" class="pubs-nav__link" tabindex="-1">e-Books</a>
                        </li>
                        <li class="pubs-nav__item pubs-nav__indent">
                            <a href="javascript:void(0)" class="pubs-nav__link" tabindex="-1">Series</a>
                        </li>
                    </ul>
                </div>
                <div class="pubs-nav__list autopad--h">
                    <h2 class="pubs-nav__heading">Databases</h2>
                    <ul class="pubs-nav__ul">
                        <li class="pubs-nav__item pubs-nav__indent">
                            <a href="javascript:void(0)" class="pubs-nav__link" tabindex="-1">Literature Updates</a>
                        </li>
                        <li class="pubs-nav__item pubs-nav__indent">
                            <a href="javascript:void(0)" class="pubs-nav__link"  tabindex="-1">ChemSpider</a>
                        </li>
                        <li class="pubs-nav__item pubs-nav__indent">
                            <a href="javascript:void(0)" class="pubs-nav__link" tabindex="-1">The Merck Index*</a>
                        </li>
                        <li class="pubs-nav__item pubs-nav__indent">
                            <a href="javascript:void(0)" class="pubs-nav__link" tabindex="-1">MarinLit</a>
                        </li>
                    </ul>
                </div>
                
                <div class="pubs-nav__list autopad--h">
                    <h2 class="pubs-nav__heading">More</h2>
                    <ul class="pubs-nav__ul">
                        <li class="pubs-nav__item pubs-nav__indent">
                            <a href="javascript:void(0)" class="pubs-nav__link" tabindex="-1">For Librarians</a>
                        </li>
                    </ul>
                </div>
                <div class="pubs-nav__list autopad--h">
                    <h2 class="pubs-nav__heading">Dashboard</h2> 
                    <ul class="pubs-nav__ul">
                        <li class="pubs-nav__item pubs-nav__indent">
                            <?php 
                            $authenticateUser =$authClass->authCheck();
                            if (!$authenticateUser):?>
                                <a href="javascript:void(0)" class="pubs-nav__link" id="login_institute" tabindex="-1">Login</a>
                            <?php else:?>
                               <a href="javascript:void(0)" class="pubs-nav__link" id="logout_user" tabindex="-1">Logout</a>
                            <?php endif; ?>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>