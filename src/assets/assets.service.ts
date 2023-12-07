import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prismaService: PrismaService) {}
  create(data: { id: string; symbol: string; price: number }) {
    console.log('data', data);
    return this.prismaService.asset.create({
      data,
    });
  }

  find() {
    return this.prismaService.asset.findMany();
  }
}
