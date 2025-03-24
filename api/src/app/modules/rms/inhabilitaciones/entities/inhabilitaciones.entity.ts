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

@Entity({name:'inhabilitaciones'})
export class Inhabilitaciones{
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

  @Column({ type: 'varchar', name: 'tipo_inhabilitacion',length: 50 , nullable:true})
  tipoInhabilitacion: string;

  @Column({ type: 'timestamp', name: 'fecha_inhabilitacion' , nullable:true})
  fechaInhabilitacion: string;

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
