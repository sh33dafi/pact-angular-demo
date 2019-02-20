import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from './service/todo.service';

@NgModule({
  imports: [CommonModule],
  providers: [ TodoService]
})
export class ApiModule {}
