import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    post(type: string, data: any) {

        var dataLogin = {
            type: type,
            data: data
        }

        // console.log(dataLogin);

        return this.http.post<any>(environment.apiUrl, dataLogin).pipe(map(response => {
            return response;
        }));
    }

    get(type: string) {
        return this.http.get<any>(environment.apiUrl).pipe(map(response => {
            return response;
        }));
    }
}