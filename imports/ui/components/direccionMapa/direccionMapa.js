import angular from "angular";
import angularMeteor from "angular-meteor";
import "angular-simple-logger";
import "angular-google-maps";
import "./direccionMapa.css";
import "./direccionMapa.html";

class DireccionMapa {

    constructor($scope) {
        'ngInject';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((posicion) => {
                this.setLocation(posicion.coords.latitude, posicion.coords.longitude);
                $scope.$apply();
            });
        } else {
            console.log('no fue true el navigator.geolocation');
        }
        this.map = {
            center: {
                latitude: -19.4331558,
                longitude: -99.1351149
            },
            zoom: 14,
            events: {
                click: (mapModel, eventName, originalEventArgs) => {
                    this.setLocation(originalEventArgs[0].latLng.lat(), originalEventArgs[0].latLng.lng());
                    $scope.$apply();
                }
            }
        };

        this.marker = {
            options: {
                draggable: true
            },
            events: {
                dragend: (marker, eventName, args) => {
                    this.setLocation(marker.getPosition().lat(), marker.getPosition().lng());
                    $scope.$apply();
                }
            }
        };
    }

    setLocation(latitude, longitude) {
        this.location = {
            latitude,
            longitude
        };
    }
}

const name = 'direccionMapa';

// create a module
export default angular
    .module(name, [
        angularMeteor,
        'nemLogging', // https://github.com/angular-ui/angular-google-maps/issues/1633
        'uiGmapgoogle-maps'

    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            location: '='
        },
        controller: DireccionMapa
    });
