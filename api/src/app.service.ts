import { Injectable } from '@nestjs/common';
import { MENUITEMS } from './core/common/constants/menu/menu';
import { RESP_MESSAGES } from './core/common/constants/resp-messages';

import { ResDto } from './core/common/res/dtos/res.dto';
import { responseSuccess } from './core/common/res/res.config';

@Injectable()
export class AppService {
  getStatus(): ResDto {
    return responseSuccess('El servicio se encuentra activo!!!');
  }

  getMenu(): ResDto {
    const data = MENUITEMS
    return responseSuccess(RESP_MESSAGES.GET,data);

  }
}
