export interface IDtoCinema {
  id: number;
  name: string;
  address: string;
}

export interface IDtoCinemasResponse extends Array<IDtoCinema> {}
