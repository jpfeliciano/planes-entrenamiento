import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { PlanEntrenamientoEntity } from './entities/plan-entrenamiento.entity';
import { RutinaEntity } from './entities/rutina.entity';
import { PlanesEntrenamientoController } from './planes-entrenamiento.controller';
import { PlanesEntrenamientoService } from './planes-entrenamiento.service';

describe('PlanesEntrenamientoController', () => {
  let planesEntrenamientoController: PlanesEntrenamientoController;
  let planesEntrenamientoSpyService: PlanesEntrenamientoService;
  let planesEntrenamientoList: PlanEntrenamientoEntity[];

  beforeEach(async () => {
    planesEntrenamientoSpyService = new PlanesEntrenamientoService(
      null,
      null,
      null,
    );
    planesEntrenamientoController = new PlanesEntrenamientoController(
      null,
      null,
      planesEntrenamientoSpyService,
      null,
      null,
    );
    seedDatabase();
  });

  const seedDatabase = async () => {
    planesEntrenamientoList = [];
    for (let i = 0; i < 5; i++) {
      const rutinasList: RutinaEntity[] = [];
      for (let i = 0; i < 5; i++) {
        const rutina: RutinaEntity = {
          id: faker.datatype.uuid(),
          dia: faker.datatype.number(30),
          ejercicio: faker.lorem.sentence(5),
        };
        rutinasList.push(rutina);
      }
      const planEntrenamiento: PlanEntrenamientoEntity = {
        id: faker.datatype.uuid(),
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        duracion: faker.commerce.productAdjective(),
        imagen: faker.image.imageUrl(),
        suscripcion: faker.datatype.number(10),
        nivelPlan: faker.datatype.number(3),
        rutinas: rutinasList,
      };
      planesEntrenamientoList.push(planEntrenamiento);
    }
  };

  describe('obtenerTodos', () => {
    it('Debe retornar un arreglo de planes de entrenamiento', async () => {
      const obtenerTodosMock = async () => planesEntrenamientoList;
      jest
        .spyOn(planesEntrenamientoSpyService, 'obtenerTodos')
        .mockImplementation(obtenerTodosMock);

      const actualResult = await planesEntrenamientoController.obtenerTodos();

      expect(actualResult).toBe(planesEntrenamientoList);
    });
  });
});
