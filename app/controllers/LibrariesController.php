<?php
use Request\RequestHandler;
use Exception\RequestException;
use Session\UserSessionManager;
use Custom\Mailer;
use JwtToken\JwtService;
use Api\api;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;
use \SecurityFilterChainBlock\UrlFilterChain;

final class LibrariesController extends Controller
{
    private $repository;
    private $_store_sql_model_data;
    private $_delete_sql_model_data;
    private $jwtClassInt;
    private $jwtKey;

    public function __construct() {
       $this->repository = $this->loadModel('Getting');
       $this->_store_sql_model_data = $this->loadModel('Store');
       $this->_delete_sql_model_data = $this->loadModel('Delete');
       $this->jwtClassInt= new JwtService();
       $this->jwtKey = PRIVATE_KEY;
    }

    public function library(){
        $requestException = new RequestException();
        $response = array();
        if ($requestException->CorsHeader()) {
            $authClass= new UserSessionManager();
            if($authClass->authCheck()){
                if (RequestHandler::isRequestMethod('GET')) {
                    $jwt  = new JwtService();
                    $url=implode('',$_REQUEST);
                    $urlParts = explode('/', $url);
                    if (in_array('subjects', $urlParts) && !in_array('journals', $urlParts)) {
                        if (isset($urlParts[3]) && !isset($urlParts[5]) && !isset($urlParts[7])) {
                            if (isset($urlParts[4]) && !is_numeric($urlParts[4])) {
                            redirect('index');
                            }
                            switch (@$urlParts[3]) {
                                case 'subjects':
                                    $page = $_GET['page'] ?? 1;
                                    $itemsPerPage = 30; 
                                    $offset = ($page - 1) * $itemsPerPage;
                                    $package=strip_tags(trim(filter_var($urlParts[2], FILTER_SANITIZE_STRING)));
                                    $subject=strip_tags(trim(filter_var($urlParts[4], FILTER_SANITIZE_STRING)));
                                    $get_bookshalvesinfo = $this->repository->get_all_journal_by_category($package, $subject, $offset, $itemsPerPage);
                                    $activate_bookcases_sidebar = true;
                                    if (!empty($get_bookshalvesinfo)) {
                                        $get_journals_reponses=$get_bookshalvesinfo;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (isset($urlParts[4]) && !is_numeric($urlParts[4])) {
                            redirect('index');
                        }else {
                            $id=strip_tags(trim(filter_var($urlParts[4], FILTER_SANITIZE_STRING)));
                            $get_subject_info = $this->repository->get_subject_info($id);
                        if (isset($urlParts[5])) {
                            switch (@$urlParts[5]){
                                case'bookcases':
                                    if(isset($urlParts[6]) && is_numeric($urlParts[6])){
                                        $page = $_GET['page'] ?? 1;
                                        $itemsPerPage = 40;
                                        $offset = ($page - 1) * $itemsPerPage;
                                        $package=strip_tags(trim(filter_var($urlParts[2], FILTER_SANITIZE_STRING)));
                                        $subject=strip_tags(trim(filter_var($urlParts[4], FILTER_SANITIZE_STRING)));
                                        $category_as_bookcases=strip_tags(trim(filter_var($urlParts[6], FILTER_SANITIZE_STRING)));
                                        $get_bookshalvesinfo = $this->repository->get_journal_on_bookcase($package, $subject, $category_as_bookcases, $itemsPerPage, $itemsPerPage);
                                        
                                        $activate_bookcases_sidebar = true;
                                        if (!empty($get_bookshalvesinfo)) {
                                            $get_journals_reponses=$get_bookshalvesinfo;
                                        }
                                        $id = strip_tags(trim(filter_var($urlParts[6], FILTER_SANITIZE_STRING)));
                                        $cat_id = strip_tags(trim(filter_var($urlParts[6], FILTER_SANITIZE_STRING)));
                                        $get_bookshalvesinfo = $this->repository->get_bookshalves_info($cat_id, $id);
                                        $activate_bookcases_sidebar = true;
                                    }else {
                                        redirect('index');
                                    }
                                    break;
                                default:
                                    $activate_bookcases_sidebar = false;
                                break;
                            }
                        }
                        if (isset($urlParts[7])) {
                            switch (@$urlParts[7]){
                                case'bookshelves':
                                    if(isset($urlParts[2]) && is_numeric($urlParts[2]) && isset($urlParts[4]) && is_numeric($urlParts[4]) && isset($urlParts[6]) && is_numeric($urlParts[6]) && isset($urlParts[8]) && is_numeric($urlParts[8])){
                                        $package=strip_tags(trim(filter_var($urlParts[2], FILTER_SANITIZE_STRING)));
                                        $subject=strip_tags(trim(filter_var($urlParts[4], FILTER_SANITIZE_STRING)));
                                        $category_as_bookcases=strip_tags(trim(filter_var($urlParts[6], FILTER_SANITIZE_STRING)));
                                        $bookshelvesid = strip_tags(trim(filter_var($urlParts[8], FILTER_SANITIZE_STRING)));
                                        $page = $_GET['page'] ?? 1;
                                        $itemsPerPage = 40;
                                        $offset = ($page - 1) * $itemsPerPage;
                                        $cid = $urlParts[6];
                                        $bshid = $urlParts[8];
                                        $geturlRelatives= $this->repository->get_header_core($cid, $bshid);
                                        $get_requested_journals = $this->repository->get_journal_on_bookshelves($package, $subject, $category_as_bookcases, $bookshelvesid, $itemsPerPage, $offset);
                                        if (!empty($get_requested_journals)) {
                                        $get_journals_reponses=$get_requested_journals;
                                        }
                                        if (isset($_GET['query'])) {
                                            redirect("libraries/library/".$urlParts[2]."/subjects/".$urlParts[4]."/bookcases/".$urlParts[6]."/bookshelves/".$urlParts[8]."/?sort=title'");
                                        }
                                    }else {
                                        redirect('index');
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (isset($get_subject_info['subject']) && !empty($get_subject_info['subject']->categories_name) && isset($urlParts[4]) && !isset($urlParts[6]) || isset($urlParts[6]) ==null && !isset($urlParts[8])){
                            $title_name=$get_subject_info['subject']->subjects_name;
                        }elseif (isset($get_bookshalvesinfo['category']) && !empty($get_bookshalvesinfo['category']->categories_name) && isset($urlParts[6]) && !isset($urlParts[8])){
                            $title_name=$get_bookshalvesinfo['category']->categories_name;
                        }elseif (isset($geturlRelatives['url_bookshelves']) && !empty($geturlRelatives['url_bookshelves']->bookshelves_name) && isset($urlParts[6]) && isset($urlParts[8])){
                            $title_name= $geturlRelatives['url_bookshelves']->bookshelves_name.' ~ '.$get_bookshalvesinfo['category']->categories_name;
                        }
                
                        $data =
                        [
                            'page_title'=>(empty($title_name) ? '' : $title_name),
                            'j'=>((isset($get_journals_reponses))?$get_journals_reponses:''),
                            'activate_bookshalves'=>(((!empty($get_bookshalvesinfo)) ?$get_bookshalvesinfo:'')),
                            'sideline'=>($activate_bookcases_sidebar ?? ''),
                            'data'=>$get_subject_info,
                            'header_'=>(isset($urlParts[6]) && $urlParts[6]=='bookcases' && $urlParts[7] !==null && is_numeric($urlParts[7])) ? ($get_bookshalvesinfo['category'] != null ? $get_bookshalvesinfo['category']->categories_name : "") : "",
                            'url'=>((isset($geturlRelatives))?$geturlRelatives:'')
                        ];
                       
                        $this->view("libraries/subject", $data);
                        }

                    }elseif (in_array('journals', $urlParts) && !in_array('subjects', $urlParts)) {
                        if (isset($urlParts[4]) && is_numeric($urlParts[4])) {
                            $id = strip_tags($urlParts[4], FILTER_SANITIZE_STRING && FILTER_SANITIZE_SPECIAL_CHARS && FILTER_SANITIZE_NUMBER_INT);
                            $get_journal_request = $this->repository->get_single_journal_on_Request($id);
                            if (empty($get_journal_request)) {
                                redirect('index');
                            }else{
                                $jk['results'] = $get_journal_request;
                                $data =
                                [
                                    'sideline' => false,
                                    'render_journal' => (!empty($jk) ? $jk : ''),
                                ];
                                $this->view("libraries/journal", $data);
                            }
                        }
                    }
                
                }
            }else{
                redirect("/");          
            }
        }
    }
}
