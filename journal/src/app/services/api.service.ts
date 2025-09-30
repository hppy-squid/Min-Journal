import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

export interface PostDto {
  id?: number;
  content: string;
  status: string;
  date?: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/posts';

    constructor(private http: HttpClient) {}

  newPost(content: string, status: string): Observable<PostDto> {
      const token = localStorage.getItem('token');
  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<PostDto>(`${this.baseUrl}/newPost`, { content, status }, { headers })
          .pipe(
            tap(response => {
              console.log("✅ API response:", response);
            })
          );
  }

  getPosts(): Observable<PostDto[]> {

    const token = localStorage.getItem('token'); // hämta token från localStorage

    if (!token) {
    console.error('No authentication token found');
    // Handle this error appropriately
    return new Observable(); // Or throw an error
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
    return this.http.get<PostDto[]>(`${this.baseUrl}/all` , { headers })
          .pipe(
            tap(response => {
              console.log("✅ API response:", response);
            })
          );
  }
}
