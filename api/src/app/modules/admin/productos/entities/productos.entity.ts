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
  @Column({ type: 'varchar', name:'codigo' ,length: 50 , nullable: true })
  codigo: string;

  @Column({ type: 'varchar', name:'nombre' ,length: 250 , nullable: false })
  nombre: string;

  @Column({ type: 'varchar', name:'tipo_producto', length: 250 , nullable: true })
  tipoProducto: string;

  @Column({ type: 'varchar', name:'medida', length: 250 , nullable: true })
  medida: string;

  @Column({ type: 'varchar', name:'modelo', length: 250 , nullable: true })
  modelo: string;




  /******************************ACTIVO************************************** */
  @Column({ type: 'boolean', default: true })
  active: boolean;


  /******************************AUDITABLE************************************** */
  @Column({ type: 'varchar', name: 'usuario_creacion',length: 50, default: 'default', select: false })
  userCreate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', nullable: false, select: false })
  dateCreate: Date;

}
