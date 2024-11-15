import auth from './class/validate';
import SecurityFilterChain from './class/SecurityFilterChain'; 

var ViewYearsList = document.getElementById('ViewYearsListInMobileVersion');
var ViewRelationShipList = document.getElementById('RelationShipList');
var OpenHiddenYearList = document.getElementById('ember3134');
var OpenHiddenRelationShipList = document.getElementById('OpenRelationShipList');
document.getElementById('spinnerLoad').style.display = 'block';
document.getElementById('loadMoreButton').textContent = 'Loading...';
document.getElementById('loading').style.display = 'block';
document.getElementById('mainContent').style.display = 'none'; 
var security = new SecurityFilterChain()

$('document').ready(function () {
    $('.back-button').click(function (e) {
        e.preventDefault();
        window.history.go(-1)
    });

    $('#logout_user').click(function (e) {
        var myAuthObject = new auth();
        e.preventDefault();
        myAuthObject.logout();
    });

    $(ViewYearsList).click(function () {
        if (OpenHiddenYearList.classList.contains('active_hidden')) {
            if (OpenHiddenRelationShipList.classList.contains('SelectDeactive_hidden')) {
                OpenHiddenRelationShipList.classList.remove('SelectDeactive_hidden');
                OpenHiddenRelationShipList.classList.add('Selectactive_hidden');
                ViewRelationShipList.classList.remove('activateBorder');
            }
            if (ViewRelationShipList.classList.contains('active')) {
                ViewRelationShipList.classList.remove('active');
                ViewYearsList.classList.add('active');
                OpenHiddenYearList.classList.remove('active_hidden');
                OpenHiddenYearList.classList.add('deactive_hidden');
                OpenHiddenYearList.classList.add('visible');
                ViewYearsList.classList.add('activateBorder');
            } else {
                ViewYearsList.classList.add('active');
                OpenHiddenYearList.classList.remove('active_hidden');
                OpenHiddenYearList.classList.add('deactive_hidden');
                OpenHiddenYearList.classList.add('visible');
                ViewYearsList.classList.add('activateBorder');
            }
            OpenHiddenYearList.classList.remove('active_hidden');
            OpenHiddenYearList.classList.add('deactive_hidden');
            OpenHiddenYearList.classList.add('visible');
            ViewYearsList.classList.add('activateBorder');
        } else {
            document.getElementById("ViewYearsListInMobileVersion").classList.remove('active');
            OpenHiddenYearList.classList.remove('deactive_hidden');
            OpenHiddenYearList.classList.remove('visible');
            ViewYearsList.classList.remove('activateBorder');
            OpenHiddenYearList.classList.add('active_hidden');
        }
    });

    $(ViewRelationShipList).click(function () {
        if (OpenHiddenRelationShipList.classList.contains('Selectactive_hidden')) {
            if (OpenHiddenYearList.classList.contains('deactive_hidden')) {
                OpenHiddenYearList.classList.remove('deactive_hidden');
                ViewYearsList.classList.remove('activateBorder');
                OpenHiddenYearList.classList.add('visible');
                OpenHiddenYearList.classList.add('active_hidden');
            }
            if (ViewYearsList.classList.contains('active')) {
                ViewYearsList.classList.remove('active');
                ViewRelationShipList.classList.add('active');
                OpenHiddenRelationShipList.classList.remove('Selectactive_hidden')
                OpenHiddenRelationShipList.classList.add('SelectDeactive_hidden')
                ViewRelationShipList.classList.add('activateBorder');
            }else {
                ViewRelationShipList.classList.add('active');
                OpenHiddenRelationShipList.classList.remove('Selectactive_hidden');
                OpenHiddenRelationShipList.classList.add('SelectDeactive_hidden');
                OpenHiddenRelationShipList.classList.add('visible');
                ViewRelationShipList.classList.add('activateBorder');
            }
            OpenHiddenRelationShipList.classList.remove('Selectactive_hidden');
            OpenHiddenRelationShipList.classList.add('SelectDeactive_hidden');
            OpenHiddenRelationShipList.classList.add('visible');
        } else {
            document.getElementById("RelationShipList").classList.remove('active');
            OpenHiddenRelationShipList.classList.remove('SelectDeactive_hidden');
            OpenHiddenRelationShipList.classList.remove('visible');
            ViewRelationShipList.classList.remove('activateBorder');
            OpenHiddenRelationShipList.classList.add('Selectactive_hidden');
        }
    });

    // Add click event to .year elements
    $('.year-item-list').on('click', '.year', function () {
        // Remove "selected" class from all .year elements
        $('.year').removeClass('selected');
        // Add "selected" class to the clicked element
        $(this).addClass('selected');
    });

    document.getElementById('loadMoreButton').addEventListener('click', function() {
        if (this.classList.contains('go-back-button')) {
            window.history.back();
        }
    });

    load_journal_details();
})

