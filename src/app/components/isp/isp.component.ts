import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { ISPService } from 'src/app/services/isp.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-isp',
  templateUrl: './isp.component.html',
  styleUrls: ['./isp.component.css'],
})
export class ISPComponent implements OnInit {
  projetId: number | undefined;
  ispNames: any[] = [];
  projetName: string = '';
  modalVisible = false;
  public validateForm!: FormGroup;
  constructor(
    private ispService: ISPService,
    private sharedSsservice: SharedService,
    private FB: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validateForm = this.FB.group({
      ispName: [null],
      ispId: [null],
      projetId: [this.projetId],
      ispFile: [null],
    });
    this.projetId = this.sharedSsservice.projetId;
    this.getispNamesByProject(this.projetId);
  }
  openModal(isp: any) {
    this.modalVisible = true;
    this.validateForm = this.FB.group({
      ispName: [isp?.name],
      ispId: [isp?.id],
      projetId: [this.projetId],
      ispFile: [null],
    });
  }
  handleOk() {}
  handleChange(info: NzUploadChangeParam): void {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // this.fileList = fileList;
  }
  handleCancel() {
    this.modalVisible = false;
  }
  getispNamesByProject(id?: number) {
    this.ispService.getNamesIspByProject(id).subscribe((data: any) => {
      console.log(data);
      this.ispNames = data.ispdefultNames;
      this.projetName = data.nom;
    });
  }
}
