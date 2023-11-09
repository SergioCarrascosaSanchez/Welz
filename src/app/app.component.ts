import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'budget-app';
  username: string;
  addModalOpen = false;
  dataLoaded = false;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchData();
    this.username = this.dataService.getUsername();
    this.dataService.loadedData.subscribe((state) => (this.dataLoaded = state));
  }

  onAdd() {
    this.addModalOpen = true;
  }

  onClose() {
    this.addModalOpen = false;
  }
}
