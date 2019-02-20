import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';

@Injectable()
export class TodoService {

  private BASE_URL = '/api/todo';

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Calls the backend to create a new User resource.
   * @param {User} resource the resource to create.
   * @returns {Observable<number>} Observable of the ID the backend assigned to the new User resource.
   */
  create(todo: Todo): Observable<Todo> {
    return this.httpClient
      .post<Todo>(this.BASE_URL, todo)
  }

}
