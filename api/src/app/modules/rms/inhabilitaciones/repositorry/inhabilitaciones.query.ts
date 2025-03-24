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
rf.departamento as departamento,
rf.municipio as municipio,
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

export const selectManyConsultas =`
rf.id as id,
COALESCE(pn.nombres,'') as nombres, 
(COALESCE(pn.primer_apellido,'') || ' ' || COALESCE(pn.segundo_apellido,'')) as apellidos,
COALESCE(pn.apellido_casada,'') as apellido_casada,
to_char(pn.fecha_nacimiento,'DD-MM-YYYY') as fecha_nacimiento_format,
(COALESCE(pn.nombres,'') || ' ' || COALESCE(pn.primer_apellido,'') || ' ' || COALESCE(pn.segundo_apellido,'')) as nombre_completo,
`

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