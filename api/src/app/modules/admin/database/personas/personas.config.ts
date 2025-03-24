export const PERSONAS_MODEL = {
    config:{
        name:'persona_natural',
        cardTitle:'PERSONAS',
        cardAvatar:'assets/images/img/persona.png',
    },
    optionSelected:'home',
    menu: [  
        {name:'home', label:'Registros', icon:'article'},
        {name:'nuevo', label:'Nuevo Registro', icon:'add'},
        {name:'reports',label:'Reportes', icon:'article'},
        ],
    columns: [  
        {name:'nro_identificacion', label:'Nro. Identificación',  width:20},
        {name:'nombres', label:'Nombres',  width:10},
        {name:'primer_apellido', label:'Primer Apellido',  width:20},
        {name:'segundo_apellido', label:'Segundo Apellido',  width:20},
          ],
    elements: [  
        {name:'nroIdentificacion', type:'input',label:'Nro de Identificación',  width:30},
        {name:'nombres',type:'input', label:'Nombre y Apellido',  width:40},
        ],
    formControl: {
        nroIdentificacion:  [''],
        nombres:  ['']
        },

}