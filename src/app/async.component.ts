import {AfterViewInit, Component} from '@angular/core';
import {fromEvent, Observable} from 'rxjs/index';
import {delay, filter, map} from 'rxjs/internal/operators';

@Component({
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css']
})
export class AsyncComponent implements AfterViewInit {
  source$: Observable<any>;
  left: string;
  top: string;

  fromEventTest(): void {
    this.source$.subscribe(
      value => this.onNext(value),
      err => console.log(`error: ${err}`),
      () => console.log('completed')
    );
  }
  onNext(value: MouseEvent) {
    this.left = value.x.toString();
    this.top = value.y.toString();
    console.log('x ' + this.left, ' y  ' + this.top);
  }

  ngAfterViewInit() {
    this.source$ = fromEvent(document, 'mousemove')
      .pipe(
        map((e: MouseEvent) => {
          return {
            x: e.clientX,
            y: e.clientY
          };
        }),
        filter<MouseEvent>(e => e.x < 910),
        delay(200));
    this.fromEventTest();
  }
}
