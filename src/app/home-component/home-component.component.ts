import { Component, OnDestroy, OnInit } from '@angular/core';
import { TwoWayComponentComponent } from '../two-way-component/two-way-component.component';
import { DataService, People } from '../Services/data-service';
import { CardComponentComponent } from '../card-component/card-component.component';
import { CommonModule } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [TwoWayComponentComponent, CardComponentComponent, CommonModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.scss'
})
export class HomeComponentComponent implements OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject();

  public defaultContent: string = 'this is test content';
  public content: string = this.defaultContent;
  public isVisible: boolean = true;

  public buttonOneName: string = 'Add Text';
  public buttonTwoName: string = 'Show/Hide';
  public buttonThreeName: string = 'Defailt Text';
  public buttonFourName: string = '';
  public buttonFiveName: string = '';
  public people: People[] = [];
  public today = new Date();

  constructor(private dataService: DataService) {
    this.dataService.getCombinedData().pipe(
      takeUntil(this.ngUnsubscribe)).subscribe(users => {
        this.people = users;
      })
  }

  /**
   * addContent
   */
  public addContent(event: Event) {
    this.content = this.content + " " + this.content;
  }

  /**
  * defaultContent
  */
  public toDefaultContent(event: Event) {
    this.content = this.defaultContent;
  }

  /**
   * toggleContentVisibility
   */
  public toggleContentVisibility(event: Event) {
    this.isVisible = !this.isVisible;
  }

  /**
   * OnDestroy
   */
  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
