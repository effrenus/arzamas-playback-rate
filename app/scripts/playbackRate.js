'use strict';

var classPrefix = 'chrome-';
var PLAYBACK_RATES = [2, 1.5, 1.25, 1];

var controlsContainer = document.querySelector('.additional_controls');

var PlaybackControl = {
  init: function() {
    this.currentRate = 1;
    this.createDom();
  },

  createDom: function() {
    var activeElm;
    var container;

    container = this.container = document.createElement('div');
    container.className = classPrefix + 'rate__container';

    activeElm = this.activeElm = document.createElement('span');
    activeElm.className = classPrefix + 'rate__cur';
    activeElm.innerText = this.currentRate;
    activeElm.addEventListener('click', this.toggleMode.bind(this), false);
    container.appendChild(activeElm);

    container.appendChild(this.createPlaybackSelect());

    controlsContainer.appendChild(container);
  },

  toggleMode: function() {
    var container = this.container;
    var activeElm = this.activeElm;
    var isOpened = (container.className.indexOf('is-open') > -1) ? true : false;

    if (isOpened) {
      activeElm.innerText = this.currentRate;
      container.className = container.className.replace(/\s+is-open/, '');
    }
    else {
      activeElm.innerText = '✕';
      container.className += ' is-open';
    }
  },

  setPlaybackRate: function(event) {
    var elm = event.target;
    this.currentRate = parseFloat(elm.getAttribute('data-rate'));

    document.getElementById('player_video_html5_api').playbackRate = this.currentRate;

    this.toggleMode();
  },

  createPlaybackSelect: function() {
    var self = this;
    var selectContainer = document.createElement('div');
    selectContainer.className = classPrefix + 'rate-select';

    PLAYBACK_RATES.forEach(function(rate) {
      var elm = document.createElement('span');
      elm.className = classPrefix + 'rate-select__item';
      elm.innerText = rate;
      elm.setAttribute('data-rate', rate);
      elm.addEventListener('click', self.setPlaybackRate.bind(self), false);

      selectContainer.appendChild(elm);
    });

    return selectContainer;
  }

};

PlaybackControl.init();
