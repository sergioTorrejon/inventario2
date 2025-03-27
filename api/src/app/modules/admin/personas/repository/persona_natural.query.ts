export const selectQuery={
    id:'id',
    nombres:`COALESCE(nombres,'') as nombres`,
    apellidos:`(COALESCE(primer_apellido,'') || ' ' || COALESCE(segundo_apellido,'')) as apellidos`,
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
    nombreCompleto:`(COALESCE(q.nombres,'')|| ' ' ||COALESCE(primer_apellido,'') || ' ' || COALESCE(segundo_apellido,'')) ILIKE :nombreCompleto`,
    //CONSULTA
    nroIdentificacionConsulta:`COALESCE(q.nroIdentificacion,'') ILIKE  :nroIdentificacionConsulta`,
    nombresConsulta:`COALESCE(q.nombres,'') ILIKE :nombresConsulta`,
    apellidosConsulta:`q.primer_apellido ILIKE :apellidosConsulta or q.segundo_apellido ILIKE :apellidosConsulta`,

  }

export const select = {
  many:Object.values(selectQuery)  
}