import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Provedores } from '../../provedores/entities/provedores.entity';

@Entity({name:'productos'})
export class Productos{

  /******************************IDENTIFICADOR************************************** */
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Provedores)
  @JoinColumn({name:'id_provedor'})
  provedor: Provedores

  /******************************COLUMNAS************************************** */
  @Column({ type: 'varchar', length: 50 , nullable: true })
  codigo: string;

  @Column({ type: 'varchar', length: 250 , nullable: false })
  categoria: string;

  @Column({ type: 'varchar', length: 250 , nullable: true })
  marca: string;

  @Column({ type: 'varchar', length: 250 , nullable: true })
  modelo: string;

  @Column({ type: 'varchar', length: 250 , nullable: true })
  medida: string;

  @Column({ type: 'varchar', length: 250 , nullable: true })
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
