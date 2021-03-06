import {actualizar} from "../../../../api/candidatos/methods.js";
import {name as Alertas} from "../../comun/alertas/alertas";
import template from "./actualizarCandidato.html";

class ActualizarCandidato {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.cargando = false;

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
        this.cargando = true;
        this.tipoMsj = '';
        delete this.datos.celular;
        delete this.datos.paisLada;
        delete this.datos.celularVerificado;
        delete this.datos.emailVerificado;
        actualizar.call(this.datos, this.$bindToContext((err) => {
            if (err) {
                console.log(err);
                this.msj = ' No se pudieron realizar los cambios.';
                this.tipoMsj = 'danger';
            } else {
                this.msj = ' Los cambios se guardaron correctamente.';
                this.tipoMsj = 'success';
            }
            this.cargando = false;
        }));
    }
}

const name = 'actualizarCandidato';

// M??dulo
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ActualizarCandidato,
        bindings: {
            datos: '<',
            id: '<'
        }
    });
