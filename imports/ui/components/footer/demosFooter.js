import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './demosFooter.html';

class DemosFooter {
}

const name = 'demosFooter';
export default angular.module(name, [
    angularMeteor,
]).component(name, {
    templateUrl: `imports/ui/components/footer/${name}.html`,
    controllerAs: name,
    controller: DemosFooter
});
