jQuery(function () {
	initCounter();
});

function initCounter() {
	jQuery('.task-2-wrap').counter();
};

//initOpenPanel
;(function ($) {
	function Counter(options) {
		this.options = $.extend({
			holder: '.counter',
			limitation: 9999999
		}, options);
		this.init();
	};

	Counter.prototype = {
		init: function () {
			if (this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.defaultInfo();
			}
		},
		findElements: function () {
			this.holder = $(this.options.holder);
			this.textArea = this.holder.find('textarea');
			this.blockChar = $(this.holder.find('.char'));
			this.limitationChar = this.holder.attr('data-lim') * 1 || this.options.limitation;
			this.blockReserve = this.holder.find('.reserve');
			this.blockWords = this.holder.find('.words');
			this.blockSpaces = this.holder.find('.spaces');
			this.blockLetters = this.holder.find('.letters');
			this.blockNumbers = this.holder.find('.numbers');
		},
		attachEvents: function () {
			var self = this;
			this.textArea.on('keyup keypress', function () {
				self.allChars = self.textArea.val();
				if (self.limitationChar > self.allChars.length) {
					self.blockChar.text(self.searchAllChar());
					self.blockReserve.text(self.searchReserve());
					self.blockWords.text(self.searchAllWords());
					self.blockLetters.text(self.searchOnlyLetters());
					self.blockNumbers.text(self.searchOnlyNumbers());
					self.blockSpaces.text(self.searchSpace());
				} else {
					self.blockChar.text(self.searchAllChar());
					self.blockReserve.text(self.searchReserve());
					self.blockWords.text(self.searchAllWords());
					self.blockLetters.text(self.searchOnlyLetters());
					self.blockNumbers.text(self.searchOnlyNumbers());
					self.blockSpaces.text(self.searchSpace());
					return false;
				}
			});
		},
		searchOnlyLetters: function () {
			return this.allChars.replace(/[^A-Za-zА-Яа-яЁё]/g, "").length;
		},
		searchOnlyNumbers: function () {
			return this.allChars.replace(/\D+/g,"").length;
		},
		searchSpace: function () {
			return this.allChars.split('').length - this.allChars.split(' ').join('').length;
		},
		searchAllChar: function () {
			return this.allChars.length;
		},
		searchReserve: function () {
			return this.limitationChar - this.allChars.length;
		},
		searchAllWords: function () {
			if(this.allChars.split(' ').join('').length){
				return $.trim(this.allChars).replace(/[ \t]{2,}/g, ' ').split(' ').length;
			} else {
				return 0;
			}
		},
		defaultInfo: function () {
			var self = this;
			self.allChars = self.textArea.val();
			if (self.limitationChar > self.allChars.length) {
				self.blockChar.text(self.searchAllChar());
				self.blockReserve.text(self.searchReserve());
				self.blockWords.text(self.searchAllWords());
				self.blockLetters.text(self.searchOnlyLetters());
				self.blockNumbers.text(self.searchOnlyNumbers());
				self.blockSpaces.text(self.searchSpace());
			} else {
				self.blockChar.text(self.searchAllChar());
				self.blockReserve.text(self.searchReserve());
				self.blockWords.text(self.searchAllWords());
				self.blockLetters.text(self.searchOnlyLetters());
				self.blockNumbers.text(self.searchOnlyNumbers());
				self.blockSpaces.text(self.searchSpace());
				return false;
			}
		}
	};

	// jquery plugin
	$.fn.counter = function (opt) {
		return this.each(function () {
			$(this).data('Counter', new Counter($.extend({
				holder: this
			}, opt)));
		});
	};
}(jQuery));