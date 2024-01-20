import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { TodosService } from "../services/todos.service";



@Injectable()
export class TodosResolve implements Resolve<any> {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.todosService.getTodos();
    }

    constructor(private todosService: TodosService) {}
}