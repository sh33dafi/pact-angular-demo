import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo.service';
import { PactWeb } from '@pact-foundation/pact-web';
import { Todo } from '../model/todo';

describe('TodoService', () => {

  let provider;

  beforeAll(function(done) {
    provider = new PactWeb({
      consumer: 'TodoAngularApp',
      provider: 'TodoService',
      port: 1234,
      host: '127.0.0.1'
    });

    // required for slower CI environments
    setTimeout(done, 2000);

    // Required if run with `singleRun: false`
    provider.removeInteractions();
  });

  afterAll(function(done) {
    provider.finalize()
      .then(function() {
        done();
      }, function(err) {
        done.fail(err);
      });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        TodoService
      ]
    });
  });

  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('create()', () => {

    const expectedRequestBody: Todo = {
      title: 'Test',
      description: 'Do the test'
    };

    const expectedResponseBody: Todo =
      {
        id: 1,
        ...expectedRequestBody
      };

    const createdUserId = 42;

    beforeAll((done) => {
      provider.addInteraction({
        state: `provider accepts a new Todo item`,
        uponReceiving: 'a POST to create a Todo item',
        withRequest: {
          method: 'POST',
          path: '/api/todo',
          body: expectedRequestBody,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        willRespondWith: {
          status: 201,
          body: expectedResponseBody,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
      }).then(done, error => done.fail(error));
    });

    it('should create a Person', (done) => {
      const todoService: TodoService = TestBed.get(TodoService);
      todoService.create(expectedRequestBody).subscribe(response => {
        expect(response).toEqual(expectedResponseBody);
        done();
      }, error => {
        done.fail(error);
      });
    });

  });

});
