import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name:'data_paises'})
export class Paises{

  /******************************IDENTIFICADOR************************************** */
  @PrimaryGeneratedColumn()
  id: number;

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
