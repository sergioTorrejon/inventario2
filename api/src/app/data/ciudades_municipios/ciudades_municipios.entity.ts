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
import { EstadosDepartamentos } from '../estados_departamentos/estados_departamentos.entity';

@Entity({name:'data_ciudades_municipios'})
export class CiudadesMunicipios{

  /******************************IDENTIFICADOR************************************** */
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => EstadosDepartamentos)
  @JoinColumn({name:'id_estado_departamento'})
  estadoDepartamento: EstadosDepartamentos

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
