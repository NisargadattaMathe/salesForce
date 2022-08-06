import { LightningElement } from 'lwc';
import employeeData from './data'

const columns = [
    { label: 'First Name', fieldName: 'first_name',sortable: true},
    { label: 'Last Name',fieldName: 'last_name', sortable: true},
    { label: 'Email', fieldName: 'email', type: 'email', sortable: true },
    { label: 'Gender', fieldName: 'gender' },
    { label: 'Birth Date', fieldName: 'dob', sortable: true },
    { label: 'Joining Date', fieldName: 'joining', sortable: true }

];

export default class DemoApp extends LightningElement {
    data = employeeData;
    columns = columns;
    defaultSortDirection = 'asc';
    sortDirection = 'asc';
    sortedBy;

    // Used to sort the column
    sortBy(field, reverse, primer) {
        const key = primer? function (x) {
                  return primer(x[field]);
              }
            : function (x) {
                  return x[field];
              };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }

    onHandleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        const cloneData = [...this.data];

        cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
        this.data = cloneData;
        this.sortDirection = sortDirection;
        this.sortedBy = sortedBy;
    }
}
