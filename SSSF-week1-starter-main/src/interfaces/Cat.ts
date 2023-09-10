import {RowDataPacket} from 'mysql2';
import {User} from './User';

interface Cat {
  cat_id: number;
  cat_name: string;
  weight: number;
  filename: string;
  birthdate: Date;
  lat: number;
  lng: number;
  owner: User | number;
}

interface GetCat extends RowDataPacket, Cat {}

type PostCat = Omit<Cat, 'cat_id'>;

type PutCat = Partial<PostCat>;

export {Cat, GetCat, PostCat, PutCat};
