import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  InitTrasanctionDto,
  InputExecuteTransactionDto,
} from './dto/order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExecuteTransactionMessageType } from './interfaces';

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
  executeTransactionRest(@Body() body: InputExecuteTransactionDto) {
    this.ordersService.executeTransaction(body);
  }

  @MessagePattern('output')
  async executeTransactionConsumer(@Payload() message: ExecuteTransactionMessageType) {
    const transaction = message.transactions[message.transactions.length - 1]

     await this.ordersService.executeTransaction({
      order_id: message.order_id,
      status: message.status,
      related_investor_id: message.order_type === "BUY" ? transaction.seller_id : transaction.buyer_id,
      broker_transaction_id: transaction.transaction_id,
      negotiated_shares: transaction.shares,
      price: transaction.price
      
    });
  }
}