async function load_journal_details() {
    try {
        const jid = get_journal_id();
        const jwt = security.getCookie('token');
        const response = await fetch(root_url + 'api/collect?v1=active&action=get_journal_year_list&query=publish_year_list&journalId='+jid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        });
        const data = await response.json();
        if (Array.isArray(data.data) && data.data.length === 0) { 
            document.getElementById('loading').style.display = 'block';  
            document.getElementById('mainContent').style.display = 'none';
            document.getElementById('spinnerLoad').style.display = 'none';  
            document.querySelector('.error-screen').style.display = 'block';  
            document.querySelector('.error-msg').style.display = 'block'; 
            document.getElementById('loadMoreButton').classList.add('primary'), 
            document.getElementById('loadMoreButton').textContent = 'Go Back',
            document.getElementById('loadMoreButton').classList.add('go-back-button');
            document.getElementById('loading').style.display = 'block'
        }else{
            setTimeout(() => {
                $('.year-item-list').empty();
                $('.back-issue-items').empty();
                $("#related_journal").empty();
                // Show content container after data is fetched
                document.getElementById('mainContent').style.display = 'block';
                document.getElementById('loading').style.display = 'none';  

                const issues = data.data.issues;
                const related_journal  = data.data.related_journals;

                if (issues) {
                    const groupedByYear = {};
                    $('#related_journal').append(`
                        <span class="icon flaticon solid files-1"></span>
                        <a title="${related_journal}" href="/libraries/603/subjects/60/bookcases/94/bookshelves/322?sort=title" id="ember1985" class="ember-view">                
                        <span class="label">${related_journal}</span>
                        </a>   
                    `);
                    // Group volumes by year
                    Object.keys(issues).forEach(date => {
                        const year = date.split("-")[0];
                        if (!groupedByYear[year]) {
                            groupedByYear[year] = [];
                        }

                        // Add volume titles for each year
                        const volumes = issues[date].volumes;
                    Object.keys(volumes).forEach(volumeKey => {
                            groupedByYear[year].push({
                                title: volumes[volumeKey].title,
                                volume: volumes[volumeKey].volume,
                                articles: volumes[volumeKey].articles 
                            });
                        });
                    });

                    // Sort years in descending order and display the latest 7 years
                    const years = Object.keys(groupedByYear).sort((a, b) => b - a);
                    const yearsToShow = years.slice(0, 7);
                    const hasMoreThanSeven = years.length > 7;

                    // Display each year as an item in the sidebar
                    yearsToShow.forEach((year, index) => {
                        const selectedClass = index === 0 ? "selected" : "";
                        $('.year-item-list').append(`
                            <div tabindex="0" class="year ${selectedClass}" data-year="${year}">
                                ${year}
                                <span class="icon arrow flaticon solid right-2"></span>
                            </div>
                        `);

                        // Show volumes of the first year by default
                        if (index === 0) {
                            displayVolumesForYear(year, groupedByYear[year]);
                        }
                    });

                    // Append the years to mobile-year-listing
                    yearsToShow.forEach((year, index) => {
                        const selectedClass = index === 0 ? "selected" : "";
                        $('#mobile-year-listing ul').append(`
                            <li tabindex="0" class="year ${selectedClass}" data-year="${year}">
                                ${year}
                            </li>
                        `);

                        // Show volumes of the first year by default
                        if (index === 0) {
                            const initialVolume = groupedByYear[year][0];
                            displayVolumesForYear(year, groupedByYear[year]);
                            displayArticles(initialVolume.articles);
                        }
                    });

                    // Append the "See All" link if there are more than 7 years for the mobile view
                    if (hasMoreThanSeven) {
                        $('#mobile-year-listing ul').append(`
                            <li class="all-back-issues-link">
                                <a href="#" target="_blank">
                                    See All
                                    <span class="icon fa fa-external-link"></span>
                                </a>
                            </li>
                        `);
                    }

                    // Click handler for desktop view to update selected year and display associated volumes
                    $('.year-item-list').on('click', '.year', function () {
                        $('.year').removeClass('selected');
                        $(this).addClass('selected');
                        showLoader();
                        const selectedYear = $(this).data('year');
                        displayVolumesForYear(selectedYear, groupedByYear[selectedYear]);

                        // Display articles for the first volume of the selected year
                        const selectedVolume = groupedByYear[selectedYear][0];
                        displayArticles(selectedVolume.articles);
                        hideLoader();
                    });

                    // Click handler for mobile view to update selected year and display associated volumes
                    $('#mobile-year-listing').on('click', '.year', function () {
                        $('.year').removeClass('selected');
                        $(this).addClass('selected');
                        showLoader();
                        const selectedYear = $(this).data('year');
                        displayVolumesForYear(selectedYear, groupedByYear[selectedYear]);
                        const selectedVolume = groupedByYear[selectedYear][0];
                        displayArticles(selectedVolume.articles);
                        hideLoader();
                        
                    });

                }
            }, 2000);
        }
     
    } catch (error) {
        console.error(`Error: ${error}`);
        document.getElementById('loading').style.display = 'block';  
        document.getElementById('mainContent').style.display = 'none';  
        document.querySelector('.error-msg').style.display = 'block';  
    }
}

