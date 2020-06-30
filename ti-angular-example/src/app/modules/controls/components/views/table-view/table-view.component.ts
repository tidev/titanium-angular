import { Component, OnInit } from '@angular/core';
import { WithTiGlobal } from 'titanium-angular';

interface Transaction {
  id: number,
  type: string,
  date: string,
  name: string,
  amount: string,
  status: string
}

@Component({
  templateUrl: './table-view.component.html',
})
export class TableViewComponent extends WithTiGlobal() implements OnInit {
  items: Transaction[];

  ngOnInit() {
    this.items = [
      {
        id: 1,
        type: 'deposit',
        date: '13/09/2018 16:23',
        name: 'Ann Gray',
        amount: '$290.00',
        status: 'Complete'
      }, {
        id: 2,
        type: 'withdrawl',
        date: '13/09/2018 12:53',
        name: 'Margo Healts',
        amount: '$135.50',
        status: 'Complete'
      }
    ]
  }

  iconForType(transactionType: string) {
    return transactionType === 'deposit' ? 'long-arrow-alt-down' : 'long-arrow-alt-up';
  }
  colorForType(transactionType: string) {
    return transactionType === 'deposit' ? '#4fc08d' : '#f66';
  }
}
