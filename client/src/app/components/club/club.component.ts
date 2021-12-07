import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { User } from '@app/models';
import { Club } from '@app/models/club';
import { AccountService, AlertService } from '@app/services';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-club',
    templateUrl: './club.component.html',
    styleUrls: ['./club.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubComponent implements OnInit {
    @Input() club: Club;

    followed: boolean;

    constructor(
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    ngOnInit(): void {
        this.followed = this.accountService.userValue.clubs.some(
            (clubId) => clubId === this.club.id
        );
    }

    follow(): void {
        this.followed = !this.followed;

        this.accountService
            .followClub(this.club)
            .pipe(first())
            .subscribe({
                next: (user: User) => {
                    localStorage.setItem('user', JSON.stringify(user));
                },
                error: (error) => {
                    this.alertService.error(error);
                },
            });
    }
}
