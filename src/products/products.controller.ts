import { Body, Controller, Delete, Get, Param, Post, Put, Query, Session, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { ProductsService } from "./products.service";


Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}
  
    @Get()
    getProducts(
      @Query('keyword') keyword: string,
      @Query('pageId') pageId: string
    ) {
      return this.productsService.findMany(keyword, pageId);
    }
  
    @Get('topRated')
    getTopRatedProducts() {
      return this.productsService.findTopRated();
    }
  
    @Get(':id')
    getProduct(@Param('id') id: string) {
      return this.productsService.findById(id);
    }
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
      return this.productsService.deleteOne(id);
    }
    @Post()
    createProduct() {
      return this.productsService.createSample();
    }
    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
      return this.productsService.update(id, product);
    }
  
    @UseGuards(AuthGuard)
    @Put(':id/review')
    createReview(
      @Param('id') id: string,
      @Body() { rating, comment }: ReviewDto,
      @Session() session: any
    ) {
      return this.productsService.createReview(id, session.user, rating, comment);
    }
  }