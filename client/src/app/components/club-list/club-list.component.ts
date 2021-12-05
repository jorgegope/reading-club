import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Club } from '@app/models/club';
import { ClubService } from '@app/services/club.service';

@Component({
    selector: 'app-club-list',
    templateUrl: './club-list.component.html',
    styleUrls: ['./club-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubListComponent implements OnInit {
    clubList: Club[];

    constructor(
        private clubService: ClubService,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.clubService.getClubs().subscribe((clubs: Club[]) => {
            this.clubList = clubs.slice(0, 8);
            console.log(this.clubList);
            this.changeDetector.detectChanges();
        });
    }
}
