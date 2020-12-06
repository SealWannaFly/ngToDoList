import {Pipe, PipeTransform} from '@angular/core';
import {Task} from '../http.service';

export interface FilterParams{
  priority: string[];
  result: string;
}

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform{
  transform(tasks: Task[], params: FilterParams): Task[] {
    return tasks.filter(task => ((task.result === params.result || params.result === 'all')
                                          && (params.priority.includes(task.priority.toLowerCase()) || params.priority.length === 0)));
  }
}
