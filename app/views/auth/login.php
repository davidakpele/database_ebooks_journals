<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="robots" content="index,follow"/>
    <meta name="theme-color" content="#ffffff"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="format-detection" content="telephone=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="msapplication-TileColor" content="#2d89ef">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Security-Policy" content="">
    <meta name="description" content="This platform provides access to journals, books and databases from RSC Publishing, linking over 1 million chemical science articles and chapters. You can access the latest research of interest using the custom eAlerts, RSS feeds and blogs or you can explore content using the quick and advanced searches. Discover the highest quality integrated scientific research today - search faster, navigate smarter and connect more." />
    <meta name="fragment" content="!" />
    <title><?php if(isset($data['page_title'])){echo $data['page_title'];}else{echo App_Name;}?></title>
    <link rel="stylesheet" href="<?=ASSETS?>dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="<?=ASSETS?>dist/css/style.css" />
    <link rel="stylesheet" href="<?=ASSETS?>css/fonts.min.css" type="text/css" />
    <link rel="stylesheet" href="<?=ASSETS?>fontawesome/css/all.min.css" type="text/css" />
    <script src="<?=ASSETS?>dist/js/jquery-3.2.1.slim.min.js"></script>
    <script src="<?=ASSETS?>dist/js/popper.min.js"></script>
    <script src="<?=ASSETS?>dist/js/bootstrap.min.js"></script>
    <script>
        root_url = "<?=ROOT?>";
    </script>
</head>
    <body class="auth-widget">
        <div class="topform">
            <div class="minicontainer">
                <div class="formWidget">
                    <div class="container">
                        <div class="panel">
                            <div class="card">
                                <div class="panel-default">
                                    <div class="panel-group">
                                        <div class="panel-heading">
                                            <div class="card-header">
                                                <div class="panel-title">
                                                    <span>Login Account</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel-body">
                                        <div class="card-body">
                                            <form method="POST" autoComplete='off' class="form-group auth-form" action="javascript:void(0)">
                                                <div class="form-group">
                                                    <label htmlFor="exampleInputEmail1" class="mutedLabel">Email address</label>
                                                    <input type="text" class="form-control email" autocomplete="off"/>
                                                    <small id="emailHelp" class="form-text text-muted">We`ll never share your email with anyone else.</small>
                                                </div>
                                                <div class="form-group">
                                                    <label class="form-label">Password:*</label>
                                                    <div class="form-input-group ">
                                                        <input type="password" class="form-control userPassword" value="" autocomplete="off"/>
                                                        <i class="fa fa-eye-slash Icon" id="clearPasswordText" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                                <button type="submit" id="loginButton" class="btnLog btnPrimary btn">
                                                    <span class="loader"></span>
                                                    <span class="text">Login</span>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="panel-footer">
                                        <div class="card-footer">
                                            <div class="panel-danger">
                                                <div class="base_error_msg_container" style="display:none">
                                                    <div class="alert__container alert--warning alert--dark" id="darkerror_resp">
                                                        <div class="alert__icon-box" style="display:flex">
                                                            <i class="fa fa-exclamation-circle" id="clearPasswordText" aria-hidden="true" style="font-size:11px">&nbsp;</i>
                                                            <div id="alert__message"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script type="module"  src="<?=ASSETS?>dist/js/validation.js"></script>
    </body>
</html>