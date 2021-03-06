import {Meteor} from "meteor/meteor";
import {Vacantes} from "../collection";
import {Candidatos} from "../../candidatos/collection";
import {Direcciones} from "../../direcciones/collection";
import {Tiendas} from "../../tiendas/collection";
import {Cadenas} from "../../catalogos/cadenas/collection";
import {Estados} from "../../catalogos/estados/collection";
import {Puestos} from "../../catalogos/puestos/collection";
import {Postulaciones} from "../../postulaciones/collection";
import {Experiencias} from "../../catalogos/experiencias/collection";
import {Habilidades} from "../../catalogos/habilidades/collection";
import {Escuelas} from "../../catalogos/escuelas/collection";
import {Counts} from "meteor/tmeasday:publish-counts";

const CMX = 'CMX';
const EDO = 'MEX';
if (Meteor.isServer) {

    Meteor.publish('vacantes.candidato.postulado', function (vacanteId) {
        if (this.userId) {
            const candidato = Candidatos.findOne({propietario: this.userId});
            let selector = {$and: [vacanteId, {candidatoId: candidato._id}]};
            Counts.publish(this, `count.vacante.candidato.postulado.${vacanteId.vacanteId}`, Postulaciones.find(selector));
        } else {
            this.ready();
        }
    });

    Meteor.publishComposite('vacantes.publicadas', function (options) {
        let selector = {$and: [{eliminada: false}, {fechaExpiracion: {$gt: new Date()}}, {cubierta: false}]};
        options.sort = {fechaCreacion: -1};
        if (this.userId) {
            const candidato = Candidatos.findOne({propietario: this.userId});
            const direccion = Direcciones.findOne({propietario: candidato._id});

            if (CMX == direccion.estadoId || EDO === direccion.estadoId) {
                selector.$and[2] = {$or: [{estadoId: CMX}, {estadoId: EDO}]};
            } else {
                selector.$and[2] = {estadoId: direccion.estadoId};
            }
            Counts.publish(this, 'numVacantes', Vacantes.find(selector), {
                noReady: true
            });
            let fields = {
                _id: 1,
                fechaCreacion: 1,
                marca: 1,
                estadoId: 1,
                sueldo: 1,
                puestoId: 1,
                totalTiendas: 1,
                perfil: 1
            };
            options.fields = fields;
            return {
                find: function () {
                    return Vacantes.find(selector, options)
                },
                children: [
                    {
                        find: function (vacante) {
                            return Estados.find({_id: vacante.estadoId});
                        }
                    },
                    {
                        find: function (vacante) {
                            return Puestos.find({_id: vacante.puestoId});
                        }
                    }
                ]
            }

        } else {
            //TODO verificar  como bloquear la publicaci??n.
            this.ready();
        }
    });

    Meteor.publishComposite('vacantes.detalle', function (vacanteId) {
        return {
            find: function () {
                return Vacantes.find(vacanteId, {
                    fields: {
                        eliminada: 0
                    }
                });
            },
            children: [
                {
                    find: function (vacante) {
                        return Estados.find({_id: vacante.estadoId});
                    }
                },
                {
                    find: function (vacante) {
                        return Puestos.find({_id: vacante.puestoId});
                    }
                },
                {
                    find: function (vacante) {
                        return Escuelas.find({_id: vacante.perfil.escolaridad});
                    }
                },
                {
                    find: function (vacante) {
                        const habilidades = vacante.perfil.habilidades.listado;
                        return Habilidades.find({_id: {$in: habilidades}});
                    }
                },
                {
                    find: function (vacante) {
                        const experiencias = vacante.perfil.experiencia.listado;
                        return Experiencias.find({_id: {$in: experiencias}});
                    }
                }
            ]
        }
    });

    Meteor.publishComposite('vacantes.tiendas', function (vacanteId) {
        return {
            find: function () {
                return Tiendas.find(vacanteId, {
                    fields: {
                        fechaCreacion: 0
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
    });


}
