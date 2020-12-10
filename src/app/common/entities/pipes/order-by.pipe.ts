import { Pipe, PipeTransform } from '@angular/core';
import {Task} from '../services/http.service';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(tasks: Task[], asc: boolean): Task[]  {
    return tasks.sort((a, b) => {
      if (asc){
        return (new Date(b.creationDate) as any) - (new Date(a.creationDate) as any);
      }else{
        return (new Date(a.creationDate) as any) - (new Date(b.creationDate) as any);
      }
    });
  }

}
