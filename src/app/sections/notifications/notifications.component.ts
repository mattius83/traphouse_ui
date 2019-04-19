import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as _ from 'lodash';
import { ContactDialogComponent } from './contact-dialog.component';
import { NetworkInfoService } from '../../services/network-info.service';
import { Node } from '../network/node';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  columnDefs:any;
  rowData:any;

  constructor(private netInfoService: NetworkInfoService,
              public dialog: MatDialog) {
    this.rowData = [];
  }

  ngOnInit() {

    this.columnDefs = [
      {headerName: 'SN_ID', field: 'subnetId', width: 150 },
      {headerName: 'Device Name', field: 'deviceName', maxWidth: 200 },
      {headerName: 'IP Addr', field: 'ipAddress', width: 150 },
      {headerName: 'OS', field: 'osType', width: 200 },
      {headerName: 'Mac Addr', field: 'macAddress', width: 150 }
    ];
    this.load();
  }

  load() {
    this.netInfoService.getNodes().subscribe( nodesData => {
        let decoyNodes = _.filter(nodesData, (entry:Node) => {
            return (entry.networkType == 'DECOY');
        });
        this.rowData = decoyNodes;
    });
  }

  onEdit() {
      const dialogRef = this.dialog.open(ContactDialogComponent, { width: '400px', height: '400px'});
  }

}
