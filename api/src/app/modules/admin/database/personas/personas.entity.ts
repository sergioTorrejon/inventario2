import { Paises } from 'src/app/data/paises/paises.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name:'persona_natural'})
export class Personas{
  //PRIMARY INT
  @PrimaryGeneratedColumn()
  id: number;

  // COLUMNS TABLE 
  @Column({ type: 'varchar', name:'tipo_identificacion' ,length: 50 , nullable: true })
  tipoIdentificacion: string;

  @Column({ type: 'varchar', name:'nro_identificacion' ,length: 50 , nullable: true })
  nroIdentificacion: string;

  @ManyToOne(() => Paises)
  @JoinColumn({name:'id_pais'})
  pais: Paises | number = 30

  @Column({ type: 'varchar', name:'nombres' ,length: 50 , nullable: true })
  nombres: string;

  @Column({ type: 'varchar', name:'primer_apellido' ,length: 50 , nullable: true })
  primerApellido: string;

  @Column({ type: 'varchar', name:'segundo_apellido' ,length: 50 , nullable: true })
  segundoApellido: string;

  @Column({ type: 'varchar', name:'apellido_casada' ,length: 50 , nullable: true })
  apellidoCasada: string;

  @Column({name:'fecha_nacimiento', nullable:true})
  fechaNacimiento: Date;

  @Column({ type: 'varchar', name:'email' ,length: 100 , nullable: true })
  email: string;

  @Column({ type: 'varchar', name:'telefono' ,length: 10 , nullable: true })
  telefono: string;

  @Column({ type: 'varchar', name:'direccion' ,length: 250 , nullable: true })
  direccion: string;


  /******************************AUDIT************************************** */
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