// Function to display volumes for a given year without article details
async function displayVolumesForYear(year, volumes) {
    // Clear existing volumes in both desktop and mobile views
    $('.back-issue-items').empty();
    $('#mobile-volume-listing').empty();

    // Set the initial volume to be the first one
    const initialVolume = volumes[0];
   $('#active-article-volume').html(initialVolume ? year + `:&nbsp;` + initialVolume.title : '');

    volumes.forEach((volume, index) => {
        const activeClass = index === 0 ? "active" : "";
        const accessoriesDiv = activeClass ? `
            <div class="accessories">
                <span class="icon arrow flaticon solid right-2"></span>
            </div>
        ` : '';

        // Encode the articles data to prevent issues in the HTML attribute
        const encodedArticles = encodeURIComponent(JSON.stringify(volume.articles));

        // Append volumes to desktop view
        $('.back-issue-items').append(`
            <div class="issue active-override ${activeClass}">
                <a tabindex="0" href="#" class="volume-iList ${activeClass}" data-volume="${volume.title}" data-articles="${encodedArticles}">
                    <span class="label">${volume.title}</span>
                    ${accessoriesDiv}
                </a>
            </div>
        `);

        // Append volumes to mobile view
        $('#mobile-volume-listing').append(`
            <div class="issue active-override ${activeClass}">
                <a tabindex="0" href="#" class="volume-iList ${activeClass}" data-volume="${volume.title}" data-articles="${encodedArticles}">
                    <span class="label">${volume.title}</span>
                    ${accessoriesDiv}
                </a>
            </div>
        `);
    });

    // Click handler for desktop view to update active volume and articles
    $('.back-issue-items').on('click', '.issue', function () {
        $('.volume-iList').removeClass('active');
        $(this).find('.volume-iList').addClass('active');
        $('.issue .accessories').remove();
        $(this).find('a').append(`
            <div class="accessories">
                <span class="icon arrow flaticon solid right-2"></span>
            </div>
        `);
        showLoader();
        // Get the selected volume's articles (after decoding)
        const selectedVolume = $(this).find('.volume-iList').data('volume');
        const selectedArticles = decodeURIComponent($(this).find('.volume-iList').data('articles'));
        $('#active-article-volume').text(selectedVolume);

        // Display articles for the selected volume
        displayArticles(JSON.parse(selectedArticles));
        hideLoader();
    });

    // Click handler for mobile view to update active volume and articles
    $('#mobile-volume-listing').on('click', '.issue', function () {
        $('#mobile-volume-listing .volume-iList').removeClass('active');
        $(this).find('.volume-iList').addClass('active');
        $('#mobile-volume-listing .issue .accessories').remove();
        $(this).find('a').append(`
            <div class="accessories">
                <span class="icon arrow flaticon solid right-2"></span>
            </div>
        `);
        showLoader();
        // Get the selected volume's articles (after decoding)
        const selectedVolume = $(this).find('.volume-iList').data('volume');
        const selectedArticles = decodeURIComponent($(this).find('.volume-iList').data('articles'));
        $('#active-article-volume').text(selectedVolume);

        // Display articles for the selected volume
        displayArticles(JSON.parse(selectedArticles));
        hideLoader();
    });
}


