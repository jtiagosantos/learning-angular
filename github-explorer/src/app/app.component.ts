import { Component } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GithubUser } from './interfaces/github-user';
import { GithubService } from './services/github.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  username = '';
  user: GithubUser | null = null;
  isLoading = false;
  userNotFound = false;
  private readonly usernameChangeSubject = new Subject<string>();
  private readonly debounceTimeMs = 750;

  constructor(private githubService: GithubService) {
    this.usernameChangeSubject.pipe(
      debounceTime(this.debounceTimeMs)
    ).subscribe(() => {
      this.getGithubUser();
    });
  }

  onInputChange() {
    this.usernameChangeSubject.next(this.username);
  }

  getGithubUser() {
    if (!!this.username) {
      this.isLoading = true;
      this.githubService.getUserByUsername(this.username).subscribe({
        next: (data) => {
          this.user = data;
          this.userNotFound = false;
          this.isLoading = false;
        },
        error: () => {
          this.user = null;
          this.userNotFound = true;
          this.isLoading = false;
        }
      })
    } else {
      this.user = null;
      this.userNotFound = false;
      this.isLoading = false;
    }
  }
}
