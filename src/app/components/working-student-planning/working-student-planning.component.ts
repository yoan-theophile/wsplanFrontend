import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { WorkingHourRangeService } from 'src/app/services/working-hour-range.service';
import { Subscription } from 'rxjs';

interface WeeklyPlanningNode {
  name: string;
  children?: WeeklyPlanningNode[];
}

/** Flat node with expandable and level information */
interface WeeklyPlanningFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-working-student-planning',
  templateUrl: './working-student-planning.component.html',
  styleUrls: ['./working-student-planning.component.scss'],
})
export class WorkingStudentPlanningComponent implements OnInit, OnDestroy {
  studentPlanning!: Subscription;
  loading: boolean = true;


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
    this.workingHourRangeService.getStudentPlanning();
    this.studentPlanning =
      this.workingHourRangeService.studentPlanning$.subscribe({
        next: (data) => {
          console.log('data', data);
          if (Array.isArray(data)) {
            this.dataSource.data = data.map((element) => ({
              name: `View: ${element.student.firstname} ${element.student.lastname}`,
              children: element.workingHourList.map((workingHour: any) => ({
                name: `${new Date(workingHour.date).toDateString()} from ${
                  workingHour.start_time
                } to ${workingHour.end_time}`,
                children: [],
              })),
            }));
          }
          this.loading = false;
        },
      });
  }
  ngOnDestroy(): void {
    if (this.studentPlanning != null) {
      this.studentPlanning.unsubscribe();
    }
  }
}
