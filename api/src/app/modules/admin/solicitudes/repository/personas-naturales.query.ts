export const selectQueryBasic={
    id:'id',
    nroIdentificacion:`COALESCE(q.nroIdentificacion,'') as nro_identificacion`,
    nombres:`COALESCE(nombres,'') as nombres`,
    apellidos:`(COALESCE(primer_apellido,'') || ' ' || COALESCE(segundo_apellido,'')) as apellidos`,
    apellidoCasada:`COALESCE(apellido_casada,'') as apellido_casada`,
    fechaNacimientoFormat: ` to_char(q.fecha_nacimiento,'DD-MM-YYYY') as fecha_nacimiento_format`,
    status:'q.status as status'
  }

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
    nroIdentificacion:`COALESCE(q.nroIdentificacion,'') ILIKE  :nroIdentificacion`,
    nombres:`(COALESCE(q.nombres,'')|| ' ' ||COALESCE(primer_apellido,'') || ' ' || COALESCE(segundo_apellido,'')) ILIKE :nombres`,
    nombre:`COALESCE(q.nombres,'') ILIKE :nombres`,
    apellidos:`q.primer_apellido ILIKE :apellidos or q.segundo_apellido ILIKE :apellidos`,
  }

export const select = {
  basic:Object.values(selectQueryBasic),
  many:Object.values(selectQuery)  
}

export const selectManySolicitudes =`
sol.id,
sol.tipo_solicitud as TipoSolicitud,
sol.estado as Estado,
sol.descripcion as Descripcion,
sol.usuario_solicitud as UsuarioSolicitud,
to_char(sol.fecha_solicitud,'DD-MM-YYYY HH:mm') as FechaSolicitud,

sol.respuesta as Respuesta,
sol.usuario_solicitud as UsuarioAprobacion,
to_char(sol.fecha_solicitud,'DD-MM-YYYY HH:mm') as FechaAprobacion,

rf.id as id_registro_funcionario,
COALESCE(pn.primer_nombre_persona,'') as primer_nombre, 
COALESCE(pn.segundo_nombre_persona,'') as segundo_nombre,
COALESCE(pn.primer_apellido_persona,'') as primer_apellido, 
COALESCE(pn.segundo_apellido_persona,'') as segundo_apellido,
e.codigo as codigo_empresa, 
e.nombre as nombre_empresa,
rf.ciudad as ciudad,
COALESCE(rf.nro_contrato,'') as nro_contrato,
rf.cargo as cargo,
rf.estado as RegistroFuncionarioEstado,
rf.status as status,
tc.descripcion as tipo_cargo,
tc.id as id_tipo_cargo,
to_char(rf.fecha_ingreso,'DD-MM-YYYY') as fecha_ingreso,
pn.nroIdentificacion as nro_identificacion,
COALESCE(baja.id,0) as id_registro_baja
`