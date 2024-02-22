/*
 * @copyright Copyright TalenTecHub, Inc. All rights reserved. TalenTecHub Confidential.
 * @license For licensing, see LICENSE.md.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map } from 'rxjs';

export interface People {
    id: string;
    name?: string;
    email?: string;
    gender?: number[];
    address?: Address;
}

export interface Address {
    id: string;
    state?: string;
    city?: string;
    street?: number[];
}

@Injectable({ providedIn: 'root' })
export class DataService {

    constructor(private http: HttpClient) { }

    /**
     * getPeople
     */
    public getPeople(): Observable<People[]> {
        return this.http.get('assets/people.json') as Observable<People[]>;
    }

    /**
     * getAddresses
     */
    public getAddresses(): Observable<Address[]> {
        return this.http.get('assets/addresses.json') as Observable<Address[]>;
    }

    public getCombinedData() {
        let request = [];
        request.push(this.getPeople());
        request.push(this.getAddresses());
        return combineLatest(request).pipe(
            map(([people, address]) => {
                let p: People[] = people;
                let a: Address[] = address;
                let combined = p.map((e, i) => {
                    e.address = a.find(element => element.id === e.id)
                    return e;
                });
                return combined;
            })
        );
    }


}