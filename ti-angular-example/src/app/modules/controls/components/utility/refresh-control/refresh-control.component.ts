import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'refresh-control.component.html'
})
export class RefreshControlComponent {
  dataSource = [
    { name: 'JJ', surname: 'Peters' },
    { name: 'Nikita', surname: 'Kamprad' },
    { name: 'Colin', surname: 'Jeffs' },
    { name: 'Einar', surname: 'Selvik' }
  ]

  get items() {
    return this.dataSource.map(sourceItem => {
      return {
        name: {
          text: sourceItem.name
        },
        surname: {
          text: sourceItem.surname
        }
      }
    });
  }

  loadMore(e) {
    setTimeout(() => {
      // You can push new data ...
      this.dataSource.push({ name: 'Michael', surname: 'Roth' });
      // ... or replace the whole data source
      // self.dataSource = [{ name: 'Jordan', surname: 'Dryer' }, { Name: 'Derek', surname: 'Archambault' }]
      e.source.endRefreshing();
    }, 1000);
  }
}