import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  title = 'budget-app';
  username: string = '';
  addModalOpen = false;
  dataLoaded = false;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchData();
    this.username = this.dataService.getUsername();
    this.dataService.loadedData.subscribe((state) => {
      this.dataLoaded = state;
      this.username = this.dataService.getUsername();
    });
  }

  onAdd() {
    this.addModalOpen = true;
  }

  onClose() {
    this.addModalOpen = false;
  }
}
