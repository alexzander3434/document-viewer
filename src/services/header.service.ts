import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  readonly saveTrigger$ = new Subject<void>();
}
