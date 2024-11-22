import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('articulos')
export class Articulo{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column('text')
    descripcion: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    costo: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_minimo: number;

    @Column({ type: 'int' })
    cantidad_disponible: number;
    
     @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column('text')
    image: String;


}