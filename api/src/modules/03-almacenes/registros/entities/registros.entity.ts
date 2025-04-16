import { Catalogos } from 'src/modules/01-admin/03-catalogos/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name:'registros'})
export class Registros{

  /******************************IDENTIFICADOR************************************** */
  @PrimaryGeneratedColumn()
  id: number;

  /******************************CLAVES FORANEAS************************************** */
  @ManyToOne((type) => Catalogos)
  @JoinColumn({name:'tipo_registro'})
  tipoRegistro: Catalogos

  /******************************COLUMNAS************************************** */
  @Column({ type: 'varchar', length: 50 , nullable: true })
  codigo: string;

  @Column({ type: 'varchar', name:'fecha_registro', length: 250 , nullable: true })
  fechaRegistro: string;

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
