import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name:'usuarios'})
export class Usuarios{

  /******************************IDENTIFICADOR************************************** */
  @PrimaryGeneratedColumn()
  id: number;

  /******************************COLUMNAS************************************** */
  @Column({ type: 'varchar', length: 50 , nullable: true })
  user: string;

  @Column({ type: 'varchar', length: 250 , nullable: true })
  password: string;


  /******************************ACTIVO************************************** */
  @Column({ type: 'boolean', default: true })
  active: boolean;


  /******************************AUDITABLE************************************** */
  @Column({ type: 'varchar', name: 'usuario_creacion',length: 50, default: 'default', select: false })
  userCreate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', nullable: false, select: false })
  dateCreate: Date;

}
