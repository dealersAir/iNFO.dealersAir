<?php
$meta = array('title' => $content->meta_title);
include $_SERVER['DOCUMENT_ROOT'] .'/templates/inc/header.php';
?>

<!--MAIN/-->
<main class="main">
   <div class="section">
      <article class="row row_wrp">
         <div class="col-12">
            <h1 class="title"><?php echo $content->title; ?></h1>
         </div>
         <?php if (!empty($content->text)) { ?>
         <div class="article col-12">
            <?php echo $content->text; ?>
         </div>
         <?php } ?>
         <div class="col-12">
            <ul class="list">
               <?php foreach ($main->getPosts() as $post) { ?>
               <li><a href="<?php echo $post->url; ?>" class="link"><?php echo $post->title; ?></a></li>
               <?php } ?>
            </ul>
         </div>
      </article>
   </div>
</main>
<!--/MAIN-->

<?php include $_SERVER['DOCUMENT_ROOT'] .'/templates/inc/footer.php'; ?>