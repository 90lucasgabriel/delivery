(function () {
  "use strict";

  angular
    .module('app.directive')
    .filter('headerShrink', headerShrink);

  headerShrink.$inject = ['$document'];

  function headerShrink(){
    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        var resizeFactor, scrollFactor, blurFactor;
        var header = $document[0].body.querySelector('.map');
        
        $element.bind('scroll', function(e) {
          if (e.detail.scrollTop >= 0) {
            // Start shrinking
            // shrinkAmt = headerHeight - Math.max(0, (starty + headerHeight) - e.detail.scrollTop);
            // shrink(header, $element[0], shrinkAmt, headerHeight);
            scrollFactor = e.detail.scrollTop/2;
            header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, +' + scrollFactor + 'px, 0)';
          } else {
            // shrink(header, $element[0], 0, headerHeight);
            resizeFactor = -e.detail.scrollTop/100 + 0.99;
            blurFactor = -e.detail.scrollTop/10;
            header.style[ionic.CSS.TRANSFORM] = 'scale('+resizeFactor+','+resizeFactor+')';
            header.style.webkitFilter = 'blur('+blurFactor+'px)';
          }
        });
      }
    }

  };
})();

