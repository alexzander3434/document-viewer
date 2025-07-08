import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BehaviorSubject, startWith } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ZoomControlService {
  private readonly defaultZoomAmount = 100;

  readonly defaultMaximumZoomAmount$ = new BehaviorSubject(200);

  readonly defaulMinimumZoomAmount$ = new BehaviorSubject(10);

  readonly defaulZoomStep$ = new BehaviorSubject<number>(15);

  readonly zoomControl = new FormControl(this.defaultZoomAmount);

  readonly zoomAmount$ = this.zoomControl.valueChanges.pipe(
    startWith(this.defaultZoomAmount)
  );

  setDefaultMaximum(maximum: number): void {
    this.defaulMinimumZoomAmount$.next(maximum);
  }

  setDefaultMinimum(minimum: number): void {
    this.defaulMinimumZoomAmount$.next(minimum < 0 ? 0 : minimum);
  }

  setDefaultStep(step: number): void {
    this.defaulZoomStep$.next(step);
  }
}
