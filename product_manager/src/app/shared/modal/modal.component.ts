import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.98)' }),
        animate('300ms ease-in-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ opacity: 0, transform: 'scale(0.95)' }))
      ]),
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({ opacity: 0 }))
      ]),
    ]),
  ],
})

export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Novo produto';
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  formData = {
    name: '',
    price: '',
    category: '',
    description: '',
  };

  onClose() {
    this.isOpen = false;
    this.close.emit();
  }

  onSubmit() {
    this.submit.emit(this.formData);
    this.onClose();
  }

}
