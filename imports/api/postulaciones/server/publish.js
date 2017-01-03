/**
 * Created by jvltmtz on 23/08/16.
 */
import {Meteor} from 'meteor/meteor';
import {Postulaciones} from '../collection';
import {Vacantes} from '../../vacantes/collection';
import {Candidatos} from '../../candidatos/collection';
import {Puestos} from '../../puestos/collection';
import {Estados} from '../../estados/collection';
import {Cadenas} from '../../cadenas/collection';
import {Tiendas} from '../../tiendas/collection';
import {Counts} from 'meteor/tmeasday:publish-counts';


if (Meteor.isServer) {

    Meteor.publishComposite('postulaciones.mis', function (estado) {
        if (this.userId) {
            const candidato = Candidatos.findOne({propietario: this.userId});
            const selector = {$and: [{candidatoId: candidato._id}, estado]};
            return {
                find: function () {
                    return Postulaciones.find(selector, {
                        fields: {
                            fechaCreacion: 0,
                        }
                    });
                },
                children: [
                    {
                        find: function (postulacion) {
                            return Vacantes.find({_id: postulacion.vacanteId}, {
                                fields: {
                                    _id: 1,
                                    fechaCreacion: 1,
                                    marca: 1,
                                    estadoId: 1,
                                    sueldo: 1,
                                    puestoId: 1
                                }
                            });
                        },
                        children: [
                            {
                                find: function (vacante) {
                                    return Puestos.find({_id: vacante.puestoId});
                                }
                            },
                            {
                                find: function (vacante) {
                                    return Estados.find({_id: vacante.estadoId});
                                }
                            }
                        ]
                    },
                    {
                        find: function (postulacion) {
                            return Tiendas.find({_id: postulacion.tiendaId}, {
                                fields: {
                                    delMpio: 1,
                                    sucursal: 1,
                                    cadenaId: 1
                                }
                            });
                        },
                        children: [
                            {
                                find: function (tienda) {
                                    return Cadenas.find({_id: tienda.cadenaId});
                                }
                            }
                        ]
                    }
                ]
            }
        } else {
            this.ready();
        }
    });
}
