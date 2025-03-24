import {
  CategoriaRegistro,
} from 'src/app/config/categorias/categoria-registro/entities';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RegistrosFuncionarios } from '../../../registros-funcionarios/entities';

@Entity({name:'registros_bajas'})
export class RegistrosBajas{
  //PRIMARY KEY GUID AUTOCLAVE STRING
  @PrimaryGeneratedColumn()
  id: number;
  // COLUMNS TABLE USERS
  @ManyToOne((type) => RegistrosFuncionarios, (registrosFuncionarios) => registrosFuncionarios.bajas)
  @JoinColumn({name:'id_registro_funcionario'})
  funcionario: RegistrosFuncionarios


  @ManyToOne((type) => CategoriaRegistro)
  @JoinColumn({name:'id_categoria_funcionario'})
  categoriaBaja: CategoriaRegistro

  @Column({ type: 'varchar', name:'nro_baja', length: 50 })
  nroBaja: string;

  @Column({ type: 'timestamp',name:'fecha_baja', nullable:true})
  fechaBaja: Date;

  @Column({ type: 'text', nullable:true })
  comentarios: string;
  

  // COLUMNS AUDIT
  @Column({ type: 'boolean', default: true })
  status: boolean;
  
  @Column({ type: 'varchar', name: 'usuario_creacion',length: 50, default: 'default', select: false })
  userCreate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', nullable: true, select: false })
  dateCreate: Date;

  @Column({ type: 'varchar', name: 'usuario_modificacion',length: 50, default: 'default', select: false })
  userUpdate: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'fecha_modificacion', nullable: true, select: false })
  dateUpdate: Date;
}
