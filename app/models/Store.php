<?php
final class Store
{
    private $_connect_db;
    public function __construct(){
        $this->_connect_db = new Database;
    }

    public function insert_issue_data($journalId,$issuedate,$isValidIssue,$Innumber,$suppressed,$title,$typeIn,$volume,$withinSubscription){
        $isValid =  ($isValidIssue =='true') ? '1' : '0';
        $suppres = ($suppressed =='true') ? '1' : '0';
        $withinSub = ($withinSubscription =='true') ? '1' : '0';
        $this->_connect_db->query(/** @lang text */"INSERT INTO `issuedyears`(`date`, `isValidIssue`, `journalId`, `num`, `suppressed`, `title`, `type`, `volume`, `withinSubscription`) 
        VALUES (:issuedate,:isValid, :journalId,:Innumber,:suppres,:title,:typeIn,:volume,:withinSub)");
        $this->_connect_db->bind(':journalId', $journalId);
        $this->_connect_db->bind(':issuedate', $issuedate);
        $this->_connect_db->bind(':isValid', $isValid);
        $this->_connect_db->bind(':Innumber', $Innumber);
        $this->_connect_db->bind(':suppres', $suppres);
        $this->_connect_db->bind(':title', $title);
        $this->_connect_db->bind(':typeIn', $typeIn);
        $this->_connect_db->bind(':volume', $volume);
        $this->_connect_db->bind(':withinSub', $withinSub);
        if($this->_connect_db->execute()) {
            return true;
        }else {
            return false;
        }
    }

    /** @noinspection PhpVoidFunctionResultUsedInspection */
    public function save_journal($categorieid, $bookshelvesid, $journal_name, $issues, $imgType, $uploadPath) {
        // Get the last inserted journal ID or set a default start ID
        $this->_connect_db->query("SELECT journalid FROM `journals` ORDER BY journalid DESC LIMIT 1");
        $result = $this->_connect_db->single();
        $id = !empty($result) ? $result->journalid + 1 : 101;

        // Insert journal
        $this->_connect_db->query("INSERT INTO `journals`(`journalid`, `bookshelvesid`, `categoriesid`, `journal_name`, `imagetype`, `imagedata`)
                                    VALUES (:id, :bookshelvesid, :categorieid, :journal_name, :imgType, :uploadPath)");
        $this->_connect_db->bind(':id', $id);
        $this->_connect_db->bind(':bookshelvesid', $bookshelvesid);
        $this->_connect_db->bind(':categorieid', $categorieid);
        $this->_connect_db->bind(':journal_name', $journal_name);
        $this->_connect_db->bind(':imgType', $imgType);
        $this->_connect_db->bind(':uploadPath', $uploadPath);
        
        if ($this->_connect_db->execute()) {
            $journalid = $id;

            // Loop through issues and volumes for insertion
            foreach ($issues as $issue_date => $issue_data) {
                foreach ($issue_data['volumes'] as $volume_key => $volume_data) {
                    
                    // Insert each issue
                    $this->_connect_db->query("INSERT INTO `issues`(`journalid`, `date`, `title`, `volume`)
                                            VALUES (:journalid, :issue_date, :issue_title, :volume)");
                    $this->_connect_db->bind(':journalid', $journalid);
                    $this->_connect_db->bind(':issue_date', $issue_date);
                    $this->_connect_db->bind(':issue_title', $volume_data['title']);
                    $this->_connect_db->bind(':volume', $volume_data['volume']);
                    
                    if ($this->_connect_db->execute()) {
                        // Get the issue ID
                        $this->_connect_db->query("SELECT id FROM `issues` ORDER BY id DESC LIMIT 1");
                        $issue_id = $this->_connect_db->single()->id;

                        // Insert volume data
                        $this->_connect_db->query("INSERT INTO `volumes`(`issue_id`, `title`, `volume_number`)
                                                VALUES (:issue_id, :volume_title, :volume_number)");
                        $this->_connect_db->bind(':issue_id', $issue_id);
                        $this->_connect_db->bind(':volume_title', $volume_data['title']);
                        $this->_connect_db->bind(':volume_number', $volume_data['volume']);
                        
                        if ($this->_connect_db->execute()) {
                            // Get volume ID
                            $this->_connect_db->query("SELECT volume_id FROM `volumes` ORDER BY volume_id DESC LIMIT 1");
                            $volume_id = $this->_connect_db->single()->volume_id;

                            // Insert articles associated with the volume
                            foreach ($volume_data['articles'] as $article) {
                                $this->_connect_db->query("INSERT INTO `articles`(`volume_id`, `journalid`, `author`, `api_web_link`, `date`, `open_access`, `title`)
                                                        VALUES (:volume_id, :journalid, :author, :apiWebInContextLink, :date, :openAccess, :title)");
                                $this->_connect_db->bind(':volume_id', $volume_id);
                                $this->_connect_db->bind(':journalid', $journalid);
                                $this->_connect_db->bind(':author', $article['author']);
                                $this->_connect_db->bind(':apiWebInContextLink', $article['apiWebInContextLink']);
                                $this->_connect_db->bind(':date', $article['date']);
                                $this->_connect_db->bind(':openAccess', $article['openAccess']);
                                $this->_connect_db->bind(':title', $article['title']);
                                
                                if (!$this->_connect_db->execute()) {
                                    return false;
                                }
                            }
                        }
                    } else {
                        return false;
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }


}
