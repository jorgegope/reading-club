import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { AppSettings } from '@app/app-settings';
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

    clubsOnThePage: Club[];

    currentPage = 0;
    numberOfPages = 0;

    constructor(
        private clubService: ClubService,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.clubService.getClubs().subscribe((clubs: Club[]) => {
            this.clubList = clubs;
            this.updateClubsOnTheCurrentPage();
            this.numberOfPages = clubs.length / AppSettings.CLUBS_PER_PAGE;
            this.changeDetector.markForCheck();
        });
    }

    isFirstPage(): boolean {
        return this.currentPage === 0;
    }

    isLastPage(): boolean {
        return this.currentPage >= this.numberOfPages - 1;
    }

    previousPage(): void {
        if (!this.isFirstPage()) {
            this.currentPage--;
            this.updateClubsOnTheCurrentPage();
            this.changeDetector.markForCheck();
        }
    }

    nextPage(): void {
        if (!this.isLastPage()) {
            this.currentPage++;
            this.updateClubsOnTheCurrentPage();
            this.changeDetector.markForCheck();
        }
    }

    private updateClubsOnTheCurrentPage(): void {
        this.clubsOnThePage = this.clubList.slice(
            0 + this.currentPage * AppSettings.CLUBS_PER_PAGE,
            this.currentPage * AppSettings.CLUBS_PER_PAGE +
                AppSettings.CLUBS_PER_PAGE
        );
    }
}
