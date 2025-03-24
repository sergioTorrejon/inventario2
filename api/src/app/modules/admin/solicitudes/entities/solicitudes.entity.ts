import { RegistrosBajas } from 'src/app/modules/rms/registros/registros-bajas/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Empresas } from '../../database/empresas/empresas.entity';

@Entity({name:'solicitudes'})
export class Solicitudes{
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => Empresas)
  @JoinColumn({name:'id_empresa'})
  Empresa: Empresas
  
  @ManyToOne(() => RegistrosBajas)
  @JoinColumn({name:'id_registros_baja'})
  registroBaja: RegistrosBajas

  @Column({ type: 'varchar', name:'tipo_solicitud' ,length: 50 , nullable: true })
  TipoSolicitud: string;

  @Column({ type: 'varchar', name:'descripcion' ,length: 500 , nullable: true })
  Descripcion: string;

  @Column({ type: 'varchar', name:'respuesta' ,length: 500 , nullable: true })
  Respuesta: string;

  @Column({ type: 'varchar', name: 'estado',length: 50 , nullable: true})
  Estado: string;

  @Column({ type: 'varchar', name: 'usuario_solicitud',length: 50, nullable: true})
  UsuarioSolicitud: string;

  @Column({ type: 'timestamp', name: 'fecha_solicitud', nullable: true })
  FechaSolicitud: Date;

  @Column({ type: 'varchar', name: 'usuario_aprobacion',length: 50, nullable: true  })
  UsuarioaAprobacion: string;

  @Column({ type: 'timestamp', name: 'fecha_aprobacion', nullable: true })
  FechaAprobacion: Date;


  @Column({ type: 'boolean', default: true })
  status: boolean;
  
  @Column({ type: 'varchar', name: 'usuario_creacion',length: 50, default: 'default', select: false })
  UsuarioCreacion: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', nullable: false, select: false })
  FechaCreacion: Date;

  @Column({ type: 'varchar', name: 'usuario_modificacion',length: 50, default: 'default', select: false })
  UsuarioModificacion: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'fecha_modificacion', nullable: true, select: false })
  FechaModificacion: Date;
}
