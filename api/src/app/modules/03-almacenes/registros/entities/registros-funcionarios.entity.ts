import { Catalogos } from 'src/app/modules/01-admin/03-catalogos/entities';
import { Empresas } from 'src/app/modules/02-data/empresas/entities/empresas.entity';
import { Personas } from 'src/app/modules/02-data/personas/entities/personas.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name:'registros'})
export class Registros{
  
  /******************************IDENTIFICADOR************************************** */
  @PrimaryGeneratedColumn()
  id: number;

  /******************************CLAVES FORANEAS************************************** */
  @ManyToOne(() => Personas)
  @JoinColumn({name:'id_persona'})
  personaNatural: Personas

  @ManyToOne(() => Empresas)
  @JoinColumn({name:'id_empresa'})
  empresa: Empresas

  @ManyToOne(() => Catalogos)
  @JoinColumn({name:'id_tipo_cargo'})
  tipoCargo: Catalogos;


  /******************************COLUMNAS************************************** */
  @Column({ type: 'varchar', name: 'pais',length: 50 , nullable:true})
  pais: string;

  @Column({ type: 'varchar', name: 'almacen',length: 50 , nullable:true})
  almacen: string;

  @Column({ type: 'varchar', name: 'tipo_registro',length: 50 , nullable:true})
  tipoRegistro: string;

  @Column({ type: 'varchar', name: 'tipo_apoderado',length: 50 , nullable:true})
  tipoApoderado: string;
  
  @Column({ type: 'timestamp', name: 'fecha' , nullable:true})
  fecha: string;
  
  @Column({ type: 'varchar', name: 'nro_contrato',length: 50 , nullable:true })
  nroContrato: string;
    
  @Column({ type: 'varchar', name: 'cargo',length: 50 })
  cargo: string;
    
  @Column({ type: 'varchar', name: 'codigo_colegiatura',length: 50 , nullable:true })
  codColegiatura: string;
  
  @Column({ type: 'varchar', name: 'nro_representacion_legal',length: 50 , nullable:true})
  nroRepresentacionLegal: string;
  
  @Column({ type: 'timestamp', name: 'fecha_inicio_representacion_legal', nullable:true })
  fechaInicioRepresentacionLegal: string;
  
  @Column({ type: 'timestamp', name: 'fecha_fin_representacion_legal' , nullable:true})
  fechaFinRepresentacionLegal: string;
  
  @Column({ type: 'varchar', name: 'estado',length: 50, default: 'activo' })
  estado: string;
  
  /******************************ACTIVO************************************** */
  @Column({ type: 'boolean', default: true })
  active: boolean;
  
  /******************************AUDITABLE************************************** */
  @Column({ type: 'varchar', name: 'usuario_creacion',length: 50, default: 'default', select: false })
  userCreate: string;
  
  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', nullable: false, select: false })
  dateCreate: Date;
 
}
