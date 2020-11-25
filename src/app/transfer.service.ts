import { Injectable } from '@angular/core';
import {Task} from './to-do-list/to-do-list.component';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private task: Task;

  public isNew$ = new BehaviorSubject(false);

  constructor(
    private router: Router
  ) { }

  setTask(task): void{
    this.task = task;
    this.isNew$.next(true);
  }

  getTask(): Task{
    const buf: Task = this.task;
    this.clearTask();
    this.isNew$.next(false);
    return buf;
  }

  clearTask(): void{
    this.task = undefined;
  }
}
