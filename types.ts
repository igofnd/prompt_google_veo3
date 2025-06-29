
export interface Wish {
  id: number;
  name: string;
  message: string;
  attendance: 'Hadir' | 'Tidak Hadir' | 'Ragu-ragu';
}
