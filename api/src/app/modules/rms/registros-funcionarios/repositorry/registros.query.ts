export const selectMany =`
rf.id as id,
COALESCE(pn.nombres,'') as nombres, 
COALESCE(pn.primer_apellido,'') as primer_apellido, 
COALESCE(pn.segundo_apellido,'') as segundo_apellido,
to_char(pn.fecha_nacimiento,'DD-MM-YYYY') as fecha_nacimiento_format,
COALESCE(pn.apellido_casada,'') as apellido_casada,
(COALESCE(pn.primer_apellido,'') || ' ' || COALESCE(pn.segundo_apellido,'')) as apellidos,
(COALESCE(pn.nombres,'') || ' ' || COALESCE(pn.primer_apellido,'') || ' ' || COALESCE(pn.segundo_apellido,'')) as nombre_completo,
e.codigo as codigo_empresa, 
e.nombre as nombre_empresa,
e.id_tipo_empresa as tipo_empresa,
rf.estadoDepartamento as estado_departamento,
rf.ciudadMunicipio as ciudad_municipio,
COALESCE(rf.nro_contrato,'') as nro_contrato,
rf.cargo as cargo,
rf.estado as estado,
rf.status as status,
tc.descripcion as tipo_cargo,
tc.id as id_tipo_cargo,
to_char(rf.fecha_ingreso,'DD-MM-YYYY') as fecha_ingreso_format,
rf.fecha_ingreso as fecha_ingreso,
pn.nroIdentificacion as nro_identificacion,
COALESCE(baja.id,0) as id_registro_baja
`

export const selectReport =`
e.nombre as nombre_empresa,
pn.nroIdentificacion as nro_identificacion,
(COALESCE(pn.nombres,'') || ' ' || COALESCE(pn.primer_apellido,'') || ' ' || COALESCE(pn.segundo_apellido,'')) as nombre_completo,
rf.cargo as cargo,
rf.estadoDepartamento as estado_departamento,
to_char(rf.fecha_ingreso,'DD-MM-YYYY') as fecha_ingreso_format,
rf.estado as estado
`

export const titleHeader = [
  {col:'A1',size:50,name:'nombre_empresa',label:'Nombre de Empresa'},
  {col:'B1',size:30,name:'nro_identificacion',label:'Nro de Identificacion'},
  {col:'C1',size:30,name:'nombre_completo',label:'Nombre Completo'},
  {col:'D1',size:50,name:'cargo',label:'Cargo'},
  {col:'E1',size:30,name:'estado_departamento',label:'Estado/Departamento'},
  {col:'F1',size:30,name:'fecha_ingreso_format',label:'Fecha Ingreso'},
  {col:'F1',size:10,name:'estado',label:'Estado'}
]


export const selectQuery={
    id:'id',
    nombres:`COALESCE(nombres,'') as nombres`,
    primerApellido:`COALESCE(primer_apellido,'') as primer_apellido`,
    segundoApellido:`COALESCE(segundo_apellido,'') as segundo_apellido`,
    apellidoCasada:`COALESCE(apellido_casada,'') as apellido_casada`,
    fullName:`(COALESCE(nombres,'')|| ' ' ||COALESCE(primer_apellido,'') || ' ' || COALESCE(segundo_apellido,'')) as nombre_completo`,
    tipoIdentificacion:`COALESCE(tipo_identificacion,'') as tipo_identificacion`,
    nroIdentificacion:`COALESCE(q.nroIdentificacion,'') as nro_identificacion`,
    fechaNacimiento: `q.fechaNacimiento as fecha_nacimiento`,
    fechaNacimientoFormat: ` to_char(q.fecha_nacimiento,'DD-MM-YYYY') as fecha_nacimiento_format`,
    email:`COALESCE(email,'') as email`,
    telefono: `COALESCE(q.telefono,'') as telefono`,
    direccion:`COALESCE(direccion,'') as direccion`,
    status:'q.status as status'
  }

export const whereQuery={
    status:`q.status=true`,
    getById:`q.id= :id`,
    getByUnique:`q.nro_identificacion= :nroIdentificacion`,
    nombres:`(COALESCE(nombres,'')|| ' ' ||COALESCE(primer_apellido,'') || ' ' || COALESCE(segundo_apellido,'')) ILIKE :nombres`,
    nroIdentificacion:`COALESCE(q.nroIdentificacion,'') ILIKE  :nroIdentificacion`,
  }