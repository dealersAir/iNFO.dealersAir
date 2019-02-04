<?php
$meta = array('title' => $content->meta_title);
include $_SERVER['DOCUMENT_ROOT'] .'/templates/inc/header.php';
?>

<!--MAIN/-->
<main class="main">
   <?php echo $content->text; ?>
</main>
<!--/MAIN-->

<?php include $_SERVER['DOCUMENT_ROOT'] .'/templates/inc/footer.php'; ?>