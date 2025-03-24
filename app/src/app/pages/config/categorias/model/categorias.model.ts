export const CATEGORIAS_MODEL = {
    name:'categoria',
    cardTitle:'CATEGORIA EMPRESAS',
    columns: [  
        {name:'categoria', label:'Categoria',  width:30},
        {name:'codigo', label:'Codigo',  width:10},
        {name:'descripcion', label:'descripcion',  width:40},
        ],
    formControl: {
        tipoCategoria:['empresas'],
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