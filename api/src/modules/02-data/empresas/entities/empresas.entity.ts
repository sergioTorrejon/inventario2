import { Catalogos } from 'src/modules/01-admin/03-catalogos/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name:'empresas'})
export class Empresas{

  /******************************IDENTIFICADOR************************************** */
  @PrimaryGeneratedColumn()
  id: number;

  /******************************CLAVES FORANEAS************************************** */
  @ManyToOne((type) => Catalogos)
  @JoinColumn({name:'id_catalogo'})
  tipoEmpresa: Catalogos

  /******************************COLUMNAS************************************** */
  @Column({ type: 'varchar', length: 50 , nullable: true })
  codigo: string;

  @Column({ type: 'varchar', length: 250 , nullable: true })
  categoria: string;

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
