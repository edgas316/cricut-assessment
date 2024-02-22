import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-two-way-component',
  standalone: true,
  imports: [NgIf],
  templateUrl: './two-way-component.component.html',
  styleUrl: './two-way-component.component.scss'
})
export class TwoWayComponentComponent {
  @Input() public content: string = '';
  @Input() public isVisible: boolean = false;
  @Output() public addContent = new EventEmitter();
  @Output() public defaultContent = new EventEmitter();
  @Output() public toggleContentVisibility = new EventEmitter();

  @Input() public buttonOneName: string = 'Defailt Button 1';
  @Input() public buttonTwoName: string = 'Defailt Button 2';
  @Input() public buttonThreeName: string = 'Defailt Button 3';
  @Input() public buttonFourName: string = 'Defailt Button 4';
  @Input() public buttonFiveName: string = 'Defailt Button 5';

  public emitChangeContent(event: Event) {
    this.addContent.emit(event);
  }

  public emitDefaultContent(event: Event) {
    this.defaultContent.emit(event);
  }

  public emitToggleContentVisibility(event: Event) {
    this.toggleContentVisibility.emit(event);
  }




}
