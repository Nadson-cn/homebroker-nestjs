import { OrderType } from '@prisma/client';

export class InitTrasanctionDto {
  asset_id: string;
  wallet_id: string;
  price: number;
  shares: number;
  type: OrderType;
}

export class InputExecuteTransactionDto {
  order_id: string;
  status: 'OPEN' | 'CLOSED';
  related_investor_id: string;
  broker_transaction_id: string;
  negotiated_shares: number;
  price: number;
}
