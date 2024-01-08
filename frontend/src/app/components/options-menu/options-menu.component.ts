import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.css'],
})
export class OptionsMenuComponent {
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  displayMenu: boolean = false;
  editText = EditText;
  deleteText = DeleteText;

  onToggleMenu() {
    this.displayMenu = !this.displayMenu;
  }

  onEdit() {
    this.onToggleMenu();
    this.edit.emit();
  }

  onDelete() {
    this.onToggleMenu();
    this.delete.emit();
  }
}

export const DeleteText = 'Eliminar';
export const EditText = 'Editar';
