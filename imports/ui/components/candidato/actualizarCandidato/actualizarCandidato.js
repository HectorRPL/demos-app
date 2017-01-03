import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import ngMessages from "angular-messages";
import {actualizar} from "../../../../api/candidatos/methods.js";
import "./actualizarCandidato.html";

class ActualizarCandidato {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.cargando = true;

        this.respuesta = {
            mostrar: false,
            mensaje: '',
            tipo: ''
        };
        this.dias = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        this.meses = [{
            'id': 1,
            'descripcion': 'Ene'
        }, {
            'id': 2,
            'descripcion': 'Feb'
        }, {
            'id': 3,
            'descripcion': 'Mar'
        }, {
            'id': 4,
            'descripcion': 'Abr'
        }, {
            'id': 5,
            'descripcion': 'May'
        }, {
            'id': 6,
            'descripcion': 'Jun'
        }, {
            'id': 7,
            'descripcion': 'Jul'
        }, {
            'id': 8,
            'descripcion': 'Ago'
        }, {
            'id': 9,
            'descripcion': 'Sep'
        }, {
            'id': 10,
            'descripcion': 'Oct'
        }, {
            'id': 11,
            'descripcion': 'Nov'
        }, {
            'id': 12,
            'descripcion': 'Dic'
        }];
        this.anios = [1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960, 1959, 1958, 1957];
    }

    actualizar() {
        this.cargando = false;
        console.log(this.datos);
        actualizar.call(this.datos, this.$bindToContext((err) => {
            this.respuesta.mostrar = true;
            if (err) {
                this.respuesta.mensaje = ' No se pudieron realizar los cambios.' + err;
                this.respuesta.tipo = 'danger';
                this.cargando = true;
            } else {
                this.respuesta.mensaje = ' Los cambios se guardaron correctamente.';
                this.respuesta.tipo = 'success';
                this.cargando = true;
            }
        }));
    }
}

const name = 'actualizarCandidato';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        ngMessages
    ])
    .component(name, {
        templateUrl: `imports/ui/components/candidato/${name}/${name}.html`,
        controllerAs: name,
        controller: ActualizarCandidato,
        bindings: {
            datos: '<',
            id: '<'
        }
    });
