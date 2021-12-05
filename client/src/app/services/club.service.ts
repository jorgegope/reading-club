import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Club } from '@app/models/club';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClubService {
    constructor(private http: HttpClient) {}

    getClubs(): Observable<Club[]> {
        return this.http.get<Club[]>(`${environment.apiUrl}/clubs`);
    }

    getById(id: string): Observable<Club> {
        return this.http.get<Club>(`${environment.apiUrl}/clubs/${id}`);
    }
}
