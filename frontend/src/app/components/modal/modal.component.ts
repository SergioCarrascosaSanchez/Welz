import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() open: boolean;
  @Output() closeEmmitter = new EventEmitter<boolean>();
  private element: any;

  constructor(private ref: ElementRef) {
    this.element = ref.nativeElement;
  }

  ngOnInit() {
    this.element.addEventListener('click', (el) => {
      if (el.target.className === 'modal-container') {
        this.closeEmmitter.emit(false);
      }
    });
  }

  onClose() {
    this.closeEmmitter.emit(false);
  }
}
