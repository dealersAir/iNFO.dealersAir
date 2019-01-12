<?php
header('HTTP/1.0 404 Not Found');
$meta = array('title' => '404 Страница не найдена');
include $_SERVER['DOCUMENT_ROOT'] . '/templates/inc/header.php';
?>

<!--MAIN/-->
<main class="main">
   <div class="section">
      <article class="row row_wrp">
         <div class="col-12">
            <h1 class="title">404 Страница не найдена</h1>
         </div>
         <div class="article col-12">
            
         </div>
      </article>
   </div>
</main>
<!--/MAIN-->

<?php include $_SERVER['DOCUMENT_ROOT'] . '/templates/inc/footer.php'; ?>