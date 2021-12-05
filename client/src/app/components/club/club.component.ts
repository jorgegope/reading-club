import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-club',
    templateUrl: './club.component.html',
    styleUrls: ['./club.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubComponent implements OnInit {
    @Input() name: string;
    @Input() image: string;
    @Input() created: Date;

    constructor() {}

    ngOnInit(): void {
    }
}
