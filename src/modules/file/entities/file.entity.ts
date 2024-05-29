import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 256, nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  mimetype: string;

  @Column({ type: 'int', nullable: true })
  size: number;

  @Column({ name: 'location', type: 'text', nullable: false })
  path: string;
}

// fieldname: 'file',
// originalname: '2',
// encoding: '7bit',
// mimetype: 'image/jpeg',
// destination: 'upload',
// filename: 'image__1710558017496.jpeg',
// path: 'upload\\image__1710558017496.jpeg',
// size: 4912
