import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let events = [
      {id: 11, name: 'Concert at Park'},
      {id: 12, name: 'Trivia at Narcos'},
      {id: 13, name: 'Pickup Soccer at Rose Bowl'},
      {id: 14, name: 'Dodger Game at Dodger Stadium'},
    ];
    return {events};
  }
}
