import { literal, QueryInterface } from 'sequelize';
import {
  addYears,
  format,
  subYears,
  setMonth,
  setDate,
  setHours,
} from 'date-fns'
import { ModelAttributes } from 'sequelize/types/model';

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('User', {
      uId: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      userName : {type:'varchar'},
      mobNo: { type: 'varchar' },
      emailId: { type: 'varchar' },
      sex: { type: 'enum' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes)

    await queryInterface.createTable('Movie', {
      movieId: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      theaterId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'Theater',
          },
          key: 'theaterId',
        },
        onDelete: 'cascade',
      },
      movieName : {type:'varchar'},
      movieType: { type: 'varchar' },
      movieStatus: { type: 'varchar' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes)

    await queryInterface.createTable('Theater', {
      theaterId: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      theaterName : {type:'varchar'},
      address: { type: 'varchar' },
      rating: { type: 'float' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes)

    await queryInterface.createTable('Booking', {
      bookingId: {
        type: 'integer',
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'User',
          },
          key: 'uId',
        },
        onDelete: 'cascade',
      },
      movieId: {
        type: 'integer',
        allowNull: true,
        references: {
          model: {
            tableName: 'Movie',
          },
          key: 'movieId',
        },
        onDelete: 'cascade',
      },
      amount : {type:'integer'},
      status_of_payment: { type: 'enum' },
      booked_date: { type: 'date' },
      movie_timing: { type: 'date' },
      createdAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: 'timestamp',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    } as ModelAttributes)

    // throw new Error('TODO: implement migration in task 4');
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
