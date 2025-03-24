import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Paises } from '../paises/paises.entity';

@Entity({name:'data_estados_departamentos'})
export class EstadosDepartamentos{

  /******************************IDENTIFICADOR************************************** */
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Paises)
  @JoinColumn({name:'id_pais'})
  pais: Paises

  /******************************COLUMNAS************************************** */
  @Column({ type: 'varchar', name:'codigo' ,length: 50 , nullable: true })
  codigo: string;

  @Column({ type: 'varchar', name:'nombre' ,length: 250 , nullable: false })
  nombre: string;

  @Column({ type: 'varchar', name:'descripcion', length: 250 , nullable: true })
  descripcion: string;




  /******************************ACTIVO************************************** */
  @Column({ type: 'boolean', default: true })
  active: boolean;


  /******************************AUDITABLE************************************** */
  @Column({ type: 'varchar', name: 'usuario_creacion',length: 50, default: 'default', select: false })
  userCreate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', nullable: false, select: false })
  dateCreate: Date;

}
