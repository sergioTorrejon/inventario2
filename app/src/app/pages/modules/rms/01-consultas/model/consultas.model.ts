import { Validators } from "@angular/forms";

export const CONSULTAS = {
    name:'consultas',
    cardTitle:'CONSULTAS PERSONAS REGISTRADAS',
    columns:   [
        {name:'nro_identificacion', label:'Nro. Identificación',  width:20},
        {name:'nombres', label:'Nombres',  width:20},
        {name:'apellidos', label:'Apellidos',  width:20},
        {name:'apellido_casada', label:'Apellido Casada',  width:15},
        {name:'fecha_nacimiento_format', label:'Fecha de Nacimiento',  width:15},
      ],
      formControl:
      {
        nroIdentificacion:['',[Validators.required, Validators.minLength(3)]],
        nombres:['',[Validators.required, Validators.minLength(3)]],
        apellidos:['',[Validators.required, Validators.minLength(3)]],
      },

    data:[],
    count:0,
    dataOptions:[]


}

export const queryGetData = ( dto: any ) =>{
    const res = 
    (dto.tipoEmpresa === ''? ``: `&tipoEmpresa=${dto.tipoEmpresa}`) +
    (dto.nombreEmpresa === ''? ``: `&nombreEmpresa=${dto.nombreEmpresa}`)
    return res;
}