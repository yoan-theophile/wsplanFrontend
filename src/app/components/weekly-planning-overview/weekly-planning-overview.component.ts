import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { WorkingHourRangeService } from 'src/app/services/working-hour-range.service';
import { Observable, Subscription } from 'rxjs';

interface WeeklyPlanningNode {
  name: string;
  children?: WeeklyPlanningNode[];
}

const TREE_DATA: WeeklyPlanningNode[] = [
  {
    name: 'Thursday 14th, July',
    children: [{ name: 'Pierre Tagne from 04:00 to 06:00' }],
  },
  {
    name: 'Thursday 15th, July',
    children: [
      { name: 'Pierre Tagne from 04:00 to 06:00' },
      { name: 'Marie De la belle from 04:00 to 06:00' },
    ],
  },
];

/** Flat node with expandable and level information */
interface WeeklyPlanningFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-weekly-planning-overview',
  templateUrl: './weekly-planning-overview.component.html',
  styleUrls: ['./weekly-planning-overview.component.scss'],
})
export class WeeklyPlanningOverviewComponent implements OnInit, OnDestroy {
  weeklyPlanning!: Subscription;
  private _transformer = (node: WeeklyPlanningNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<WeeklyPlanningFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private workingHourRangeService: WorkingHourRangeService) {
    this.dataSource.data = [];
  }

  hasChild = (_: number, node: WeeklyPlanningFlatNode) => node.expandable;

  ngOnInit(): void {
    this.workingHourRangeService.getWeeklyPlanning();
    this.weeklyPlanning =
      this.workingHourRangeService.weeklyPlanning$.subscribe({
        next: (data) => {
          if (Array.isArray(data)) {
            this.dataSource.data = data.map((element) => ({
              name: `${new Date(element.date).toDateString()} (${
                element.studentNumber
              } students)`,
              children: element.workingHourList.map((workingHour: any) => ({
                name: `${workingHour.firstname} ${workingHour.lastname} from ${workingHour.start_time} to ${workingHour.end_time}`,
                children: [],
              })),
            }));
          }
        },
      });
  }
  ngOnDestroy(): void {
    if (this.weeklyPlanning != null) {
      this.weeklyPlanning.unsubscribe();
    }
  }
}
