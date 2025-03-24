import { Catalogo } from 'src/app/config/catalogo/entities';
import { CiudadesMunicipios } from 'src/app/data/ciudades_municipios/ciudades_municipios.entity';
import { EstadosDepartamentos } from 'src/app/data/estados_departamentos/estados_departamentos.entity';
import { Empresas } from 'src/app/modules/admin/database/empresas/empresas.entity';
import { Personas } from 'src/app/modules/admin/database/personas/personas.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RegistrosBajas } from '../../registros/registros-bajas/entities';

@Entity({name:'registros_funcionarios'})
export class RegistrosFuncionarios{
  //PRIMARY KEY GUID AUTOCLAVE STRING
  @PrimaryGeneratedColumn()
  id: number;
  // COLUMNS TABLE USERS

  @ManyToOne(() => Personas)
  @JoinColumn({name:'id_persona'})
  personaNatural: Personas

  @ManyToOne(() => Empresas)
  @JoinColumn({name:'id_empresa'})
  empresa: Empresas

  @ManyToOne(() => Catalogo)
  @JoinColumn({name:'id_tipo_cargo'})
  tipoCargo: Catalogo;

  @Column({ type: 'varchar', name: 'tipo_directivo',length: 50 , nullable:true})
  tipoDirectivo: string;

  @Column({ type: 'varchar', name: 'tipo_funcionario',length: 50 , nullable:true})
  tipoFuncionario: string;

  @Column({ type: 'varchar', name: 'tipo_contrato',length: 50 , nullable:true})
  tipoContrato: string;

  @Column({ type: 'varchar', name: 'estado',length: 50, default: 'activo' })
  estado: string;

  @ManyToOne(() => EstadosDepartamentos)
  @JoinColumn({name:'id_estado_departamento'})
  estadoDepartamento: EstadosDepartamentos


  @ManyToOne(() => CiudadesMunicipios)
  @JoinColumn({name:'id_ciudad_municipio'})
  ciudadMunicipio: CiudadesMunicipios

  @Column({ type: 'varchar', name: 'nro_contrato',length: 50 , nullable:true })
  nroContrato: string;

  @Column({ type: 'varchar', name: 'tipo_apoderado',length: 50 , nullable:true})
  tipoApoderado: string;

  @Column({ type: 'varchar', name: 'cargo',length: 50 })
  cargo: string;

  @Column({ type: 'timestamp', name: 'fecha_ingreso' , nullable:true})
  fechaIngreso: string;

  @Column({ type: 'varchar', name: 'codigo_colegiatura',length: 50 , nullable:true })
  codColegiatura: string;

  @Column({ type: 'varchar', name: 'nro_representacion_legal',length: 50 , nullable:true})
  nroRepresentacionLegal: string;

  @Column({ type: 'timestamp', name: 'fecha_inicio_representacion_legal', nullable:true })
  fechaInicioRepresentacionLegal: string;

  @Column({ type: 'timestamp', name: 'fecha_fin_representacion_legal' , nullable:true})
  fechaFinRepresentacionLegal: string;

  @OneToMany(() => RegistrosBajas, registrosBajas => registrosBajas.funcionario)
  bajas: RegistrosBajas[];

  // COLUMNS AUDIT
  @Column({ type: 'boolean', default: true })
  status: boolean;
  
  @Column({ type: 'varchar', name: 'usuario_creacion',length: 50, default: 'default', select: false })
  userCreate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', nullable: false, select: false })
  dateCreate: Date;

  @Column({ type: 'varchar', name: 'usuario_modificacion',length: 50, default: 'default', select: false })
  userUpdate: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'fecha_modificacion', nullable: true, select: false })
  dateUpdate: Date;
}
