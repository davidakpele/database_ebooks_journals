<?php $this->view('./components/Header');?>
<body id="pagetop" class="oxy-ui pubs-ui hp-page">
    <?php 
        $url=implode('',$_REQUEST);
        $urlParts = explode('/', $url);
    ?>
    <?php $this->view("./components/Nav"); ?>
    <div id="library-content" class="container " style="margin-top:-20px">

        <?php $this->view('./components/NavDrawe');?>
    </div>
        <script src="<?=ASSETS?>js/vendor.min.js"></script>
        <script src="<?=ASSETS?>js/pubs-ui.min.js"></script>
        <script  type="module" src="<?=ASSETS?>js/script.js"></script>
        <script src="<?=ASSETS?>js/ev.js"></script>
    </body>

</html>