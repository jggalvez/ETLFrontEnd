import { Component } from '@angular/core';
import { SubirExcelService } from '../../services/grupo-uno/subirExcelService';


@Component({
  templateUrl: 'cards.component.html'
})

export class CardsComponent {
  fileToUpload: File | null = null;
  excelBase;
  mostrarBtnEnviar:boolean = false;
  constructor(public fileUploadService: SubirExcelService) {

  }

  handleFileInput(files: FileList) {
    console.log("Entra");
    this.fileToUpload = files.item(0);
    if (this.fileToUpload.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      this.mostrarBtnEnviar = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.excelBase = reader.result;
      };
    } else {
      this.mostrarBtnEnviar = false;
      alert("Debe seleccionar un archivo xlsx");
    }
  }

  async llamarServicioExcel() {
    var salida = this.excelBase.split(',');
    let value = await this.fileUploadService.enviarExcelBack(salida[1]);
  }

}
