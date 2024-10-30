<?php
final class Store
{
    private $db;
    public function __construct(){
        $this->db = new Database;
    }

    public function insert_issue_data($journalId,$issuedate,$isValidIssue,$Innumber,$suppressed,$title,$typeIn,$volume,$withinSubscription){
        $isValid =  ($isValidIssue =='true') ? '1' : '0';
        $suppres = ($suppressed =='true') ? '1' : '0';
        $withinSub = ($withinSubscription =='true') ? '1' : '0';
        $this->db->query(/** @lang text */"INSERT INTO `issuedyears`(`date`, `isValidIssue`, `journalId`, `num`, `suppressed`, `title`, `type`, `volume`, `withinSubscription`) 
        VALUES (:issuedate,:isValid, :journalId,:Innumber,:suppres,:title,:typeIn,:volume,:withinSub)");
        $this->db->bind(':journalId', $journalId);
        $this->db->bind(':issuedate', $issuedate);
        $this->db->bind(':isValid', $isValid);
        $this->db->bind(':Innumber', $Innumber);
        $this->db->bind(':suppres', $suppres);
        $this->db->bind(':title', $title);
        $this->db->bind(':typeIn', $typeIn);
        $this->db->bind(':volume', $volume);
        $this->db->bind(':withinSub', $withinSub);
        if($this->db->execute()) {
            return true;
        }else {
            return false;
        }
    }
}
