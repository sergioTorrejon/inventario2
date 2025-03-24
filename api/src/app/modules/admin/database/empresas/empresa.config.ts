export const EMPRESA_MODEL = {
    config:{
        name:'empresa',
        cardTitle:'EMPRESAS',
        cardAvatar:'assets/images/img/empresa.png',
    },
    optionSelected:'registros',
    menu: [  
        {name:'registros',label:'Registros',  icon:'preview'},
        {name:'nuevo', label:'Nuevo',  icon:'add'},
        {name:'reports',label:'Reportes',  icon:'article'},
        ],
    columns: [  
        {name:'categoria', label:'Categoria',  width:30},
        {name:'codigoempresa', label:'Código',  width:10},
        {name:'sigla', label:'Sigla',  width:10},
        {name:'nombre', label:'Empresa',  width:50},
        ],
    elements: [  
        {name:'tipoEmpresa', type:'select',label:'Categoria/Tipo de empresa',  width:50},
        {name:'nombreEmpresa',type:'input', label:'Codigo',  width:50},
        ],
    formControl: {
        tipoEmpresa:[''],
        nombreEmpresa:[''],
        },

}
