// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="logokademy.png"></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "php",
			img: "https://mangnoibo.com/uploads/images/bang-gia-thi-cong-mang-lan-2.jpg",
			id: 1,
		},
		{
			name: "css3",
			img: "https://www.conceptdraw.com/How-To-Guide/picture/personal-area-network.png",
			id: 2
		},
		{
			name: "html5",
			img: "https://www.shiksha.com/online-courses/articles/wp-content/uploads/sites/11/2022/07/MicrosoftTeams-image-7-3.jpg",
			id: 3
		},
		{
			name: "jquery",
			img: "https://maisonoffice.vn/wp-content/uploads/2022/02/bo-ung-dung-van-phong-microsoft-office.jpg",
			id: 4
		}, 
		{
			name: "javascript",
			img: "https://cdn.tgdd.vn/hoi-dap/1305955/Thumbnail/tim-hieu-ve-chip-apple-m1-con-chip-arm-5nm-dau-tien-danh-thumb.jpg",
			id: 5
		},
		{
			name: "node",
			img: "https://viindoocdn-1d03b.kxcdn.com/web/image/908682-b02bc998/dich-vu-saas-cap-nhat-tinh-nang.png",
			id: 6
		},
		{
			name: "photoshop",
			img: "https://savvycom.vn/wp-content/uploads/2023/07/4-Vi-Du-Ve-IoT-Tao-Nen-Dot-Pha-Trong-Cuoc-Song-Hang-Ngay.jpg",
			id: 7
		},
		{
			name: "php",
			img: "https://mangnoibo.com/uploads/images/bang-gia-thi-cong-mang-lan-2.jpg",
			id: 1,
		},
		{
			name: "css3",
			img: "https://www.conceptdraw.com/How-To-Guide/picture/personal-area-network.png",
			id: 2,
		},
		{
			name: "javascript",
			img: "https://cdn.tgdd.vn/hoi-dap/1305955/Thumbnail/tim-hieu-ve-chip-apple-m1-con-chip-arm-5nm-dau-tien-danh-thumb.jpg",
			id: 5,
		},
		{
			name: "php",
			img: "https://mangnoibo.com/uploads/images/bang-gia-thi-cong-mang-lan-2.jpg",
			id: 1,
		},{
			name: "node",
			img: "https://viindoocdn-1d03b.kxcdn.com/web/image/908682-b02bc998/dich-vu-saas-cap-nhat-tinh-nang.png",
			id: 6
		}
		
	
	];
    
	Memory.init(cards);


})();