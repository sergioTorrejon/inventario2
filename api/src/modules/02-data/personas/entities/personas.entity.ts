import { Catalogos } from 'src/modules/01-admin/03-catalogos/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name:'personas'})
export class Personas{

  /******************************IDENTIFICADOR************************************** */
  @PrimaryGeneratedColumn()
  id: number;

  /******************************CLAVES FORANEAS************************************** */
  @ManyToOne((type) => Catalogos)
  @JoinColumn({name:'id_tipo_documento'})
  tipoDocumento: Catalogos

  /******************************COLUMNAS************************************** */
  @Column({ type: 'varchar', name:'numero_identificacion',length: 50 , nullable: true })
  numeroIdentificacion: string;

  @Column({ type: 'varchar', length: 250 , nullable: true })
  nombres: string;

  @Column({ type: 'varchar', name:'apellido_paterno',length: 250 , nullable: true })  
  apellidoPaterno: string;
  
  @Column({ type: 'varchar', name:'apellido_materno',length: 250 , nullable: true })
  apellidoMaterno: string;

  @Column({ type: 'varchar', name:'fecha_nacimiento', length: 250 , nullable: true })
  fechaNacimiento: string;


  /******************************ACTIVO************************************** */
  @Column({ type: 'boolean', default: true })
  active: boolean;


  /******************************AUDITABLE************************************** */
  @Column({ type: 'varchar', name: 'usuario_creacion',length: 50, default: 'default', select: false })
  userCreate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', nullable: false, select: false })
  dateCreate: Date;

}
