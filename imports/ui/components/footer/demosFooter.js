import template from "./demosFooter.html";

class DemosFooter {
}

const name = 'demosFooter';
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: DemosFooter
    });
