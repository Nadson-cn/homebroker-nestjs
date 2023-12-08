import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  InitTrasanctionDto,
  InputExecuteTransactionDto,
} from './dto/order.dto';

@Controller('wallets/:wallet_id/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  All(@Param('wallet_id') wallet_id: string) {
    return this.ordersService.all({ wallet_id });
  }

  @Post()
  InitTransactionDtp(
    @Param('wallet_id') wallet_id: string,
    @Body() body: Omit<InitTrasanctionDto, 'wallet_id'>,
  ) {
    return this.ordersService.initTrasanction({ ...body, wallet_id });
  }

  @Post('execute')
  executeTransaction(@Body() body: InputExecuteTransactionDto) {
    this.ordersService.executeTransaction(body);
  }
}
