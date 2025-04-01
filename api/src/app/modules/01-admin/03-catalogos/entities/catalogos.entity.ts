import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categorias } from '../../02-categorias/entities';

@Entity({name:'catalogos'})
export class Catalogos{

  /******************************IDENTIFICADOR************************************** */
  @PrimaryGeneratedColumn()
  id: number;

  
  /******************************CLAVES FORANEAS************************************** */
  @ManyToOne((type) => Categorias)
  @JoinColumn({name:'id_categoria'})
  categoria: Categorias
  
  /******************************COLUMNAS************************************** */
  @Column({ type: 'varchar', name:'codigo', length: 50 , nullable: true })
  codigo: string;

  @Column({ type: 'varchar', name:'descripcion', length: 250 , nullable: true })
  descripcion: string;


  /******************************ACTIVE************************************** */
  @Column({ type: 'boolean', default: true })
  active: boolean;


  /******************************AUDITABLE************************************** */
  @Column({ type: 'varchar', name: 'usuario_creacion',length: 50, default: 'default', select: false })
  userCreate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', nullable: false, select: false })
  dateCreate: Date;

}                                                                                                                                                                                                                                                                                                                