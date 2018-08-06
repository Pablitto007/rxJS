import { Component, OnInit } from '@angular/core';
import {filter, map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';

@Component({
  templateUrl: './observ.component.html'
})
export class ObservComponent implements OnInit {
  private static numbers: number [] = [1, 2, 4];
  private currValue: number;
  private status: string = '';
  private title = 'rxJs';

  observableTest(): void {

    const source$: Observable<number> = Observable.create(observer => {
      for (const i of ObservComponent.numbers) {
        if (i === 2) {
          observer.error('err i ===2');
        }
        observer.next(i);
      }
      observer.complete();
    });

    /*const obs = new DummyObserver();*/
    source$.subscribe(
      value => console.log(`value: ${value}`),
      err => console.log(`error: ${err}`),
      () => console.log('complete')
    );
  }

  observableTimeoutTest(): void {
    console.log(typeof this.currValue);
    this.status = 'in progress';

    const source$ = Observable.create(obs => {

      let index = 0;
      const produceValue = () => {
        obs.next(ObservComponent.numbers[index++]);

        if (index < ObservComponent.numbers.length) {
          setTimeout(produceValue, 2000);
        } else {
          obs.complete();
        }
      };
      produceValue();
    })
      .pipe(
        map<number, number>(r => r * 2),
        filter<number>(e => e < 6)
      );

    source$.subscribe(
      /*value => console.log(`value: ${value}`),*/
      value => this.currValue = value,
      err => console.log(`error: ${err}`),
      () => this.status = 'completed'
    );
  }

  ngOnInit() {
  }

}
