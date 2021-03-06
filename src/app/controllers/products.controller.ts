import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { Product, IProduct } from '../../domain/entities/product.schema';
import { ProductsService } from '../../domain/services/products.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService){}

    @Get()
    @ApiResponse({
      status: 200,
      description: 'Products Catalog',
      type: Product,
    })
    async findAll(): Promise<IProduct[]> {
      return this.productsService.findAll();
    }

    @Get(':search')
    @ApiResponse({
      status: 200,
      description: 'Search product by Id if is give it, brand or description otherwise',
      type: Product,
    })
    async find(@Param('search') search: string): Promise<IProduct[]> {
      const id = Number(search);
      if(id){
        return this.productsService.findById(Number(id));
      }
      return this.productsService.findByBrandOrDescription(search);
    }

}
