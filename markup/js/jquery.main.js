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
			thisTextArea: 'textarea',

			limitation: 9999999,
			dataLimitation: 'data-lim',

			resultChar: '.char',
			resultReserve: '.reserve',
			resultWords: '.words',
			resultSpaces: '.spaces',
			resultLetters: '.letters',
			resultNumbers: '.numbers'
		}, options);
		this.init();
	};

	Counter.prototype = {
		init: function () {
			if (this.options.holder) {
				this.findElements();
				this.attachEvents();
				this.activeSearch();
			}
		},
		findElements: function () {
			this.holder = $(this.options.holder);
			this.textArea = this.holder.find(this.options.thisTextArea);

			this.limitationChar = this.holder.attr(this.options.dataLimitation) * 1 || this.options.limitation;

			this.blockChar = $(this.holder.find(this.options.resultChar));
			this.blockReserve = this.holder.find(this.options.resultReserve);
			this.blockWords = this.holder.find(this.options.resultWords);
			this.blockSpaces = this.holder.find(this.options.resultSpaces);
			this.blockLetters = this.holder.find(this.options.resultLetters);
			this.blockNumbers = this.holder.find(this.options.resultNumbers);
		},
		attachEvents: function () {
			var self = this;
			this.textArea.on('keyup.counter keypress.counter', function () {
				self.activeSearch();
				if (self.limitationChar <= self.allChars.length) {
					return false;
				}
			});
		},
		searchOnlyLetters: function () {
			return this.allChars.replace(/[^A-Za-zА-Яа-яЁё]/g, "").length;
		},
		searchOnlyNumbers: function () {
			return this.allChars.replace(/\D+/g, "").length;
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
			if (this.allChars.split(' ').join('').length) {
				return $.trim(this.allChars).replace(/[ \t]{2,}/g, ' ').split(' ').length;
			} else {
				return 0;
			}
		},
		activeSearch: function () {
			this.allChars = this.textArea.val();
			this.blockChar.text(this.searchAllChar());
			this.blockReserve.text(this.searchReserve());
			this.blockWords.text(this.searchAllWords());
			this.blockLetters.text(this.searchOnlyLetters());
			this.blockNumbers.text(this.searchOnlyNumbers());
			this.blockSpaces.text(this.searchSpace());
		},

		destroy: function () {
			var spare = '';
			this.blockChar.text(spare);
			this.blockReserve.text(spare);
			this.blockWords.text(spare);
			this.blockLetters.text(spare);
			this.blockNumbers.text(spare);
			this.blockSpaces.text(spare);
			this.textArea.off('keyup.counter keypress.counter');
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