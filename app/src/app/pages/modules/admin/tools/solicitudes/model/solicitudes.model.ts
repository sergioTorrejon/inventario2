export const EMPRESA_MODEL = {
    name:'solicitudes',
    cardTitle:'REGISTRO Solicitudes',
    columns: [  
        {name:'tipo_solicitud', label:'tipo_solicitud',  width:20},
        {name:'fecha_solicitud', label:'fecha_solicitud',  width:20},
        {name:'descripcion', label:'descripcion',  width:30},
        {name:'estado', label:'estado',  width:10},
        ],
    formControl: {
        tipoEmpresa:[''],
        nombreEmpresa:[''],
        },
    data:[],
    count:0,
    dataOptions:''


}

export const queryGetData = ( dto: any ) =>{
    const res = 
    (dto.tipoEmpresa === ''? ``: `&tipoEmpresa=${dto.tipoEmpresa}`) +
    (dto.nombreEmpresa === ''? ``: `&nombreEmpresa=${dto.nombreEmpresa}`)
    return res;
}