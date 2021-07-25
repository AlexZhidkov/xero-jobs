import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  contacts: any[] = [];
  customerControl = new FormControl();
  filteredContacts: Observable<any[]>;

  constructor(
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.filteredContacts = this.customerControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.contacts.slice())
    );

    this.afs.collection(`tenants`).doc('test').get().subscribe(r => {
      const doc = <any>r.data()
      this.contacts = doc.contacts;
    });
  }

  displayFn(contact: any): string {
    return contact && contact.name ? contact.name : '';
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.contacts.filter(contact => contact.name.toLowerCase().includes(filterValue));
  }

}
