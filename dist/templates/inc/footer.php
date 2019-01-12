<!-- FOOTER/ -->
<!-- <footer class="footer">
	<div class="row row_wrp">
		<div class="col-12">
			<ul class="foot-nav">
				<li class="foot-nav__item">
					<a href="/javascript" class="foot-nav__a">JavaScript</a>
				</li>
				<li class="foot-nav__item">
					<a href="/php" class="foot-nav__a">php</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="row row_wrp">
		<div class="col-12">
			<div class="footer__txt">
				Шпаргалка программиста, решение практических задач в программировании.
			</div>
      </div>
	</div>
	<div class="row row_wrp row_col-middle row_sm-x-nw">
		<div class="col col_grow">
			<div class="footer__txt">
				&copy; <?php echo date('Y'); ?> coding.dealersAir, https://coding.dealersair.com<br>
				Licensed under <a href="#license" data-popup="#license" class="js-open-popup light-link light-link_rev light-link_dash">MIT License</a>
			</div>
      </div>
      <div class="col">
			<a href="https://dealersair.com" target="_blank" title="«dealersAir» — интернет-проекты и сервисы" class="footer__logo"><img src="/static/images/dealersair.svg" alt="dealersAir"></a>
		</div>
	</div>
</footer> -->
<!-- /FOOTER -->

<!--POPUPs/-->
<div class="popup">

	<div id="license" class="popup__window">
		<button class="js-popup-close popup-close-btn"></button>
		<div class="popup__inner">
			<p>
				MIT License
			</p>
			<p>
				Copyright (c) <?php echo date('Y'); ?> coding.dealersAir, https://coding.dealersair.com
			</p>
			<p>
				Permission is hereby granted, free of charge, to any person obtaining a copy
				of this software and associated documentation files (the "Software"), to deal
				in the Software without restriction, including without limitation the rights
				to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
				copies of the Software, and to permit persons to whom the Software is
				furnished to do so, subject to the following conditions:
			</p>
			<p>
				The above copyright notice and this permission notice shall be included in all
				copies or substantial portions of the Software.
			</p>
			<p>
				THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
				IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
				FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
				AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
				LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
				OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
				SOFTWARE.
			</p>
		</div> 
	</div>

	<div id="popup-2" class="popup__window" style="max-width: 550px;">
		<button class="js-popup-close popup-close-btn"></button>
		<div class="popup__inner" style="height: 1300px;">
			
		</div>
	</div>

	<!--Media Popup/-->
	<div id="media-popup" class="popup-media popup__window">
		<button class="js-popup-close popup-close-btn"></button>
		<div class="popup__inner">

			<div class="popup-media__box middle">

				<img src="#" class="popup-media__image middle__img" alt="photo">

				<div class="popup-media__video">
					<a href="#" class="popup-media__play"></a>
					<iframe src="" class="popup-media__iframe" allowfullscreen></iframe>
				</div>
				
				<button class="popup-media__arr popup-media__arr_l" data-dir="prev"></button>
				<button class="popup-media__arr popup-media__arr_r" data-dir="next"></button>
				
			</div>
			
			<div class="popup-media__bar row-col-mid">
				<div class="popup-media__bar-date popup-media__data-0 col vw1000-col-12">
					<!--data string 1-->
				</div>
				<div class="popup-media__bar-tit popup-media__data-1 col vw1000-col-12">
					<!--data string 2-->
				</div>
			</div>
		</div>
	</div>
	<!--/Media Popup-->

	<!--Message Popup/-->
	<div id="message-popup" class="popup-message popup__window">
		<button class="js-popup-close popup-close-btn"></button>
		<div class="popup__inner">
			<!-- message html -->
		</div>
	</div>
	<!--/Message Popup-->

</div>
<!--/POPUPs-->

<script src="/static/js/script.js"></script>
<script src="/static/js/common.js"></script>
</body>
</html>