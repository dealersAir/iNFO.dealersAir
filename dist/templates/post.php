<?php
$meta = array('title' => $content->meta_title);
include $_SERVER['DOCUMENT_ROOT'] .'/templates/inc/header.php';
?>

<!--MAIN/-->
<main class="main">
   <article class="section">
      <div class="row row_wrp">
         <div class="col-12">
            <h1 class="title"><?php echo $content->title; ?></h1>
         </div>
      </div>
      <div class="article row row_wrp">
         <div class="col-12">
            <?php echo $content->text; ?>
         </div>
      </div>
   </article>
</main>
<!--/MAIN-->

<?php include $_SERVER['DOCUMENT_ROOT'] .'/templates/inc/footer.php'; ?>