import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({name:'settings'})
export class Settings{

  /******************************IDENTIFICADOR************************************** */
  @PrimaryGeneratedColumn()
  id: number;


  /******************************COLUMNAS************************************** */
  @Column({ type: 'varchar', length: 50 , nullable: false })
  codigo: string;
  
  @Column({ type: 'varchar', length: 250 , nullable: false })
  descripcion: string;

  @Column({ type: 'varchar', length: 250 , nullable: true })
  valor: string;


  /******************************ACTIVE************************************** */
  @Column({ type: 'boolean', default: true })
  active: boolean;

  /******************************AUDITABLE************************************** */
  @Column({ type: 'varchar', name: 'usuario_creacion',length: 50, default: 'default', select: false })
  userCreate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', nullable: false, select: false })
  dateCreate: Date;

}                                                                                                                                                                                                                                                                                                                