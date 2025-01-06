


type RowObj = {
  id: string;
  quantity: [number, string];
  units: number;
};

const tableProduct: RowObj[] = [
  {
    id: 'TG0005TB',
    quantity: [50, 'ml'],
    units: 345,
  },
  {
    id: 'TG001TB',
    quantity: [250, 'ml'],
    units: 345,
  },
  {
    id: 'TG040TB',
    quantity: [4, 'lit'],
    units: 345,
  },
  {
    id: 'TG019TB',
    quantity: [19, 'lit'],
    units: 345,
  },
  {
    id: 'TG208TB',
    quantity: [208, 'lit'],
    units: 345,
  },
];

export default tableProduct;
