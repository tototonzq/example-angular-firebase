import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    // console.log(items, searchText);
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((item) => {
      return (
        item.username.toLowerCase().includes(searchText) ||
        item.code.toLowerCase().includes(searchText) ||
        item.role.toLowerCase().includes(searchText)
      );
    });
  }
}