async function displayArticles(articles) {
    // Clear the article list container
    $('.article-list-container').empty();
    articles.forEach(article => {
        $('.article-list-container').append(`
            <article aria-label="Issue Editorial Masthead" class="no-unread-articles">
                <table class="article-split-container">
                    <tr>
                        <td class="metadata-container">
                            <section aria-label="article details here" class="article-list-item-content-block">
                                <div class="title">
                                    <div class="ember-view">
                                        <a target="_blank" tabindex="0" href="${article.apiWebInContextLink}" class="ember-view">${article.title}</a>
                                    </div> 
                                </div>
                                <div class="metadata">
                                    <span tabindex="0" class="pages">${`Author`}</span>
                                    <span class="authors">
                                        <span tabindex="0" class="preview tabindex">${article.author}</span>
                                    </span>
                                </div>
                                <div class="content-overflow">
                                    <span class="chevron icon flaticon solid down-2"></span>
                                </div>
                                <div class="tools">
                                    <div class="buttons noselect">
                                        <div class="button invisible download-pdf">
                                            <a aria-label="Download PDF" target="_blank" tabindex="0" href="${article.apiWebInContextLink}" class="tooltip ember-view">
                                                <span aria-hidden="true" class="icon fal fa-file-pdf"></span>
                                                <span class="aria-hidden">Download PDF - ${article.title}</span>
                                            </a>
                                        </div>
                                        <div class="button invisible read-full-text">
                                            <a aria-label="Link to Article" target="_blank" tabindex="0" href="${article.apiWebInContextLink}" class="tooltip ember-view">
                                                <span aria-hidden="true" class="icon fal fa-link"></span>
                                                <span class="aria-hidden">Link to Article - ${article.title}</span>
                                            </a>
                                        </div>
                                        <div class="button invisible add-to-my-articles">
                                            <a tabindex="0" aria-label="Save to My Articles" class="tabindex tooltip">
                                                <span aria-hidden="true" class="icon fal fa-folder"></span>
                                                <span class="aria-hidden">Save to My Articles - ${article.title}</span>
                                            </a>
                                        </div>
                                        <div class="button invisible citation-services">
                                            <a tabindex="0" aria-label="Export Citation" class="tabindex tooltip">
                                                <span aria-hidden="true" class="icon fal fa-graduation-cap"></span>
                                                <span class="aria-hidden">Export Citation - ${article.title}</span>
                                            </a>
                                        </div>
                                        <div class="button invisible social-media-services">
                                            <a tabindex="0" aria-label="Share" class="tabindex tooltip">
                                                <span aria-hidden="true" class="icon fal fa-share-alt"></span>
                                                <span class="aria-hidden">Share - ${article.title}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </td>
                    </tr>
                </table>
            </article>
        `);
    });
};


// Function to show the loader and hide main content
async function showLoader() {
    document.getElementById('main-body-section').style.display = 'none'; 
    document.getElementById('loading-more').style.display = 'block'; 
}

// Function to hide the loader and show main content
async function hideLoader() {
    setTimeout(() => {
        document.getElementById('loading-more').style.display = 'none'; 
        document.getElementById('main-body-section').style.display = 'block'; 
    }, 3000);
}


function get_journal_id() {
    var currentURL = window.location.href;
    var url = new URL(currentURL);
    var protocol = url.protocol;
    var hostname = url.hostname;
    var port = url.port;
    var pathname = url.pathname;
    var search = url.search;
    var hash = url.hash;
    var pathnameSegments = pathname.slice(1).split('/');
    var journalPort = pathnameSegments[5];
    return journalPort;
}