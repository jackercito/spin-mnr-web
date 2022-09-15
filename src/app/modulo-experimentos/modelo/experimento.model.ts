export class Experimento {
  public _id: string;
  public espectrometro: string;
  public sonda: string;
  public muestra: string;
  public solicitud: string;
  public nucleo: string;
  public usuario_entrada: string;
  public usuario_salida: string;
  public fecha_entrada: Date;
  public fecha_salida: Date;
  public completo: boolean;
  public visible: boolean;

  constructor() {
    this.fecha_entrada = new Date();
    this.fecha_salida = new Date();
    this.completo = false;
    this._id = '';
    this.espectrometro = '';
    this.sonda = '';
    this.muestra = '';
    this.solicitud =''
    this.nucleo = '';
    this.usuario_entrada = '';
    this.usuario_salida = '';
    this.completo = false;
    this.visible = false;
  };
}
