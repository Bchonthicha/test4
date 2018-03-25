import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'navRouteTopic'
})
export class NavRouteTopicPipe implements PipeTransform {

  transform(url: string): string {
    if(url){
      let currentTopic = _.split(url,'/').pop();      
      return _.startCase(currentTopic);
    }
    return '';
  }

}
