import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-image-popup',
  templateUrl: './show-image-popup.component.html',
  styleUrls: ['./show-image-popup.component.css']
})
export class ShowImagePopupComponent implements OnInit {

  @Input() imgSource!: string;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  closeIcon = faWindowClose;

  constructor() { }

  ngOnInit(): void {
  }

  close(){
    this.closeModal.emit(true);
  }
}
