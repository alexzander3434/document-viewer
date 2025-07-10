import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BehaviorSubject, startWith } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ZoomControlService {
  private readonly defaultZoomAmount = 100;

  readonly maximumZoomValue$ = new BehaviorSubject(300);

  readonly minimumZoomValue$ = new BehaviorSubject(10);

  readonly zoomStep$ = new BehaviorSubject<number>(15);

  readonly zoomControl = new FormControl(this.defaultZoomAmount);

  readonly zoomAmount$ = this.zoomControl.valueChanges.pipe(
    startWith(this.defaultZoomAmount)
  );

  setDefaultMaximum(maximum: number): void {
    this.minimumZoomValue$.next(maximum);
  }

  setDefaultMinimum(minimum: number): void {
    this.minimumZoomValue$.next(minimum < 0 ? 0 : minimum);
  }

  setDefaultStep(step: number): void {
    this.zoomStep$.next(step);
  }

  zoom(operator: string): void {
    const currentAmount = this.zoomControl.value;
    const zoomStep = this.zoomStep$.value;

    const currentMaximumValue = this.maximumZoomValue$.value;
    const currentMinimumValue = this.minimumZoomValue$.value;

    switch (operator) {
      case "+":
        {
          const newVal = (currentAmount || 0) + zoomStep;

          this.zoomControl.setValue(
            newVal > currentMaximumValue ? currentMaximumValue : newVal
          );
        }
        break;
      case "-":
        {
          const newVal = (currentAmount || 0) - zoomStep;

          this.zoomControl.setValue(
            newVal < currentMinimumValue || newVal <= 0
              ? currentMinimumValue
              : newVal
          );
        }
        break;
    }
  }
}
