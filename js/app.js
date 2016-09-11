angular.module('ngToc', [])

.directive('ngTocTarget', function() {
  return {
    link: function(scope, elem, attrs) {
      attrs.ngTocTarget = attrs.ngTocTarget || 'h1, h2, h3';
      scope.ngToc = [];
      var runningList = [];
      var targetElements = attrs.ngTocTarget.toLowerCase().replace(/ /g,'').split(',');
      var index = 0;

      angular.forEach(elem.children(), function(obj) {
        var el = angular.element(obj)[0];
        var elType = el.nodeName.toLowerCase();

        //if the element's children match the target elements
        if (targetElements.indexOf(elType) > -1) {
          var add = {};
          add.el = elType;
          add.contents = el.innerText;

          var elementId = el.innerText.replace(/ /g,'_');

          var isMatchIndex = runningList.indexOf(add.contents);
          var countIndex = isMatchIndex+1;
          runningList.push(el.innerText);
          runningList.push(0);

          if (isMatchIndex > -1) {
            runningList[countIndex] = runningList[countIndex] +1;
          }

          if (runningList[countIndex] > 0) {
            angular.element(el).attr('id', elementId + '_' + runningList[countIndex]);
            add.id = elementId + '_' + runningList[countIndex];
          } else {
            angular.element(el).attr('id', elementId);
            add.id = elementId;
          }

          scope.ngToc.push(add);
          index++;
        }
      });
    }
  };
})

.directive('ngTocList', function() {
  return {
    templateUrl: '../views/ngtoclist.html',
    link: function(scope, elem, attrs) {
      scope.scrollTo = function(loc, e) {
        e.preventDefault();
        var el = document.getElementById(loc.item.id);
        window.scroll(0, el.offsetTop);
      };
    }
  };
});
