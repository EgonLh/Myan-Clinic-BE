import { PartialType } from '@nestjs/swagger';
import { CreateRootDto } from './create.root.dto';
export class UpdateRootDto extends PartialType(CreateRootDto) {}
