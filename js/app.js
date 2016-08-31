angular.module('ng-toc-demo', [], function() {

})

.directive('ngToc', function() {
  return {
    link: function(scope, elem, attrs) {
      scope.ngToc = []; 
      var targetElements = attrs.ngToc.toLowerCase().replace(/ /g,'').split(',');
      angular.forEach(elem.children(), function(obj, index) {
        var el = angular.element(obj)[0];
        var elType = el.nodeName.toLowerCase();

        if (targetElements.indexOf(elType) > -1) {
          var add = {};
          add.el = elType;
          add.contents = el.innerText;
          scope.ngToc.push(add);
        }
      });
    }
  };
});
