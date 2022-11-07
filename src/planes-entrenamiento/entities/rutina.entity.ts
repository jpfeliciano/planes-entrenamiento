import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IRutina } from './irutina.interface';
import { PlanEntrenamientoEntity } from './plan-entrenamiento.entity';

@Entity()
export class RutinaEntity implements IRutina {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dia: number;

  @Column()
  ejercicio: string;

  @ManyToOne(
    () => PlanEntrenamientoEntity,
    (planEntrenamiento) => planEntrenamiento.rutinas,
    {
      onDelete: 'CASCADE',
    },
  )
  planEntrenamiento?: PlanEntrenamientoEntity;
}
